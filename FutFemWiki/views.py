from django.shortcuts import redirect, render
from futfem.api_views import formatear_nombre_corto
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth.decorators import login_required
from django.utils.text import slugify
from django.views.decorators.cache import never_cache

from futfem.models import Equipo, Jugadora, JugadoraPais

# Create your views here.
@never_cache
def wiki(request):
    return render(request, 'index.html')

@never_cache
def mapa(request):
    return render(request, 'mapa.html')

@never_cache
def equipos(request):
    return render(request, 'index.html', {'seccion': 'equipos'})

@never_cache
def jugadoras(request):
    return render(request, 'index.html', {'seccion': 'jugadoras'})

def equipo_detalle(request, equipo_id, slug_equipo):
    equipo = get_object_or_404(Equipo, id_equipo=equipo_id)
    actual_slug = slugify(equipo.nombre)
    if slug_equipo != actual_slug:
        return redirect('wiki_equipo_detalle', equipo_id=equipo.id_equipo, slug_equipo=actual_slug)

    return render(request, 'equipo_ficha.html', {'equipo': equipo})


@never_cache
def jugadora_detalle(request, id_jugadora, slug_jugadora=None):
    jugadora = get_object_or_404(Jugadora, id_jugadora=id_jugadora)
    nacionalidades_qs = JugadoraPais.objects.filter(jugadora=id_jugadora).select_related('pais')
    jp_principal = nacionalidades_qs.filter(es_primaria=True).first()
    todas_nacionalidades = list(nacionalidades_qs.values_list('pais_id', flat=True))
    todos_isos = [n.pais.iso.lower() for n in nacionalidades_qs if n.pais and n.pais.iso]
    actual_slug = slugify(formatear_nombre_corto(jugadora.Nombre, jugadora.Apellidos))
    
    # Diccionario serializable
    jugadora_data = json.dumps( {
        "id": jugadora.id_jugadora,
        "nombre": jugadora.Nombre,
        "apellidos": jugadora.Apellidos,
        "apodo": jugadora.Apodo,
        "nacimiento": jugadora.Nacimiento.isoformat(),
        "nacionalidad": jp_principal.pais.id_pais if jp_principal else None,
        "imagen": jugadora.imagen if jugadora.imagen else None,
    })

    if slug_jugadora != actual_slug:
        return redirect('wiki_jugadora_detalle', id_jugadora=jugadora.id_jugadora, slug_jugadora=actual_slug)

    return render(request, 'jugadora_ficha.html', {
        "jugadora": jugadora,
        "jugadora_json": jugadora_data
    })