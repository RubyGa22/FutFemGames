from django.shortcuts import render
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache

from futfem.models import Equipo, Jugadora

# Create your views here.
@never_cache
def wiki(request):
    return render(request, 'index.html')


@never_cache
def equipo_detalle(request, equipo_id):
    equipo = get_object_or_404(Equipo, id_equipo=equipo_id)
    return render(request, 'equipo_ficha.html', {'equipo': equipo})


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

    return render(request, 'jugadora_ficha.html', {
        "jugadora": jugadora,
        "jugadora_json": jugadora_data
    })