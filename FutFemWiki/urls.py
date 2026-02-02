from django.urls import path
from . import views

urlpatterns = [
    path('wiki/', views.wiki, name='wiki'),
    path('wiki/equipo/<int:equipo_id>/', views.equipo_detalle, name='wiki_equipo_detalle'),
    path('wiki/jugadora/<int:id_jugadora>/', views.jugadora_detalle, name='wiki_jugadora_detalle'),
]