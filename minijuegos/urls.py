from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('loading', views.loading),
    path('nosotros', views.nosotros, name='nosotros'),
    path('career', views.futfemTrajectory),
    path('grid', views.futfemGrid),
    path('bingo', views.futfemBingo),
    path('wordle', views.futfemWordle),
    path('mates', views.futfemMates),
    path('guess', views.futfemGuess),
    path('api/juegoxid', views.juegoxid, name='juegoxid'),
    path('XI_Clubs', views.futfemXIClubs, name='futfemXIClubs'),
]