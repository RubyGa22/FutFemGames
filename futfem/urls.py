from django.urls import path
from futfem import api_views
from futfem.views import api
from futfem.services import soccerdonna_service

urlpatterns = [    
    path('jugadoraxnombre', api_views.jugadoraxnombre, name='jugadoraxnombre'),
    path('jugadora_trayectoria', api_views.jugadora_trayectoria, name='jugadora_trayectoria'),
    path('jugadora_pais', api_views.jugadora_pais, name='jugadora_pais'),
    path('equipoxid', api_views.equipoxid, name='equipoxid'),
    path('equiposxid', api_views.equiposxid, name='equiposxid'),
    path('equiposall', api_views.equiposAll, name='equiposall'),
    path('equiposxliga', api_views.equiposxliga, name='equiposxliga'),
    path('equipoxnombre', api_views.equipoxnombre, name='equipoxnombre'),
    path('paisesxid', api_views.paisesxid, name='paisesxid'),
    path('paisesall', api_views.paisesall, name='paisesall'),
    path('paisxnombre', api_views.paisxnombre, name='paisxnombre'),
    path('ligasxid', api_views.ligasxid, name='ligasxid'),
    path('ligasxpais', api_views.ligasxpais, name='ligasxpais'),
    path('jugadora_aleatoria', api_views.jugadora_aleatoria, name='jugadora_aleatoria'),
    path('jugadora_apodo', api_views.jugadora_apodo, name='jugadora_apodo'),
    path('jugadora_companyeras', api_views.jugadora_companeras, name='jugadora_companyeras'),
    path('jugadoraxid', api_views.jugadoraxid, name='jugadoraxid'),
    path("random-player/", api_views.api_random_player, name="random_player"),
    path('jugadora_datos', api_views.jugadora_datos, name='jugadora_datos'),
    path('jugadorasxequipo_temporada', api_views.jugadoras_por_equipo_y_temporada, name='jugadorasxequipo_temporada'),
    path('jugadoras', api_views.jugadoras_All, name='jugadoras'),
    path('posicionesall', api_views.posicionesall, name='posicionesall'),
    path('posicionxjugadora', api_views.posicion_por_jugadora, name='posicionxjugadora'),
    path('posicionxnombre', api_views.posicionxnombre, name='posicionxnombre'),
    path('equipoxnombre', api_views.equipoxnombre, name='equipoxnombre'),
    path('jugadora_trofeos_individuales', api_views.trofeos_individuales, name='jugadora_trofeos_individuales'),
    path('equipo_palmares', api_views.equipo_palmares, name='equipo_palmares'),
    path('trofeosxid', api_views.trofeosxid, name='trofeosxid'),


    path("jugadora-valor-mercado/", api.obtener_valor_mercado, name="valor_mercado"),
    path("club_players/", api.api_club_players, name="club_players"),
    path("update_mkvalue/", api.actualizar_valores_jugadoras, name="update_mkvalue"),
    path("actualizar_soccerdonna_url/", api.actualizar_soccerdonna_url, name="actualizar_soccerdonna_url"),
]