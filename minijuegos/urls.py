from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('loading', views.loading),
    path('career', views.futfemTrajectory),
    path('grid', views.futfemGrid),
    path('bingo', views.futfemBingo),
    path('wordle', views.futfemWordle),
    path('mates', views.futfemMates),
    path('guess', views.futfemGuess),
    path('api/juegoxid', views.juegoxid, name='juegoxid'),
    path('XI_Clubs', views.futfemXIClubs, name='futfemXIClubs'),
    path('wiki', views.wiki, name='wiki'),
    path('wiki/equipo/<int:equipo_id>/', views.equipo_detalle, name='wiki_equipo_detalle'),
    path('wiki/jugadora/<int:id_jugadora>/', views.jugadora_detalle, name='wiki_jugadora_detalle'),
]