from django.db import models
from futfem.models import Jugadora, Juego

# Create your models here.
class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    Nombre = models.TextField()  
    Apellidos = models.TextField()  
    usuario = models.CharField(max_length=20, unique=True)	
    rol = models.IntegerField()
    token = models.CharField(max_length=36)
    jugadora_favorita = models.ForeignKey(Jugadora,db_column='jugadora_favorita',null=True,blank=True,on_delete=models.SET_NULL)
    Contrasena = models.CharField(max_length=255)  

    class Meta:
        db_table = 'usuarios'
        managed = False

    def __str__(self):
        return self.Usuario
    
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