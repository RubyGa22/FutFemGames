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

def nosotros(request):
    # Obtiene el parámetro ?url= que le pasas desde redirect.js
    # Lo pasa al template para que el JS lo use
    return render(request, 'nosotros.html')


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
def futfemHigherLower(request):
        return render(request, 'minijuegos/higher-lower.html')

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

