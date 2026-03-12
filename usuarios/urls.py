from django.urls import path
from . import views

urlpatterns = [
    path('accounts/login/', views.login_view, name='login'),
    path('accounts/reset-password/', views.solicitar_reset_password, name='reset_password'),
    path('accounts/restablecer-confirmar/<str:token>/', views.confirmar_nuevo_password, name='confirmar_password'),
    path('accounts/logout/', views.logout_view, name='logout'),
    path('accounts/registro/', views.registro_view, name='registro'),
    path('accounts/sesion/', views.sesion_view, name='sesion'),
    path('accounts/perfil/', views.perfil_view, name='perfil'),
    path('accounts/perfil/<str:username>/', views.perfil_view, name='ver_perfil'),
    path('accounts/usuarioxnombre/', views.usuarioxnombre, name='usuarioxnombre'),
    path('accounts/racha/', views.obtener_rachas, name='racha'),
    path('accounts/juego_racha/', views.juego_racha, name='juego_racha'),
    path('accounts/ultima_respuesta/', views.obtener_ultima_respuesta, name='ultima_respuesta'),
    path('ranking/', views.ranking_view, name='rankings'),
    path('api/rankings/', views.api_rankings, name='api_rankings'),
    path('accounts/findusers/', views.find_user_view, name='find_user'),

    path('accounts/jugadora_favorita/', views.actualizar_jugadora_favorita, name='actualizar_jugadora_favorita'),
    path('accounts/actualizar_perfil/', views.actualizar_perfil, name='actualizar_perfil'),
    path('accounts/email/', views.email, name='email'),
 ]