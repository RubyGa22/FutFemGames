from .models import Usuario  # o donde tengas tu modelo

def usuario_sesion(request):
    """
    Usa el sistema de autenticación de Django en lugar de IDs manuales
    """
    if request.user.is_authenticated:
        return {
            'usuario_sesion': request.user
        }
    return {
        'usuario_sesion': None
    }

