"""
URL configuration for FutFemGames project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.i18n import JavaScriptCatalog, set_language
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from django.views.static import serve
from django.utils.cache import patch_cache_control

admin.site.site_header = "FutFem Games Admin"       # Título de la barra superior
admin.site.site_title = "Panel de Control"          # Título de la pestaña del navegador
admin.site.index_title = "Gestión del Juego"        # Subtítulo en la página de inicio

urlpatterns = [
    path("__reload__/", include("django_browser_reload.urls")),
    path("__debug__/", include("debug_toolbar.urls")),
    path('admin/', admin.site.urls),
    path('', include('minijuegos.urls')),
    path('api/', include('futfem.urls')),
    path('', include('usuarios.urls')),
    path('', include('FutFemWiki.urls')),
    path('i18n/setlang/', csrf_exempt(set_language), name='set_language'),
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
]


def serve_media_with_smart_cache(request, path, document_root=None, show_indexes=False):
    response = serve(request, path, document_root, show_indexes)
    # Si es un escudo (carpeta clubes), le damos 1 año de vida
    if "/clubes/" in request.path.lower() and response.status_code == 200:
        patch_cache_control(response, public=True, max_age=31536000, immutable=True)
    return response

if settings.DEBUG:
    # No usamos static(), usamos nuestra vista personalizada
    urlpatterns += [
        path(f"{settings.MEDIA_URL.lstrip('/')}<path:path>", serve_media_with_smart_cache, {'document_root': settings.MEDIA_ROOT}),
    ]
