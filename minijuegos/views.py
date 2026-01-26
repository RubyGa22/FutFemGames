from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache


from futfem.models import Equipo, Jugadora
from .models import Pista  # Asegúrate de tener el modelo Pista


@never_cache
def index(request):
    return render(request, 'minijuegos/index.html')


def loading(request):
    # Obtiene el parámetro ?url= que le pasas desde redirect.js
    url_final = request.GET.get('url', '')
    # Lo pasa al template para que el JS lo use
    return render(request, 'minijuegos/carga.html', {'url_final': url_final})


@never_cache
def futfemTrajectory(request):
        return render(request, 'minijuegos/trayectoria.html')


@never_cache
def futfemGrid(request):
        return render(request, 'minijuegos/grid.html')


@never_cache
def futfemBingo(request):
        return render(request, 'minijuegos/bingo.html')


@never_cache
def futfemWordle(request):
        return render(request, 'minijuegos/wordle.html')


@never_cache
def futfemMates(request):
        return render(request, 'minijuegos/companyeras.html')


@never_cache
def futfemGuess(request):
        return render(request, 'minijuegos/adivina.html')


@never_cache
def futfemXIClubs(request):
        return render(request, 'minijuegos/XI_Clubs.html')


@never_cache
def juegoxid(request):
    id_juego = request.GET.get('id_juego')

    if not id_juego:
        return JsonResponse({'error': 'No se proporcionó id_juego.'}, status=400)

    try:
        pista = Pista.objects.get(id_juego=id_juego)
    except Pista.DoesNotExist:
        return JsonResponse({'error': 'No se encontraron datos para el id_juego proporcionado.'}, status=404)

    # Si pista.valor ya es un dict, no usar json.loads
    valor = pista.valor

    return JsonResponse({'success': valor})


@never_cache
def wiki(request):
    return render(request, 'wiki/index.html')


@never_cache
def equipo_detalle(request, equipo_id):
    equipo = get_object_or_404(Equipo, id_equipo=equipo_id)
    return render(request, 'wiki/equipo_ficha.html', {'equipo': equipo})


@never_cache
def jugadora_detalle(request, id_jugadora):
    jugadora = get_object_or_404(Jugadora, id_jugadora=id_jugadora)
    
    # Diccionario serializable
    jugadora_data = json.dumps( {
        "id": jugadora.id_jugadora,
        "nombre": jugadora.Nombre,
        "apellidos": jugadora.Apellidos,
        "apodo": jugadora.Apodo,
        "nacimiento": jugadora.Nacimiento.isoformat(),
        "nacionalidad": jugadora.Nacionalidad.nombre if jugadora.Nacionalidad else None,
        "posicion": jugadora.Posicion.abreviatura if jugadora.Posicion else None,
        "imagen": jugadora.imagen if jugadora.imagen else None,
    })

    return render(request, 'wiki/jugadora_ficha.html', {
        "jugadora": jugadora,
        "jugadora_json": jugadora_data
    })