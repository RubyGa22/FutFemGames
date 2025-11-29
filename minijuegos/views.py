from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Pista  # Asegúrate de tener el modelo Pista

# Create your views here.
def index(request):
    return render(request, 'minijuegos/index.html')

def loading(request):
    # Obtiene el parámetro ?url= que le pasas desde redirect.js
    url_final = request.GET.get('url', '')
    # Lo pasa al template para que el JS lo use
    return render(request, 'minijuegos/carga.html', {'url_final': url_final})

def futfemTrajectory(request):
        return render(request, 'minijuegos/trayectoria.html')

def futfemGrid(request):
        return render(request, 'minijuegos/grid.html')

def futfemBingo(request):
        return render(request, 'minijuegos/bingo.html')

def futfemWordle(request):
        return render(request, 'minijuegos/wordle.html')

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