import json
from multiprocessing import context
import uuid

from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.utils.translation import gettext as _
from .models import Usuario, Racha, Juego
from django.db import connection, IntegrityError
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import update_last_login # Importa esto
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def login_view(request):

    if request.user.is_authenticated:
        return redirect('/') # Si ya está dentro, que no vea el formulario
    
    if request.method == 'POST':
        usuario_input = request.POST['usuario']
        password_input = request.POST['password']

        try:
            usuario = Usuario.objects.get(username=usuario_input)
        except Usuario.DoesNotExist:
            return render(request, 'login.html', {
                'error': 'Usuario o contraseña incorrectos'
            })

        if check_password(password_input, usuario.password):

            if not usuario.is_active:
                return render(request, 'login.html', {'error': 'Esta cuenta ha sido desactivada.'})
            
            login(request, usuario) # Esto actualiza last_login y crea la sesión
            request.session['usuario_id'] = usuario.id
            request.session['usuario_nombre'] = usuario.username
            request.session['rol_id'] = usuario.rol
            return redirect('/')
        
        else:
            return render(request, 'login.html', {
                'error': 'Usuario o contraseña incorrectos'
            })

    return render(request, 'login.html')

def solicitar_reset_password(request):
    if request.method == 'POST':
        email_usuario = request.POST.get('email')
        usuario = Usuario.objects.filter(email=email_usuario).first()

        if usuario:
            # 1. Generar token
            nuevo_token = str(uuid.uuid4())
            usuario.token = nuevo_token
            usuario.save()

            # 2. Definir variables para el correo
            enlace = f"http://{request.get_host()}/accounts/restablecer-confirmar/{nuevo_token}/"
            
            # --- AQUÍ DEFINIMOS EL CONTEXTO ---
            context = {
                'usuario': usuario.username,  # Asegúrate que el campo es .usuario o .Nombre
                'enlace': enlace,
            }

            # 3. Renderizar el HTML y crear versión de texto plano
            html_message = render_to_string('partials/email.html', context)
            plain_message = strip_tags(html_message)
            asunto = _("Restablecer Contraseña - FutFem Games")
            
            try:
                send_mail(
                    asunto,
                    plain_message,
                    'valenciansports@gmail.com',
                    [usuario.email],
                    html_message=html_message,  # <--- ¡ESTO ES LO QUE ENVÍA EL DISEÑO!
                    fail_silently=False,
                )
                return render(request, 'password_enviado_exito.html', {'email': email_usuario})
            except Exception as e:
                print(f"Error: {e}") # Para que veas el error en consola si falla
                return render(request, 'reset_password.html', {'error': _("Error al enviar el correo.")})
        else:
            return render(request, 'reset_password.html', {'error': _("No encontramos ese email.")})

    return render(request, 'reset_password.html')

def confirmar_nuevo_password(request, token):
    # 1. Buscamos al usuario que tenga ese token en tu tabla
    usuario = Usuario.objects.filter(token=token).first()

    # Si el token no es válido o no existe
    if not usuario:
        return render(request, 'reset_password.html', {
            'error': _("El enlace es inválido o ha expirado.")
        })

    if request.method == 'POST':
        pass1 = request.POST.get('pass1')
        pass2 = request.POST.get('pass2')

        if pass1 != pass2:
            return render(request, 'nuevo_password_form.html', {
                'error': _("Las contraseñas no coinciden."),
                'token': token
            })

        # 2. Encriptamos la nueva contraseña (importante usar make_password)
        usuario.password = make_password(pass1)
        
        # 3. Invalidamos el token usado generando uno nuevo
        usuario.token = str(uuid.uuid4())
        usuario.save()

        # 4. Redirigimos al login con un mensaje de éxito

        return redirect('login')
    # Si es GET, mostramos el formulario para ingresar la nueva clave
    return render(request, 'nuevo_password_form.html', {'token': token})

def logout_view(request):
     # Eliminar todos los datos de la sesión
    request.session.flush()  # borra la sesión y la cookie
    logout(request)
    # Redirigir al login
    return redirect('login')

def sesion_view(request):
    if request.user.is_authenticated:
        # Si usas AbstractUser, los datos están en el objeto 'user'
        return JsonResponse({
            'autenticado': True,
            'id': request.user.id,
            'rol': getattr(request.user, 'rol', None), # Usa getattr por seguridad
            'username': request.user.username
        })
    
    # IMPORTANTE: No devuelvas 401 si el frontend se vuelve loco al recibir errores
    # Es mejor devolver 200 con autenticado: False para que el JS sepa qué hacer
    return JsonResponse({
        'autenticado': False,
        'mensaje': 'No hay sesión activa'
    }, status=200)

def registro_view(request):
    if request.method == 'POST':
        usuario = request.POST['usuario']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password != password2:
            return render(request, 'registro.html', {
                'error': 'Las contraseñas no coinciden'
            })

        try:
            Usuario.objects.create(
                username=usuario, 
                email=email,
                password=make_password(password), # Django lo mapeará a 'Contrasena'
                rol=2,
                is_active=True,
                is_staff=False,
                is_superuser=False,
                date_joined=timezone.now()
            )
        except IntegrityError:
            return render(request, 'registro.html', {
                'error': 'El usuario ya existe'
            })

        return redirect('/api/login/')

    return render(request, 'registro.html')

def ranking_view(request):
    return render(request, 'ranking.html')

def find_user_view(request):
    return render(request, 'findusers.html')

def api_rankings(request):
    juego_id = request.GET.get('juego', 'all')
    
    # Traemos el usuario, su jugadora favorita y el juego en una sola consulta
    query = Racha.objects.select_related('usuario__jugadora_favorita', 'juego')
    
    if juego_id != 'all':
        query = query.filter(juego_id=juego_id)
        
    rankings = query.order_by('-mejor_racha')[:10]
    
    data = []
    for r in rankings:
        # Obtenemos la imagen o una por defecto si no tiene jugadora favorita
        foto_url = None
        if r.usuario.jugadora_favorita and r.usuario.jugadora_favorita.imagen:
            foto_url = f"/{r.usuario.jugadora_favorita.imagen}" # Ajusta según tu MEDIA_URL
        else:
            foto_url = "/static/img/default-avatar.png" # Imagen por defecto

        data.append({
            'username': r.usuario.username,
            'nombre_juego': r.juego.nombre,
            'mejor_racha': r.mejor_racha,
            'foto_perfil': foto_url,
            'es_jugadora': r.usuario.es_jugadora,
            'miembro': r.usuario.is_staff or r.usuario.is_superuser
        })
    
    return JsonResponse(data, safe=False)

def usuarioxnombre(request):
    nombre = request.GET.get('nombre', '')
    if not nombre:
        return JsonResponse({'error': 'Falta el parámetro nombre'}, status=400)

    usuarios_qs = Usuario.objects.filter(username__icontains=nombre).select_related('jugadora_favorita')[:10]
    
    data = []
    for u in usuarios_qs:
        data.append({
            'id': u.id,
            'usuario': u.username,
            'Nombre': u.first_name,
            'Apellidos': u.last_name,
            'jugadora_favorita': u.jugadora_favorita.imagen if u.jugadora_favorita else None,
            'es_jugadora': u.es_jugadora,
            'miembro': u.is_staff or u.is_superuser
        })
    
    return JsonResponse(data, safe=False)

def perfil_view(request, username=None):
    # 1. Seguridad de roles
    if request.session.get('rol_id') not in [1, 2]:
        return redirect('/')

    # 2. Lógica de búsqueda
    if username:
        # Buscamos por el nombre que viene en la URL
        usuario_obj = get_object_or_404(
            Usuario.objects.select_related('jugadora_favorita'), 
            username=username
        )
    else:
        # Si no hay username en la URL, buscamos el mío (el de la sesión)
        mi_id = request.session.get('usuario_id')
        if not mi_id:
            return redirect('login')
        usuario_obj = get_object_or_404(
            Usuario.objects.select_related('jugadora_favorita'), 
            id=mi_id
        )

    # 3. ¿Es mi propio perfil?
    # Comparamos el ID del usuario encontrado con el ID de mi sesión
    es_propio = (request.session.get('usuario_id') == usuario_obj.id)

    context = {
        'usuario': usuario_obj,
        'jugadora_favorita': usuario_obj.jugadora_favorita,
        'es_propio': es_propio,
        'es_jugadora': usuario_obj.es_jugadora,
        'miembro': usuario_obj.is_staff or usuario_obj.is_superuser
    }
    return render(request, 'perfil.html', context)

def obtener_rachas(request):
    """
    Devuelve las rachas de un usuario.
    - Si se pasa `juego`, devuelve solo ese juego.
    - Si no, devuelve todas.
    """
    usuario_id = request.GET.get('usuario')
    juego_id = request.GET.get('juego')

    if not usuario_id:
        return JsonResponse({'error': 'Falta usuario'}, status=400)

    filtros = {'usuario_id': usuario_id}
    if juego_id:
        filtros['juego_id'] = juego_id

    rachas_qs = (
        Racha.objects
        .filter(**filtros)
        .select_related('juego')
        .values(
            'usuario_id',
            'racha_actual',
            'mejor_racha',

            # 🔽 campos del juego
            'juego__id',
            'juego__nombre',
            'juego__slug',
        )
    )

    data = [
        {
            'usuario_id': r['usuario_id'],
            'racha_actual': r['racha_actual'],
            'mejor_racha': r['mejor_racha'],
            'juego': {
                'id': r['juego__id'],
                'nombre': r['juego__nombre'],
                'slug': r['juego__slug'],
            }
        }
        for r in rachas_qs
    ]

    # SI SE PIDE UN JUEGO ESPECÍFICO Y NO HAY RACHA, ENVIAMOS VALORES EN 0
    if not data and juego_id:
        return JsonResponse([{
            'usuario_id': int(usuario_id),
            'racha_actual': 0,
            'mejor_racha': 0,
            'ultima_respuesta': None,
            'juego': {'id': int(juego_id), 'nombre': '', 'slug': ''}
        }], safe=False)

    return JsonResponse(data, safe=False)

def email(request):
    return render(request, 'partials/email.html')

@csrf_exempt
@require_POST
def juego_racha(request):
    try:
        # 1. Obtener datos (usamos 0 como fallback para números)
        racha_actual = int(request.POST.get('racha', 0))
        juego_id = int(request.POST.get('juego'))
        usuario_id = int(request.POST.get('user'))
        ultima_respuesta = request.POST.get('last_answer')
        
        # Si no envían mejor_racha, usamos la racha_actual por defecto
        mejor_racha_input = request.POST.get('mejor_racha')
        mejor_racha_input = int(mejor_racha_input) if mejor_racha_input else racha_actual

        # 2. Buscar si ya existe la racha
        racha_obj = Racha.objects.filter(usuario_id=usuario_id, juego_id=juego_id).first()

        if racha_obj:
            # ACTUALIZAR
            racha_obj.racha_actual = racha_actual
            
            # Solo actualizamos la mejor racha si la recibida es mayor a la que ya tenemos
            if mejor_racha_input > racha_obj.mejor_racha:
                racha_obj.mejor_racha = mejor_racha_input
            
            if ultima_respuesta:
                racha_obj.ultima_respuesta = ultima_respuesta
            
            # IMPORTANTE: Quitamos update_fields para evitar que Django ignore campos
            racha_obj.save()
        else:
            # CREAR
            Racha.objects.create(
                usuario_id=usuario_id,
                juego_id=juego_id,
                racha_actual=racha_actual,
                mejor_racha=mejor_racha_input,
                ultima_respuesta=ultima_respuesta
            )

        return JsonResponse({
            'success': True,
            'racha_actual': racha_actual,
            'mejor_racha': mejor_racha_input
        })

    except Exception as e:
        print(f"Error grave en racha: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

def obtener_ultima_respuesta(request):
    """
    Devuelve la última respuesta de un usuario para un juego concreto.
    """
    usuario_id = request.GET.get('usuario')
    juego_id = request.GET.get('juego')

    if not usuario_id or not juego_id:
        return JsonResponse(
            {'error': 'Faltan parámetros usuario o juego'},
            status=400
        )

    racha = (
        Racha.objects
        .filter(usuario_id=usuario_id, juego_id=juego_id)
        .values('ultima_respuesta')
        .first()
    )

    return JsonResponse({
        'usuario_id': int(usuario_id),
        'juego_id': int(juego_id),
        'ultima_respuesta': racha['ultima_respuesta'] if racha else None
    })

@csrf_exempt
def actualizar_jugadora_favorita(request):
    if request.method == 'PUT':
        usuario_id = request.session.get('usuario_id')
        
        try:
            # Parseamos el JSON del cuerpo de la petición
            data = json.loads(request.body)
            jugadora_id = data.get('jugadora') # Ahora sí llegará
            
            print(f"Actualizando: usuario={usuario_id}, jugadora={jugadora_id}")
            
            # Lógica para actualizar en la DB...
            usuario = Usuario.objects.get(id=usuario_id)
            usuario.jugadora_favorita_id = jugadora_id
            usuario.save()
            
            return JsonResponse({'status': 'ok', 'message': 'Actualizado correctamente'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
        
@csrf_exempt
def actualizar_perfil(request):
    if request.method == 'PUT':
        usuario_id = request.session.get('usuario_id')
        data = json.loads(request.body)
        campo = data.get('campo')
        valor = data.get('valor')
        
        try:
            usuario = Usuario.objects.get(id=usuario_id)
            
            if campo in ['username', 'first_name', 'last_name']:
                # Validar duplicados si es username
                if campo == 'username' and Usuario.objects.filter(username=valor).exclude(id=usuario_id).exists():
                    return JsonResponse({'status': 'error', 'message': 'Username ya ocupado'}, status=400)
                
                setattr(usuario, campo, valor)
                usuario.save()
                return JsonResponse({'status': 'ok', 'reload': campo == 'username'})

            elif campo == 'jugadora_favorita':
                j_id = data.get('jugadora_id')
                usuario.jugadora_favorita_id = j_id
                usuario.save()
                return JsonResponse({'status': 'ok', 'reload': True})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)