from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('loading', views.loading),
    path('career', views.futfemTrajectory),
    path('grid', views.futfemGrid),
    path('bingo', views.futfemBingo),
    path('wordle', views.futfemWordle),
    path('api/juegoxid', views.juegoxid, name='juegoxid')
]