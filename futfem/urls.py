from django.urls import path
from . import views

urlpatterns = [    
    path('jugadoraxnombre', views.jugadoraxnombre, name='jugadoraxnombre'),
    path('jugadora_trayectoria', views.jugadora_trayectoria, name='jugadora_trayectoria'),
    path('jugadora_pais', views.jugadora_pais, name='jugadora_pais'),
    path('equipoxid', views.equipoxid, name='equipoxid'),
    path('equiposxid', views.equiposxid, name='equiposxid'),
    path('equiposall', views.equiposAll, name='equiposall'),
    path('equiposxliga', views.equiposxliga, name='equiposxliga'),
    path('equipoxnombre', views.equipoxnombre, name='equipoxnombre'),
    path('paisesxid', views.paisesxid, name='paisesxid'),
    path('paisesall', views.paisesall, name='paisesall'),
    path('paisxnombre', views.paisxnombre, name='paisxnombre'),
    path('ligasxid', views.ligasxid, name='ligasxid'),
    path('ligasxpais', views.ligasxpais, name='ligasxpais'),
    path('jugadora_aleatoria', views.jugadora_aleatoria, name='jugadora_aleatoria'),
    path('jugadora_apodo', views.jugadora_apodo, name='jugadora_apodo'),
    path('jugadora_companyeras', views.jugadora_companeras, name='jugadora_companyeras'),
    path('jugadoraxid', views.jugadoraxid, name='jugadoraxid'),
    path('jugadora_datos', views.jugadora_datos, name='jugadora_datos'),
    path('jugadorasxequipo_temporada', views.jugadoras_por_equipo_y_temporada, name='jugadorasxequipo_temporada'),
    path('jugadoras', views.jugadoras_All, name='jugadoras'),
    path('posicionesall', views.posicionesall, name='posicionesall'),
    path('posicionxjugadora', views.posicion_por_jugadora, name='posicionxjugadora'),
]