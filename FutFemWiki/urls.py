from django.urls import path
from . import views

urlpatterns = [
    path('wiki/', views.wiki, name='wiki'),
    path('mapa/', views.mapa, name='mapa'),
    path('jugadoras/', views.jugadoras, name='players'),
    path('equipos/', views.equipos, name='equipos'),
    path('equipo/<int:equipo_id>/<slug:slug_equipo>/', views.equipo_detalle, name='wiki_equipo_detalle'),
    path('jugadora/<int:id_jugadora>/<slug:slug_jugadora>/', views.jugadora_detalle, name='wiki_jugadora_detalle'),
]