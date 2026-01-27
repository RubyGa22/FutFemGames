from django.shortcuts import render, redirect
from .models import Usuario, Racha, Juego
from django.db import connection, IntegrityError
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def login_view(request):
    if request.method == 'POST':
        usuario_input = request.POST['usuario']
        password_input = request.POST['password']

        try:
            usuario = Usuario.objects.get(usuario=usuario_input)
        except Usuario.DoesNotExist:
            return render(request, 'login.html', {
                'error': 'Usuario o contraseña incorrectos'
            })

        if check_password(password_input, usuario.Contrasena):
            # 👉 guardamos sesión MANUAL
            request.session['usuario_id'] = usuario.id
            request.session['usuario_nombre'] = usuario.usuario
            request.session['rol_id'] = usuario.rol
            return redirect('/')
        else:
            return render(request, 'login.html', {
                'error': 'Usuario o contraseña incorrectos'
            })

    return render(request, 'login.html')

def logout_view(request):
     # Eliminar todos los datos de la sesión
    request.session.flush()  # borra la sesión y la cookie

    # Redirigir al login
    return redirect('login')

def sesion_view(request):
    return JsonResponse({
        'id': request.session.get('usuario_id'),
        'rol': request.session.get('rol_id')
    })

def registro_view(request):
    if request.method == 'POST':
        usuario = request.POST['usuario']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password != password2:
            return render(request, 'registro.html', {
                'error': 'Las contraseñas no coinciden'
            })

        try:
            Usuario.objects.create(
                usuario=usuario,
                Contrasena=make_password(password),
                rol=1
            )
        except IntegrityError:
            return render(request, 'registro.html', {
                'error': 'El usuario ya existe'
            })

        return redirect('/api/login/')

    return render(request, 'registro.html')

def perfil_view(request):
    """
    Muestra la página de perfil del usuario logueado.
    """
    if request.session.get('rol_id') not in [1,2]:
        return redirect('/')  # o HttpResponseForbidden()
    # Verificamos si hay sesión activa
    usuario_obj = None
    if 'usuario_id' in request.session:
        try:
            # Traemos el usuario junto con su jugadora_favorita
            usuario_obj = Usuario.objects.select_related('jugadora_favorita').get(
                id=request.session['usuario_id']
            )
        except Usuario.DoesNotExist:
            # Si el usuario no existe, borramos sesión y redirigimos al login
            request.session.flush()
            return redirect('login')

    if not usuario_obj:
        # Si no hay usuario en sesión, redirigimos al login
        return redirect('login')

    # Contexto para el template
    context = {
        'usuario': usuario_obj,
        'jugadora_favorita': usuario_obj.jugadora_favorita  # puede ser None
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

    return JsonResponse(data, safe=False)

@csrf_exempt
@require_POST
def juego_racha(request):
    """
    Actualiza o crea la racha de un usuario para un juego.
    Recibe POST con:
        - racha: int
        - juego: id del juego
        - user: id del usuario
    """
    try:
        print("POST DATA:", request.POST)

        racha_actual = int(request.POST.get('racha', 0))
        juego_id = int(request.POST.get('juego'))
        usuario_id = int(request.POST.get('user'))
        ultima_respuesta = request.POST.get('last_answer')

        # Obtener instancias
        usuario = Usuario.objects.get(id=usuario_id)
        juego = Juego.objects.get(id=juego_id)

        # Buscar si ya existe
        racha_obj = Racha.objects.filter(usuario=usuario, juego=juego).first()

        if racha_obj:
            # Actualizar racha existente
            racha_obj.racha_actual = racha_actual
            racha_obj.ultima_respuesta = ultima_respuesta
            racha_obj.save(update_fields=['racha_actual', 'ultima_respuesta'] if ultima_respuesta else ['racha_actual'])
        else:
            # Crear nueva racha sin campo id
            Racha.objects.create(usuario=usuario, juego=juego, racha_actual=racha_actual, ultima_respuesta=ultima_respuesta if ultima_respuesta else None)

        return JsonResponse({
            'success': True,
            'usuario': usuario.id,
            'juego': juego.id,
            'racha_actual': racha_actual,
            'ultima_respuesta': ultima_respuesta
        })

    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
    except Juego.DoesNotExist:
        return JsonResponse({'error': 'Juego no encontrado'}, status=404)
    except Exception as e:
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