from django.urls import path
from . import views

urlpatterns = [    
    path('jugadoraxnombre', views.jugadoraxnombre, name='jugadoraxnombre'),
    path('jugadora_trayectoria', views.jugadora_trayectoria, name='jugadora_trayectoria'),
    path('jugadora_pais', views.jugadora_pais, name='jugadora_pais'),
    path('equiposxid', views.equiposxid, name='equiposxid'),
    path('paisesxid', views.paisesxid, name='paisesxid'),
    path('ligasxid', views.ligasxid, name='ligasxid'),
    path('jugadora_aleatoria', views.jugadora_aleatoria, name='jugadora_aleatoria'),
    path('jugadora_apodo', views.jugadora_apodo, name='jugadora_apodo'),
]