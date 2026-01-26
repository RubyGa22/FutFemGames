from django.shortcuts import render, redirect
from .models import Usuario, Racha
from django.db import connection, IntegrityError
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password, check_password
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

@require_POST
def juego_racha(request):
    try:
        usuario_id = request.POST.get('user')
        juego_id = request.POST.get('juego')
        racha_actual = request.POST.get('racha')

        if not usuario_id or not juego_id or racha_actual is None:
            return JsonResponse(
                {'error': 'Faltan datos'},
                status=400
            )

        racha_actual = int(racha_actual)

        racha_obj, created = Racha.objects.get_or_create(
            usuario_id=usuario_id,
            juego_id=juego_id,
            defaults={
                'racha_actual': racha_actual,
                'mejor_racha': racha_actual
            }
        )

        if not created:
            racha_obj.racha_actual = racha_actual

            # actualizar mejor racha si procede
            if racha_actual > racha_obj.mejor_racha:
                racha_obj.mejor_racha = racha_actual

            racha_obj.save()

        return JsonResponse({
            'usuario': usuario_id,
            'juego': juego_id,
            'racha_actual': racha_obj.racha_actual,
            'mejor_racha': racha_obj.mejor_racha,
            'created': created
        })

    except ValueError:
        return JsonResponse({'error': 'Racha inválida'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)