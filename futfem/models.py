from django.db import models

# Create your models here.
class Formacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.TextField()
    descripcion = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'formaciones'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.nombre

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
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE, db_column='pais', db_index=True)  # Si tienes tabla de países, cámbiala luego a ForeignKey

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
    latitud = models.FloatField(null=True, blank=True)
    longitud = models.FloatField(null=True, blank=True)
    equipo_sucesor = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, db_column='equipo_sucesor', related_name='versiones_antiguas',verbose_name="Convertido en / Sucesor de")

    class Meta:
        db_table = 'equipos'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.nombre

class EquipoFormacion(models.Model):
    id = models.AutoField(primary_key=True)
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE, db_column='equipo')
    formacion = models.ForeignKey(Formacion, on_delete=models.CASCADE, db_column='formacion')
    temporada = models.CharField(max_length=10, db_column='temporada')
    es_principal = models.BooleanField(default=False, db_column='es_principal')

    class Meta:
        db_table = 'equipo-formacion'
        managed = False

    def __str__(self):
        return f"{self.equipo.nombre} - {self.formacion.nombre} ({self.temporada})"

class EquipoTrofeo(models.Model):
    # Django creará el campo 'id' automático (AUTO_INCREMENT)
    equipo = models.ForeignKey(
        'Equipo', 
        on_delete=models.CASCADE, 
        db_column='equipo' # Nombre real en tu MySQL
    )
    trofeo = models.ForeignKey(
        'Trofeo', 
        on_delete=models.CASCADE, 
        db_column='trofeo' # Nombre real en tu MySQL
    )
    temporada = models.CharField(max_length=10, db_column='temporada')

    class Meta:
        managed = False          # Importante: Django no intentará crear la tabla, usará la que ya tienes
        db_table = 'equipo-trofeo' # El nombre exacto de tu tabla con guion
        verbose_name = "Logro de Equipo"
        verbose_name_plural = "Palmarés"

    def __str__(self):
        return f"{self.equipo.nombre} - {self.trofeo.nombre} ({self.temporada})"


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
    imagen = models.TextField(null=True, blank=True) 
    altura = models.FloatField(null=True, blank=True)
    pie_habil = models.TextField(null=True, blank=True, max_length=12)
    soccerdonna_url = models.URLField(unique=True, null=True, blank=True)
    market_value = models.IntegerField(null=True, blank=True)    
    retiro = models.IntegerField(null=True, blank=True)     
    soccerdonna_last_updated = models.DateTimeField(null=True, blank=True)

    class Meta:
            db_table = 'jugadoras'
            managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.Nombre + self.Apellidos


class JugadoraPais(models.Model):
    id = models.AutoField(primary_key=True)
    jugadora = models.ForeignKey(Jugadora, on_delete=models.CASCADE, db_column='jugadora')
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE, db_column='pais')
    es_primaria = models.BooleanField(default=True, db_column='es_primaria') # True = Principal, False = Secundaria

    class Meta:
        db_table = 'jugadora-pais'
        managed = False

    def __str__(self):
        tipo = "Primaria" if self.es_primaria else "Secundaria"
        return f"{self.pais.nombre} ({tipo})"

class JugadoraPosicion(models.Model):
    id = models.AutoField(primary_key=True)
    jugadora = models.ForeignKey(Jugadora, on_delete=models.CASCADE, db_column='jugadora')
    posicion = models.ForeignKey(Posicion, on_delete=models.CASCADE, db_column='posicion')
    es_primaria = models.BooleanField(default=True, db_column='es_primaria') # Por defecto True porque vienen de la FK antigua

    class Meta:
        db_table = 'jugadora-posicion' # O el nombre que prefieras
        managed = False

    def __str__(self):
        tipo = "Primaria" if self.es_primaria else "Secundaria"
        return f"{self.posicion.abreviatura} ({tipo})"


class Trofeo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.TextField()
    tipo = models.TextField(null=True, blank=True)
    icono = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'trofeos'
        managed = False  # Si la tabla ya existe y no quieres que Django la reescriba

    def __str__(self):
        return self.nombre

class Trayectoria(models.Model):
    id = models.AutoField(primary_key=True)
    jugadora = models.ForeignKey(Jugadora, on_delete=models.CASCADE, db_column='jugadora')
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE, db_column='equipo')
    años = models.TextField()
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_fin = models.DateField(null=True, blank=True)
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