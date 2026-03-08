from webbrowser import get
import json, random
from django.utils import timezone
from django.http import JsonResponse
from django.db import connection, IntegrityError
from django.db.models import Q, CharField, Value
from django.db.models.functions import Concat
from datetime import date, datetime
from .models import Jugadora, JugadoraPosicion, Trayectoria, Equipo, Pais, Liga, Trofeo, JugadoraPais
from random import shuffle
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from bs4 import BeautifulSoup
import requests, re
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.
def parse_temporada(temporada_str):
    año_actual = datetime.now().year

    if "-" in temporada_str:
        inicio, fin = temporada_str.split("-")
        inicio = int(inicio)

        if fin.lower() == "act":
            fin = año_actual
        else:
            # soporta 21-22 y 2021-2022
            fin = int("20" + fin) if len(fin) == 2 else int(fin)
    else:
        inicio = fin = int(temporada_str)

    return inicio, fin

def formatear_nombre_corto(nombre_str, apellidos_str):
    # 1. Procesar Nombre (siempre la primera palabra)
    nombre = nombre_str.split()[0] if nombre_str else ""
    
    # 2. Procesar Apellidos con lógica de partículas (van, de, la, etc.)
    if not apellidos_str:
        return nombre.strip()
        
    palabras = apellidos_str.split()
    resultado_apellido = []
    
    for i, palabra in enumerate(palabras):
        resultado_apellido.append(palabra)
        # Si la palabra actual empieza con Mayúscula, paramos ahí.
        # Esto capturará "van der" (minúsculas) y se detendrá en "Gragt" (mayúscula).
        if palabra[0].isupper():
            break
            
    apellido_final = " ".join(resultado_apellido)
    return f"{nombre} {apellido_final}".strip()
#################################################################################################
######################################JUGADORAS##################################################
#################################################################################################
def jugadoras_All(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT 
                j.id_jugadora, -- 0
                j.Nombre,      -- 1
                j.Apellidos,   -- 2
                j.Apodo,       -- 3
                j.Nacimiento,  -- 4
                j.imagen,      -- 5
                j.retiro,      -- 6
                -- Datos del equipo
                e.id_equipo,   -- 7
                e.nombre AS nombre_equipo, -- 8
                e.escudo,      -- 9
                e.color,       -- 10
                -- Nacionalidades
                GROUP_CONCAT(DISTINCT jp.pais ORDER BY jp.es_primaria DESC) AS ids_paises, -- 11
                GROUP_CONCAT(DISTINCT p.iso ORDER BY jp.es_primaria DESC) AS isos_paises,   -- 12
                -- Posiciones
                GROUP_CONCAT(DISTINCT pos.idPosicion ORDER BY jpos.es_primaria DESC) AS ids_posiciones, -- 13
                GROUP_CONCAT(DISTINCT pos.abreviatura ORDER BY jpos.es_primaria DESC) AS abrev_posiciones, -- 14
                j.market_value AS valor -- 15
            FROM jugadoras j
            INNER JOIN trayectoria t ON t.jugadora = j.id_jugadora AND t.equipo_actual = TRUE
            INNER JOIN equipos e ON t.equipo = e.id_equipo
            LEFT JOIN `jugadora-pais` jp ON jp.jugadora = j.id_jugadora
            LEFT JOIN `paises` p ON jp.pais = p.id_pais
            LEFT JOIN `jugadora-posicion` jpos ON jpos.jugadora = j.id_jugadora
            LEFT JOIN `posiciones` pos ON jpos.posicion = pos.idPosicion
            GROUP BY j.id_jugadora, e.id_equipo
            ORDER BY j.Apellidos;
        """)
        filas = cursor.fetchall()

    jugadoras = []
    for fila in filas:
        # 1. Procesar nacionalidades (Índices 11 y 12)
        lista_ids_paises = [int(x) for x in fila[11].split(',')] if fila[11] else []
        lista_isos_paises = [x.lower() for x in fila[12].split(',')] if fila[12] else []

        # 2. Procesar posiciones (Índices 13 y 14)
        lista_ids_posiciones = [int(x) for x in fila[13].split(',')] if fila[13] else []
        lista_abrev_posiciones = [x for x in fila[14].split(',')] if fila[14] else []
        
        # Posición principal (la primera de la lista por el ORDER BY es_primaria DESC)
        posicion_display = lista_abrev_posiciones[0] if lista_abrev_posiciones else "N/A"

        jugadoras.append({
            "id_jugadora": fila[0],
            "nombre": fila[1],
            "apellido": fila[2],
            "apodo": fila[3],
            "nacimiento": fila[4].strftime("%Y-%m-%d") if fila[4] else None,
            "imagen": fila[5],
            "retiro": fila[6],
            "equipo": {
                "id": fila[7],
                "nombre": fila[8],
                "escudo": fila[9],
                "color": fila[10]
            },
            "nacionalidades_ids": lista_ids_paises,
            "nacionalidades_isos": lista_isos_paises,
            "posiciones_ids": lista_ids_posiciones,
            "posiciones_abrev": lista_abrev_posiciones,
            "posicion": posicion_display, # Posición principal para la miniatura/lista
            "market_value": fila[15], # Valor de mercado
            "nombre_completo": formatear_nombre_corto(fila[1], fila[2])
        })
    
    return JsonResponse({"success": jugadoras})

def jugadora_apodo(request):
    id_jugadora = request.GET.get("id_jugadora")

    if not id_jugadora:
        return JsonResponse({"error": "No se proporcionó id_jugadora."}, status=400)

    try:
        id_jugadora = int(id_jugadora)
    except ValueError:
        return JsonResponse({"error": "id_jugadora inválido."}, status=400)

    # Buscar la jugadora
    try:
        jugadora = Jugadora.objects.get(id_jugadora=id_jugadora)
    except Jugadora.DoesNotExist:
        return JsonResponse({"error": "No existe una jugadora con ese ID."}, status=404)

    # Obtener el apodo (si es null → devolver cadena vacía)
    apodo = jugadora.Apodo if jugadora.Apodo else ""

    return JsonResponse(apodo, safe=False)

def jugadoraxid(request):
    id_jugadora = request.GET.get('id')
    
    try:
        id_jugadora = int(id_jugadora)
    except (TypeError, ValueError):
        return JsonResponse({"error": "ID de jugadora no proporcionado o inválido"}, status=400)

    try:
        j = Jugadora.objects.get(id_jugadora=id_jugadora)
        nacionalidades_qs = JugadoraPais.objects.filter(jugadora=id_jugadora).select_related('pais')
        posiciones_qs = JugadoraPosicion.objects.filter(jugadora=id_jugadora).select_related('posicion')
        jp_principal = nacionalidades_qs.filter(es_primaria=True).first()
        todas_nacionalidades = list(nacionalidades_qs.values_list('pais_id', flat=True))
        todas_posiciones = list(posiciones_qs.values_list('posicion', flat=True))
    except Jugadora.DoesNotExist:
        return JsonResponse({"error": "No se encontraron jugadoras con ese ID."}, status=404)

    # Si no hay imagen, usar predeterminada
    if j.imagen:
        imagen = j.imagen.url if hasattr(j.imagen, 'url') else j.imagen
    else:
        from django.templatetags.static import static
        imagen = static('img/predeterm.jpg')

    data = {
        "id_jugadora": j.id_jugadora,
        "Nombre_Completo": f"{j.Nombre} {j.Apellidos}",
        "Imagen": imagen,
        "Apodo": j.Apodo,
        "Nombre": j.Nombre,
        "Apellidos": j.Apellidos,
        "Nacimiento": j.Nacimiento,
        "Nacionalidad": jp_principal.pais.id_pais if jp_principal else None,
        "TodasNacionalidades": todas_nacionalidades,
        "PosicionesIds": todas_posiciones,
        "Retiro": j.retiro,
        "Valor": j.market_value
    }

    return JsonResponse(data)

def jugadora_companeras(request):
    id_jugadora = request.GET.get('id_jugadora')
    try:
        id_jugadora = int(id_jugadora)
    except (TypeError, ValueError):
        return JsonResponse({"error": "ID inválido"}, status=400)

    # La lógica de solapamiento de fechas es:
    # InicioA <= FinB AND FinA >= InicioB
    # (Tratando NULL en fecha_fin como la fecha de hoy)
    
    query = """
    WITH companeras_data AS (
        SELECT 
            j2.jugadora as id_jug_comp,
            j2.equipo,
            j2.fecha_inicio,
            j2.fecha_fin,
            j2.equipo_actual,
            j_info.Nombre,
            j_info.Apellidos,
            j_info.imagen as foto_jugadora,
            ROW_NUMBER() OVER (PARTITION BY j2.equipo ORDER BY j2.fecha_inicio DESC) as rn
        FROM trayectoria j1
        JOIN trayectoria j2 ON j1.equipo = j2.equipo AND j1.jugadora != j2.jugadora
        JOIN jugadoras j_info ON j2.jugadora = j_info.id_jugadora
        WHERE j1.jugadora = %s
          AND j1.fecha_inicio <= COALESCE(j2.fecha_fin, CURDATE())
          AND COALESCE(j1.fecha_fin, CURDATE()) >= j2.fecha_inicio
    )
    SELECT * FROM companeras_data
    ORDER BY rn ASC, id_jug_comp ASC
    LIMIT 5
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [id_jugadora])
        columnas = [col[0] for col in cursor.description]
        results = [dict(zip(columnas, row)) for row in cursor.fetchall()]

    # Procesamos los nombres cortos para el juego
    for r in results:
        n = r.get('Nombre', '')
        a = r.get('Apellidos', '')
        # Usamos tu lógica de primera palabra
        r['Nombre_Completo'] = f"{n.split()[0] if n else ''} {a.split()[0] if a else ''}".strip()
        
        # Manejo de imagen predeterminada si no hay en trayectoria ni en jugadora
        r['imagen'] = r['foto_jugadora'] or '/static/img/predeterm.jpg'

    return JsonResponse(results, safe=False)

def jugadora_datos(request):
    id_jugadora = request.GET.get('id')

    try:
        id_jugadora = int(id_jugadora)
    except (TypeError, ValueError):
        return JsonResponse({"error": "ID de jugadora no proporcionado o inválido"}, status=400)

    try:
        j = Jugadora.objects.get(id_jugadora=id_jugadora)
        nacionalidades_qs = JugadoraPais.objects.filter(jugadora=id_jugadora).select_related('pais')
        posiciones_qs = JugadoraPosicion.objects.filter(jugadora=j).select_related('posicion').order_by('-es_primaria')
        jp_principal = nacionalidades_qs.filter(es_primaria=True).first()
        todas_nacionalidades = list(nacionalidades_qs.values_list('pais_id', flat=True))
        todas_posiciones_ids = list(posiciones_qs.values_list('posicion_id', flat=True))
        posiciones_lista_obj = [posicion_to_dict(p.posicion) for p in posiciones_qs]
        todos_isos = [n.pais.iso.lower() for n in nacionalidades_qs if n.pais and n.pais.iso]
    except Jugadora.DoesNotExist:
        return JsonResponse({"error": "No se encontraron jugadoras con ese ID."}, status=404)

    # Calcular edad
    hoy = date.today()
    edad = hoy.year - j.Nacimiento.year - ((hoy.month, hoy.day) < (j.Nacimiento.month, j.Nacimiento.day))

    # Trayectorias de la jugadora
    trayectorias = Trayectoria.objects.filter(jugadora=j).select_related('equipo', 'equipo__liga')

    equipo_actual = None
    equipos_previos = []
    ligas_previas = []
    liga_actual = None

    for t in trayectorias:
        if t.equipo_actual:  # Asumimos que hay un campo booleano 'equipo_actual'
            equipo_actual = t.equipo
            liga_actual = t.equipo.liga.id_liga if t.equipo.liga else 0
        else:
            if t.equipo.id_equipo not in equipos_previos:
                equipos_previos.append(t.equipo.id_equipo)
            if t.equipo.liga and t.equipo.liga.id_liga not in ligas_previas:
                ligas_previas.append(t.equipo.liga.id_liga)

    data = {
        "id": j.id_jugadora,
        "nombre": f"{j.Nombre} {j.Apellidos}",
        "nombre_completo": formatear_nombre_corto(j.Nombre, j.Apellidos),
        "apodo": j.Apodo,
        "Nacionalidad": jp_principal.pais.id_pais if jp_principal else None,
        "TodasNacionalidades": todas_nacionalidades,
        "pais_id": jp_principal.pais.id_pais if jp_principal else None,
        "pais_iso": todos_isos,
        "pais": jp_principal.pais.id_pais if jp_principal else None,
        "altura": j.altura,
        "pie": j.pie_habil,
        "imagen": j.imagen,
        "PosicionesIds": todas_posiciones_ids,
        "Posiciones": posiciones_lista_obj,
        "edad": edad,
        "equipo": equipo_to_dict(equipo_actual),
        "liga": liga_actual,
        "equipos": equipos_previos,
        "ligas": ligas_previas,
        "Nacimiento": j.Nacimiento,
        "Retiro": j.retiro,
    }

    return JsonResponse({"success": data})

def jugadoraxnombre(request):
    query_input = request.GET.get('nombre', '').strip()
    if not query_input:
        return JsonResponse({'error': 'Falta nombre'}, status=400)

    # 1. Normalizamos espacios
    query_input = re.sub(' +', ' ', query_input)
    # 2. Dividimos por palabras: "Emma H" -> ["Emma", "H"]
    palabras = query_input.split(' ')

    # 3. Creamos el campo anotado
    queryset = Jugadora.objects.annotate(
        nombre_completo=Concat('Nombre', Value(' '), 'Apellidos', output_field=CharField())
    )

    # 4. Filtramos: CADA palabra debe estar en el nombre_completo
    # Esto permite buscar "H Emma" o "Emma Holmgren" o "Emma H"
    for palabra in palabras:
        queryset = queryset.filter(
            Q(nombre_completo__icontains=palabra) | Q(Apodo__icontains=palabra)
        )

    # 5. Limitamos resultados para que el autocompletado sea rápido
    jugadoras = queryset.only('id_jugadora')[:10]

    if not jugadoras.exists():
        return JsonResponse([], safe=False) # Mandar lista vacía es mejor que un 404 para el JS

    data = [{
        'id_jugadora': j.id_jugadora,
        'Nombre_Completo': formatear_nombre_corto(j.Nombre, j.Apellidos),
        'imagen': j.imagen or '/static/img/predeterm.jpg',
        'Nacimiento': j.Nacimiento.strftime("%Y-%m-%d") if j.Nacimiento else "",
        'Apodo': j.Apodo,
    } for j in jugadoras]

    return JsonResponse(data, safe=False)

def jugadora_trayectoria(request):
    id_jugadora = request.GET.get('id')

    if not id_jugadora:
        return JsonResponse({'error': 'ID de jugadora no proporcionado'}, status=400)

    try:
        id_jugadora = int(id_jugadora)
    except ValueError:
        return JsonResponse({'error': 'ID de jugadora inválido'}, status=400)

    # Traer las trayectorias filtrando la liga != 17
    trayectorias = Trayectoria.objects.filter(
    jugadora_id=id_jugadora
    #.exclude(
    #equipo__liga__id_liga=16)
    ).select_related('equipo', 'jugadora').order_by('fecha_inicio')

    data = []
    for t in trayectorias:
        equipo = t.equipo
        jug = t.jugadora

        escudo = None
        if equipo.escudo:
            escudo = equipo.escudo

        imagen_jugadora = None
        if jug.imagen:
            imagen_jugadora = jug.imagen

        data.append({
            'trayectoria_id': t.id,
            'jugadora': jug.id_jugadora,
            'equipo': equipo.id_equipo,
            'color': equipo.color,
            'fecha_inicio': t.fecha_inicio,
            'fecha_fin': t.fecha_fin,
            'imagen': t.imagen,  # o t.imagen codificada si quieres
            'equipo_actual': t.equipo_actual,
            'escudo': escudo,
            'liga': equipo.liga.id_liga if equipo.liga else None,
            'nombre': equipo.nombre,
            'ImagenJugadora': imagen_jugadora,
        })

    return JsonResponse(data, safe=False)

def jugadora_pais(request):
    nombre = request.GET.get('id', '').strip()  # Realmente es el ID

    if not nombre:
        return JsonResponse({"error": "Nombre de jugadora no proporcionado"}, status=400)

    try:
        jugadora = Jugadora.objects.get(id_jugadora=nombre)

        # 2. Buscamos su nacionalidad PRINCIPAL en la tabla intermedia
        # Usamos .filter().first() por seguridad si hubiera más de una
        relacion_pais = JugadoraPais.objects.filter(
            jugadora=jugadora, 
            es_primaria=True
        ).select_related('pais').first()

    except Jugadora.DoesNotExist:
        return JsonResponse({"error": "No se encontró ninguna jugadora con ese nombre"}, status=404)
    
    pais_id = relacion_pais.pais.id_pais if relacion_pais else None

    return JsonResponse({
        "Pais": pais_id,
        "NCompleto": f"{jugadora.Nombre} {jugadora.Apellidos}",
        "TodasNacionalidades": list(JugadoraPais.objects.filter(jugadora=jugadora).values_list('pais_id', flat=True))
    })

def jugadora_aleatoria(request):
    # 1. Obtener parámetros
    nacionalidades = request.GET.getlist("nacionalidades[]")
    equipos = request.GET.getlist("equipos[]")
    ligas = request.GET.getlist("ligas[]")

    try:
        nacionalidades = [int(x) for x in nacionalidades]
        equipos = [int(x) for x in equipos]
        ligas = [int(x) for x in ligas]
    except ValueError:
        return JsonResponse({"error": "Parámetros inválidos"}, status=400)

    jugadoras_finales = {}

    # Función interna adaptada a la nueva tabla jugadora_pais
    def cubrir_criterios(queryset_base, lista_ids, campo_filtro):
        for valor_id in lista_ids:
            filtro = {f"{campo_filtro}": valor_id}
            # Importante: Para nacionalidades, filtramos solo la primaria
            if campo_filtro == "jugadorapais__pais":
                filtro["jugadorapais__es_primaria"] = True
            
            qs = queryset_base.filter(**filtro).distinct().order_by('?')[:2]
            
            for j in qs:
                if j.id_jugadora not in jugadoras_finales:
                    # Obtenemos el ID del país primario para el JSON
                    # Hacemos esto porque ya no existe j.Nacionalidad
                    pais_rel = j.jugadorapais_set.filter(es_primaria=True).first()
                    id_pais = pais_rel.pais_id if pais_rel else None

                    jugadoras_finales[j.id_jugadora] = {
                        "id": j.id_jugadora,
                        "nombre": formatear_nombre_corto(j.Nombre, j.Apellidos),
                        "imagen": j.imagen if j.imagen else None,
                        "pais": id_pais,
                        "Nacimiento": j.Nacimiento.strftime("%Y-%m-%d") if j.Nacimiento else None,
                    }

    # Base de la consulta: Quitamos select_related('Nacionalidad') porque ya no existe
    base_qs = Jugadora.objects.all()

    # 2. Asegurar cobertura (Bingo seguro)
    if nacionalidades:
        # El campo de filtro ahora es a través de la relación de la tabla intermedia
        cubrir_criterios(base_qs, nacionalidades, "jugadorapais__pais")
    
    if equipos:
        cubrir_criterios(base_qs, equipos, "trayectoria__equipo")
        
    if ligas:
        cubrir_criterios(base_qs, ligas, "trayectoria__equipo__liga")

    # 3. Rellenar hasta llegar a 20/30
    if len(jugadoras_finales) < 20:
        extras = base_qs.filter(
            Q(jugadorapais__pais__in=nacionalidades, jugadorapais__es_primaria=True) |
            Q(trayectoria__equipo__in=equipos) |
            Q(trayectoria__equipo__liga__in=ligas)
        ).distinct().order_by('?')[:15]
        
        for j in extras:
            if j.id_jugadora not in jugadoras_finales:
                pais_rel = j.jugadorapais_set.filter(es_primaria=True).first()
                jugadoras_finales[j.id_jugadora] = {
                    "id": j.id_jugadora,
                    "nombre": formatear_nombre_corto(j.Nombre, j.Apellidos),
                    "imagen": j.imagen,
                    "pais": pais_rel.pais_id if pais_rel else None,
                    "Nacimiento": j.Nacimiento.strftime("%Y-%m-%d") if j.Nacimiento else None,
                }

    resultado = list(jugadoras_finales.values())
    random.shuffle(resultado)

    return JsonResponse(resultado[:30], safe=False)

def jugadoras_por_equipo_y_temporada(request):
    equipo_id = request.GET.get("equipo")
    temporada = request.GET.get("temporada")

    if not equipo_id:
        return JsonResponse({"success": [], "error": "Falta el equipo"}, status=400)

    # 1. Preparar el filtro de temporada
    query_filtro = ""
    params = [equipo_id]

    if temporada:
        try:
            # Si temporada es "2024", buscamos jugadoras cuya estancia 
            # se solape con cualquier momento de ese año (01-01 al 31-12)
            temporada_int = int(temporada)
            query_filtro = """
                AND fecha_inicio <= %s 
                AND (fecha_fin >= %s OR equipo_actual = 1)
            """
            # Una jugadora estuvo en 2024 si empezó antes del fin de 2024 
            # y terminó después del inicio de 2024
            params.extend([f"{temporada_int}-12-31", f"{temporada_int}-01-01"])
        except ValueError:
            return JsonResponse({"success": [], "error": "Temporada inválida"}, status=400)

    # 2. Ejecutar SQL
    with connection.cursor() as cursor:
        cursor.execute(f"""
            SELECT 
                j.*,
                tc.fecha_inicio,
                tc.fecha_fin,
                tc.equipo_actual,
                tc.años  -- Lo mantenemos por ahora como fallback
            FROM trayectoria tc
            JOIN jugadoras j ON j.id_jugadora = tc.jugadora
            WHERE tc.equipo = %s
            {query_filtro}
            ORDER BY tc.fecha_inicio ASC
        """, params)

        columnas = [col[0] for col in cursor.description]
        filas = cursor.fetchall()

    # 3. Convertir a lista de diccionarios y formatear nombres
    resultado = []
    for fila in filas:
        d = dict(zip(columnas, fila))
        
        # Aplicamos tu lógica de nombre corto aquí mismo
        n = d.get('Nombre', '')
        a = d.get('Apellidos', '')
        nombre_prio = n.split()[0] if n else ""
        apellido_prio = a.split()[0] if a else ""
        d['Nombre_Completo'] = f"{nombre_prio} {apellido_prio}".strip()
        
        # Limpieza de fechas para JSON (evitar errores de objetos date no serializables)
        if d['fecha_inicio']: d['fecha_inicio'] = str(d['fecha_inicio'])
        if d['fecha_fin']: d['fecha_fin'] = str(d['fecha_fin'])
        
        resultado.append(d)

    return JsonResponse({"success": resultado})

@csrf_exempt
def actualizar_soccerdonna_url(request):
    """
    Actualiza el campo soccerdonna_url buscando la jugadora en la base
    usando nombre + apellidos, ignorando números iniciales y segundos nombres.
    """
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        name = data.get("name")  # ej: "1 Andrea Tarazona"
        url = data.get("url")

        if not name or not url:
            return JsonResponse({"error": "Faltan name o url"}, status=400)

        # Eliminar números y caracteres no alfabéticos del inicio
        import re
        cleaned_name = re.sub(r"^\d+\s*", "", name).strip()  # "Andrea Tarazona"

        # Separar en palabras
        name_parts = cleaned_name.split()  # ["Andrea", "Tarazona"]

        # Buscar coincidencia parcial de todas las palabras en nombre o apellidos
        # Generamos un queryset que filtre cualquier jugadora que contenga todas las palabras
        queryset = Jugadora.objects.all()
        for part in name_parts:
            queryset = queryset.filter(
                Nombre__icontains=part
            ) | queryset.filter(
                Apellidos__icontains=part
            )

        jugadora = queryset.first()
        if not jugadora:
            return JsonResponse({"error": f"No se encontró jugadora con nombre {cleaned_name}"}, status=404)

        # Actualizar campo
        jugadora.soccerdonna_url = url
        jugadora.save()

        return JsonResponse({
            "status": "ok",
            "jugadora": f"{jugadora.Nombre} {jugadora.Apellidos}",
            "url": url
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def api_random_player(request):
    # Solo jugadoras con market_value existente
    jugadoras = Jugadora.objects.filter(market_value__isnull=False)

    if not jugadoras.exists():
        return JsonResponse({"error": "No hay jugadoras con market value"}, status=404)

    jugadora = random.choice(jugadoras)

    return JsonResponse({
        "id": jugadora.id_jugadora,
        "nombre": f"{jugadora.Nombre} {jugadora.Apellidos}",
        "market_value": jugadora.market_value,
        "imagen": jugadora.imagen if jugadora.imagen else None
    })
#################################################################################################
########################################EQUIPOS##################################################
#################################################################################################

def equipoxid(request):
    id = request.GET.get('id')

    if not id:
        return JsonResponse({"error": "Faltan parámetros o no se encontraron resultados."}, status=400)

    # Consulta
    e = Equipo.objects.get(id_equipo=id)

    salida = {
            "club": e.id_equipo,
            "nombre": e.nombre,
            "escudo": e.escudo,
            "color": e.color,
            "lat": e.latitud,
            "long": e.longitud
        }
    return JsonResponse({"success": salida})

def equiposxid(request):
    ids = request.GET.getlist('id[]')  # Recupera id[]=1&id[]=2&id[]=3

    if not ids:
        return JsonResponse({"error": "Faltan parámetros o no se encontraron resultados."}, status=400)

    # Convertir a enteros
    try:
        ids = [int(i) for i in ids]
    except ValueError:
        return JsonResponse({"error": "IDs inválidos."}, status=400)

    # Consulta
    equipos = Equipo.objects.filter(id_equipo__in=ids)

    salida = []
    for e in equipos:

        salida.append({
            "club": e.id_equipo,
            "nombre": e.nombre,
            "escudo": e.escudo,
            "color": e.color
        })

    return JsonResponse({"success": salida})

def equiposAll(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT id_equipo AS id, nombre, escudo, color, latitud, longitud, liga
            FROM equipos 
            ORDER BY nombre
        """)
        filas = cursor.fetchall()

    equipos = []
    for id_equipo, nombre, escudo, color, latitud, longitud, liga in filas:
        equipos.append({
            "nombre": nombre,
            "id": id_equipo,
            "escudo": escudo,
            "color": color,
            "lat": latitud,
            "long": longitud,
            "liga": liga
        })
    
    return JsonResponse({"success": equipos})

def equiposxliga(request):
    id_liga = request.GET.get('liga')

    if not id_liga:
        return JsonResponse({"error": "Faltan parámetros o no se encontraron resultados."}, status=400)

    try:
        id_liga = int(id_liga)
    except ValueError:
        return JsonResponse({"error": "ID de liga inválido."}, status=400)

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT e.id_equipo, e.nombre, e.escudo, e.color, e.latitud, e.longitud
            FROM equipos e
            JOIN ligas l ON e.liga = l.id_liga
            WHERE l.id_liga = %s
            ORDER BY e.nombre
        """, [id_liga])
        filas = cursor.fetchall()

    equipos = []
    for id_equipo, nombre, escudo, color, latitud, longitud in filas:
        equipos.append({
            "nombre": nombre,
            "id": id_equipo,
            "escudo": escudo,
            "color": color,
            "lat": latitud,
            "lon": longitud
        })

    return JsonResponse({"success": equipos})

def equipoxnombre(request):
    nombre = request.GET.get('nombre', '').strip()

    if not nombre:
        return JsonResponse(
            {"error": "Falta el nombre del equipo"},
            status=400
        )

    equipos = Equipo.objects.filter(nombre__icontains=nombre)

    salida = []
    for e in equipos:

        salida.append({
            "id_equipo": e.id_equipo,
            "liga": e.liga.id_liga,
            "nombre": e.nombre,
            "escudo": e.escudo,
            "color": e.color
        })

    return JsonResponse(salida, safe=False)

def equipo_to_dict(equipo):
    if not equipo:
        return None

    return {
        "id": equipo.id_equipo,
        "nombre": equipo.nombre,
        "escudo": equipo.escudo,
        "color": equipo.color,
        "liga": {
            "id": equipo.liga.id_liga,
            "nombre": equipo.liga.nombre
        } if equipo.liga else None
    }

#################################################################################################
#########################################PAISES##################################################
#################################################################################################

def paisesxid(request):
    ids = request.GET.getlist('id[]')  # Recupera id[]=1&id[]=2&id[]=3

    if not ids:
        return JsonResponse({"error": "Faltan parámetros o no se encontraron resultados."}, status=400)

    # Convertir a enteros
    try:
        ids = [int(i) for i in ids]
    except ValueError:
        return JsonResponse({"error": "IDs inválidos."}, status=400)

    # Consulta
    paises = Pais.objects.filter(id_pais__in=ids)

    salida = []
    for p in paises:
        salida.append({
            "pais": p.id_pais,
            "nombre": p.nombre,
            "iso": p.iso
        })

    return JsonResponse({"success": salida})

def paisesall(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT id_pais AS id, nombre, bandera 
            FROM paises 
            ORDER BY nombre
        """)
        filas = cursor.fetchall()

    paises = []
    for id_pais, nombre, iso in filas:
        paises.append({
            "nombre": nombre,
            "id": id_pais,
            "iso": iso
        })
    
    return JsonResponse({"success": paises})

def paisxnombre(request):
    nombre = request.GET.get('nombre', '').strip()

    if not nombre:
        return JsonResponse(
            {"error": "Falta el nombre del país"},
            status=400
        )

    paises = Pais.objects.filter(nombre__icontains=nombre)

    salida = []
    for p in paises:

        salida.append({
            "pais": p.id_pais,
            "nombre": p.nombre,
            "iso": p.iso
        })

    return JsonResponse(salida, safe=False)
#################################################################################################
#########################################LIGAS###################################################
#################################################################################################

def ligasxid(request):
    ids = request.GET.getlist('id[]')  # Recupera id[]=1&id[]=2&id[]=3

    if not ids:
        return JsonResponse({"error": "Faltan parámetros o no se encontraron resultados."}, status=400)

    # Convertir a enteros
    try:
        ids = [int(i) for i in ids]
    except ValueError:
        return JsonResponse({"error": "IDs inválidos."}, status=400)

    # Consulta
    ligas = Liga.objects.filter(id_liga__in=ids)

    salida = []
    for l in ligas:
        escudo_base64 = None
        if l.logo: 
            try:
                escudo_base64 = l.logo
            except Exception:
                escudo_base64 = None

        salida.append({
            "liga": l.id_liga,
            "nombre": l.nombre,
            "logo": escudo_base64
        })

    return JsonResponse({"success": salida})

def ligasxpais(request):
    pais_id = request.GET.get('pais')

    if not pais_id:
        return JsonResponse(
            {"error": "Falta el parámetro 'pais'."},
            status=400
        )

    try:
        pais_id = int(pais_id)
    except ValueError:
        return JsonResponse(
            {"error": "ID de país inválido."},
            status=400
        )


    # Consulta
    ligas = Liga.objects.filter(pais=pais_id)

    salida = []
    for l in ligas:

        salida.append({
            "liga": l.id_liga,
            "nombre": l.nombre,
            "logo": l.logo
        })

    return JsonResponse({"success": salida})
#################################################################################################
#######################################POSICIONES################################################
#################################################################################################

def posicionesall(request): 
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT idPosicion AS id, nombre, abreviatura, idPosicionPadre 
            FROM posiciones 
            ORDER BY nombre
        """)
        filas = cursor.fetchall()

    posiciones = []
    for idPosicion, nombre, abreviatura, idPosicionPadre in filas:
        posiciones.append({
            "nombre": nombre,
            "id": idPosicion,
            "abreviatura": abreviatura,
            "idPosicionPadre": idPosicionPadre
        })
    
    return JsonResponse({"success": posiciones})

def posicion_por_jugadora(request):
    jugadora_id = request.GET.get("id")

    if not jugadora_id:
        return JsonResponse({"error": "ID de jugadora no proporcionado"}, status=400)

    try:
        jugadora_id = int(jugadora_id)
    except ValueError:
        return JsonResponse({"error": "ID inválido"}, status=400)

    query = """
        SELECT posiciones.idPosicion, posiciones.nombre, posiciones.abreviatura, posiciones.idPosicionPadre
        FROM posiciones
        LEFT JOIN jugadora_posicion j
            ON posiciones.idPosicion = j.posicion
        WHERE j.jugadora = %s;
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [jugadora_id])
        filas = cursor.fetchall()

    if not filas:
        return JsonResponse({"error": "No se encontró ninguna jugadora con ese ID"}, safe=False)

    resultado = [{"Posicion": fila[0]} for fila in filas]

    return JsonResponse({"success": resultado})

def posicion_to_dict(posicion):
    if not posicion:
        return None

    return {
        "id": posicion.idPosicion,
        "nombre": posicion.nombre,
        "abreviatura": posicion.abreviatura,
        "PosicionPadre": {
            "id": posicion_to_dict(posicion.idPosicionPadre),
        } if posicion.idPosicionPadre else None
    }
#################################################################################################
#########################################TROFEOS#################################################
#################################################################################################

def trofeos_individuales(request):
    jugadora = request.GET.get("jugadora")

    if not jugadora:
        return JsonResponse({"error": "ID de jugadora no proporcionado"}, status=400)
    try:
        jugadora = int(jugadora)
    except ValueError:
        return JsonResponse({"error": "ID inválido"}, status=400)
    query = """
        SELECT t.id, t.nombre, t.tipo, t.icono
        FROM trofeos t
        INNER JOIN `jugadora-trofeo` ti ON t.id = ti.trofeo WHERE ti.jugadora = %s;
    """
    with connection.cursor() as cursor:
        cursor.execute(query, [jugadora])
        filas = cursor.fetchall()
    if not filas:
        return JsonResponse({"error": "No se encontraron trofeos para esa jugadora"}, safe=False)
    resultado = []
    for fila in filas:
        resultado.append({
            "id": fila[0],
            "nombre": fila[1],
            "tipo": fila[2],
            "icono": fila[3],
        })
    return JsonResponse({"success": resultado})

def equipo_palmares(request):
    equipo = request.GET.get("equipo")
    print("Equipo recibido:", equipo)
    temporadas = request.GET.get("temporadas", "1950-act")

    if not temporadas or temporadas == "undefined":
        temporadas = "1950-act"

    if not equipo:
        return JsonResponse({"error": "ID de equipo no proporcionado"}, status=400)

    try:
        equipo = int(equipo)
        filtro_inicio, filtro_fin = parse_temporada(temporadas)
    except ValueError:
        return JsonResponse({"error": "Datos inválidos"}, status=400)

    query = """
        SELECT t.id, t.nombre, t.tipo, t.icono, ti.temporada
        FROM trofeos t
        INNER JOIN `equipo-trofeo` ti
            ON t.id = ti.trofeo
        WHERE ti.equipo = %s;
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [equipo])
        filas = cursor.fetchall()

    if not filas:
        return JsonResponse({"success": []})

    resultado = []

    for fila in filas:
        temporada_trofeo = fila[4]

        try:
            trofeo_inicio, trofeo_fin = parse_temporada(temporada_trofeo)
        except ValueError:
            continue  # temporada mal formada → ignorar

        # REGla ÚNICA de solapamiento
        if trofeo_inicio < filtro_fin and trofeo_fin > filtro_inicio:
            resultado.append({
                "id": fila[0],
                "nombre": fila[1],
                "tipo": fila[2],
                "icono": fila[3],
                "temporada": temporada_trofeo
            })

    return JsonResponse({"success": resultado})

def trofeosxid (request):
    ids = request.GET.getlist('id[]')  # Recupera id[]=1&id[]=2&id[]=3

    if not ids:
        return JsonResponse({"error": "Faltan parámetros o no se encontraron resultados."}, status=400)

    # Convertir a enteros
    try:
        ids = [int(i) for i in ids]
    except ValueError:
        return JsonResponse({"error": "IDs inválidos."}, status=400)

    # Consulta
    trofeos = Trofeo.objects.filter(id__in=ids)

    salida = []
    for t in trofeos:

        salida.append({
            "id": t.id,
            "nombre": t.nombre,
            "tipo": t.tipo,
            "icono": t.icono
        })

    return JsonResponse({"success": salida})
