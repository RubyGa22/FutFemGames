from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('registro/', views.registro_view, name='registro'),
    path('sesion/', views.sesion_view, name='sesion'),
    path('perfil/', views.perfil_view, name='perfil'),
    path('racha/', views.obtener_rachas, name='racha'),
    path('juego_racha/', views.juego_racha, name='juego_racha'),
    path('ultima_respuesta/', views.obtener_ultima_respuesta, name='ultima_respuesta')
 ]