from .models import Usuario  # o donde tengas tu modelo

def usuario_sesion(request):
    """
    Añade la información del usuario loggeado (desde sesión manual) al contexto
    """
    usuario = None
    if 'usuario_id' in request.session:
        try:
            usuario_obj = Usuario.objects.select_related('jugadora_favorita').get(id=request.session['usuario_id'])
            usuario = usuario_obj  # aquí pasamos el objeto entero
        except Usuario.DoesNotExist:
            usuario = None

    return {
        'usuario_sesion': usuario
    }

