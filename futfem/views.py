from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Q
from .models import Jugadora, Trayectoria, Equipo, Pais, Liga
from random import shuffle

# Create your views here.
def jugadoraxnombre(request):
    nombre = request.GET.get('nombre', '').strip()
    if not nombre:
        return JsonResponse({'error': 'Nombre de jugadora no proporcionado'}, status=400)

    # Búsqueda parcial (case-insensitive)
    jugadoras = (
        Jugadora.objects
        .filter(
            Q(Nombre__icontains=nombre) |
            Q(Apodo__icontains=nombre) |
            Q(Apellidos__icontains=nombre)
        )
        .select_related('Nacionalidad', 'Posicion')  # optimiza las relaciones
    )

    if not jugadoras.exists():
        return JsonResponse({'error': 'No se encontraron jugadoras con ese nombre.'}, status=404)

    data = []
    for j in jugadoras:
        data.append({
            'id_jugadora': j.id_jugadora,
            'Nombre_Completo': f"{j.Nombre} {j.Apellidos}",
            'imagen': j.imagen or './static/img/predeterm.jpg',
            'Apodo': j.Apodo,
            'Nacimiento': j.Nacimiento.strftime("%Y-%m-%d"),
            'Nacionalidad': j.Nacionalidad.nombre if j.Nacionalidad else None,
            'Posicion': j.Posicion.nombre if j.Posicion else None,
        })

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
    ).exclude(
    equipo__liga__id_liga=17
    ).select_related('equipo', 'jugadora').order_by('años')

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
            'años': t.años,
            'imagen': t.imagen,  # o t.imagen codificada si quieres
            'equipo_actual': t.equipo_actual,
            'escudo': escudo,
            'liga': equipo.liga.id_liga if equipo.liga else None,
            'nombre': equipo.nombre,
            'ImagenJugadora': imagen_jugadora,
        })

    return JsonResponse(data, safe=False)

def jugadora_pais(request):
    nombre = request.GET.get('nombre', '').strip()  # Realmente es el ID

    if not nombre:
        return JsonResponse({"error": "Nombre de jugadora no proporcionado"}, status=400)

    try:
        jugadora = Jugadora.objects.get(id_jugadora=nombre)
    except Jugadora.DoesNotExist:
        return JsonResponse({"error": "No se encontró ninguna jugadora con ese nombre"}, status=404)
    
    pais_id = jugadora.Nacionalidad.id_pais if jugadora.Nacionalidad else None

    return JsonResponse({
        "Pais": pais_id,
        "NCompleto": f"{jugadora.Nombre} {jugadora.Apellidos}"
    })

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
        escudo_base64 = None
        if e.escudo: 
            try:
                escudo_base64 = e.escudo
            except Exception:
                escudo_base64 = None

        salida.append({
            "club": e.id_equipo,
            "nombre": e.nombre,
            "escudo": escudo_base64
        })

    return JsonResponse({"success": salida})

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
        escudo_base64 = None
        if p.bandera: 
            try:
                escudo_base64 = p.bandera
            except Exception:
                escudo_base64 = None

        salida.append({
            "pais": p.id_pais,
            "nombre": p.nombre,
            "bandera": escudo_base64
        })

    return JsonResponse({"success": salida})

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

def jugadora_aleatoria(request):
    nacionalidades = request.GET.getlist("nacionalidades[]")
    equipos = request.GET.getlist("equipos[]")
    ligas = request.GET.getlist("ligas[]")

    # Convertir a enteros (ignorar si no son válidos)
    try:
        nacionalidades = [int(x) for x in nacionalidades]
        equipos = [int(x) for x in equipos]
        ligas = [int(x) for x in ligas]
    except ValueError:
        return JsonResponse({"error": "Parámetros inválidos"}, status=400)

    def obtener_jugadoras(filtro, valores):
        if not valores:
            return {}

        qs = Jugadora.objects.select_related().all()

        if filtro == "pais":
            qs = qs.filter(Nacionalidad__in=valores)

        elif filtro == "equipo":
            qs = qs.filter(trayectoria__equipo__in=valores)

        elif filtro == "liga":
            qs = qs.filter(trayectoria__equipo__liga__in=valores)

        # Distinct + random
        qs = qs.distinct().order_by("?")[:10]

        salida = {}
        for j in qs:
            # Imagen base64
            imagen = None
            if j.imagen:
                try:
                    imagen = j.imagen
                except Exception:
                    imagen = None

            salida[j.id_jugadora] = {
                "id": j.id_jugadora,
                "nombre": f"{j.Nombre} {j.Apellidos}",
                "imagen": imagen,
                "pais": j.Nacionalidad.id_pais,
                "Nacimiento": j.Nacimiento,
            }

        return salida

    # Obtener sets
    jugadoras_pais = obtener_jugadoras("pais", nacionalidades)
    jugadoras_equipo = obtener_jugadoras("equipo", equipos)
    jugadoras_liga = obtener_jugadoras("liga", ligas)

    # Combinar asegurando unicidad por ID
    jugadoras = {**jugadoras_pais, **jugadoras_equipo, **jugadoras_liga}
    jugadoras = list(jugadoras.values())

    # Limitar a 30 aleatorias
    if len(jugadoras) > 30:
        shuffle(jugadoras)
        jugadoras = jugadoras[:30]

    return JsonResponse(jugadoras, safe=False)

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