from django.db import models
from django.contrib.auth.models import AbstractUser
from futfem.models import Jugadora, Juego

# Create your models here.
class Usuario(AbstractUser):
    # Usamos db_column para mapear tus nombres de columna actuales 
    id = models.AutoField(primary_key=True)
    # a los campos que Django ya entiende internamente.
    
    # Django ya tiene 'first_name', lo mapeamos a tu columna 'Nombre'
    first_name = models.CharField(db_column='Nombre', max_length=20) 
    
    # Django ya tiene 'last_name', lo mapeamos a 'Apellidos'
    last_name = models.CharField(db_column='Apellidos', max_length=50, blank=True, null=True)
    
    # Django ya tiene 'username', lo mapeamos a 'usuario'
    username = models.CharField(db_column='usuario', max_length=20, unique=True)
    email = models.EmailField(db_column='email', max_length=254, blank=True)
    
    # Django ya tiene 'password', lo mapeamos a 'Contrasena'
    password = models.CharField(db_column='Contrasena', max_length=255)

    # Campos adicionales que NO están en el User estándar de Django:
    rol = models.IntegerField()
    token = models.CharField(max_length=36)
    jugadora_favorita = models.ForeignKey(
        Jugadora, 
        db_column='jugadora_favorita', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )

    es_jugadora = models.IntegerField(default=None, blank=True, null=True)  # Nuevo campo para indicar si el usuario es jugadora

    class Meta:
        db_table = 'usuarios'
        #managed = True  # Mantenlo en False si no quieres que Django modifique la tabla

    def __str__(self):
        return self.username # Corregido: antes tenías self.Usuario (con U mayúscula)
    
class Racha(models.Model):
    usuario = models.ForeignKey(Usuario, db_column='usuario', on_delete=models.CASCADE, primary_key=False)
    juego = models.ForeignKey(Juego, db_column='juego', on_delete=models.CASCADE, primary_key=False)
    racha_actual = models.IntegerField(default=0)
    mejor_racha = models.IntegerField(default=0)
    ultima_respuesta = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'rachas'
        unique_together = ('usuario', 'juego')
        managed = False

    def __str__(self):
        return self.Racha