from django.db import models

# Create your models here.
class Pais(models.Model):
    id_pais = models.AutoField(primary_key=True)
    nombre = models.TextField()
    iso = models.CharField(max_length=10, null=True, blank=True, db_column='iso')  # Código ISO del país

    class Meta:
        db_table = 'paises'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.nombre


class Liga(models.Model):
    id_liga = models.AutoField(primary_key=True)
    nombre = models.TextField()
    logo = models.TextField(null=True, blank=True)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE, db_column='pais')  # Si tienes tabla de países, cámbiala luego a ForeignKey

    class Meta:
        db_table = 'ligas'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba


    def __str__(self):
        return self.nombre


class Equipo(models.Model):
    id_equipo = models.AutoField(primary_key=True)
    liga = models.ForeignKey(Liga, on_delete=models.CASCADE, db_column='liga')
    nombre = models.TextField()
    escudo = models.TextField(null=True, blank=True)
    color = models.CharField(max_length=7, null=True, blank=True)  # Color en formato hexadecimal

    class Meta:
        db_table = 'equipos'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.nombre


class Posicion(models.Model):
    idPosicion = models.IntegerField(primary_key=True)
    nombre = models.TextField()
    abreviatura = models.CharField(max_length=4)
    idPosicionPadre = models.ForeignKey(
        'self',  # referencia recursiva
        on_delete=models.CASCADE,
        db_column='idPosicionPadre',
        null=True,
        blank=True
    )


    class Meta:
            db_table = 'posiciones'
            managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return f"{self.nombre} {self.abreviatura}"


class Jugadora(models.Model):
    id_jugadora = models.AutoField(primary_key=True)
    Nombre = models.TextField()  
    Apellidos = models.TextField()     
    Apodo = models.TextField()     
    Nacimiento = models.DateField(max_length=255)     
    Nacionalidad = models.ForeignKey(Pais, on_delete=models.CASCADE, db_column='Nacionalidad')     
    Posicion = models.ForeignKey(Posicion, on_delete=models.CASCADE, db_column='Posicion')     
    imagen = models.TextField(null=True) 
    altura = models.FloatField(null=True)
    pie_habil = models.TextField(null=True, max_length=12)
    soccerdonna_url = models.URLField(unique=True)
    market_value = models.IntegerField(null=True, blank=True)    
    retiro = models.IntegerField()     

    class Meta:
            db_table = 'jugadoras'
            managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.Jugadora
    
class Trofeo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.TextField()
    tipo = models.TextField(null=True, blank=True)
    icono = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'trofeos'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.Trofeo


class Trayectoria(models.Model):
    id = models.AutoField(primary_key=True)
    jugadora = models.ForeignKey(Jugadora, on_delete=models.CASCADE, db_column='jugadora')
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE, db_column='equipo')
    años = models.TextField()
    imagen = models.TextField(null=True, blank=True)
    equipo_actual = models.BooleanField()

    class Meta:
        db_table = 'trayectoria'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return f"{self.jugadora} - {self.equipo} ({self.años})"

class Juego(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    slug = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'juegos'
        managed = False
    
    def __str__(self):
        return self.Juego

class Pista(models.Model):
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE, db_column='id_juego')
    descripcion = models.TextField()
    valor = models.TextField()

    class Meta:
        db_table = 'pistas'
        managed = False