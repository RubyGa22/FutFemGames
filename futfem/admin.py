from django.contrib import admin
from django.contrib import admin
from django.utils.html import format_html
from django.contrib.admin.models import LogEntry
from .models import Pais ,Jugadora, Trayectoria, Equipo, Liga, JugadoraPais
# Register your models here.
@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    # Configuramos qué columnas queremos ver
    list_display = ('action_time', 'user', 'content_type', 'object_repr', 'action_flag')
    
    # Filtros laterales para buscar por usuario, fecha o tipo de acción
    list_filter = ('user', 'content_type', 'action_flag')
    
    # Buscador para encontrar objetos específicos por su nombre
    search_fields = ('object_repr', 'change_message')
    
    # Para que nadie pueda borrar o editar los logs desde aquí (solo lectura)
    def has_add_permission(self, request): return False
    def has_change_permission(self, request, obj=None): return False
    def has_delete_permission(self, request, obj=None): return False
# 1. Definimos el Inline para la Trayectoria
class TrayectoriaInline(admin.TabularInline):
    model = Trayectoria
    extra = 1  # Número de filas vacías para añadir nuevos equipos
    fields = ('equipo', 'años', 'equipo_actual', 'ver_escudo', 'imagen')
    readonly_fields = ('ver_escudo',)
    
    def ver_escudo(self, obj):
        if obj.equipo and obj.equipo.escudo:
            # Usamos la ruta / porque tu campo imagen suele ser un TextField con la ruta
            return format_html('<img src="/{}" width="30" height="30" />', obj.equipo.escudo)
        return ""
    ver_escudo.short_description = "Escudo"

# 1. Inline para las Nacionalidades (Tabla Intermedia)
class NacionalidadInline(admin.TabularInline):
    model = JugadoraPais
    extra = 1
    fields = ('pais', 'es_primaria', 'ver_bandera')
    readonly_fields = ('ver_bandera',)

    def ver_bandera(self, obj):
        if obj.pais:
            return format_html('<span class="fi fi-{}"></span>', obj.pais.iso.lower())
        return ""

@admin.register(Pais)
class PaisAdmin(admin.ModelAdmin):
    # Columnas en la lista: ID, Nombre, ISO y una vista previa de la bandera
    list_display = ('id_pais', 'nombre', 'iso', 'ver_bandera')
    search_fields = ('nombre', 'iso')
    ordering = ('nombre',)

    def ver_bandera(self, obj):
        if obj.iso:
            # Usamos la misma librería flag-icons que cargamos en los otros modelos
            return format_html(
                '<span class="fi fi-{}" style="font-size: 1.5em; border-radius: 2px;"></span>',
                obj.iso.lower()
            )
        return "🏳️"
    ver_bandera.short_description = 'Bandera'

    class Media:
        # Cargamos el CSS de banderas para verlo también aquí
        css = {
            'all': ('https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css','/static/futfem/css/custom_admin.css')
        }

# 2. Registramos la Jugadora con su configuración
@admin.register(Jugadora)
class JugadoraAdmin(admin.ModelAdmin):
    # En list_display sustituimos 'Nacionalidad' por nuestro método 'ver_nacionalidades'
    list_display = ('ver_foto', 'Nombre', 'Apellidos', 'ver_nacionalidades', 'Posicion', 'market_value')
    # Eliminamos 'Nacionalidad' de list_filter ya que ahora es una relación M2M
    list_filter = ('Posicion', 'retiro')
    search_fields = ('Nombre', 'Apellidos', 'Apodo')
    
    fieldsets = (
        ('Información Personal', {
            # Quitamos 'Nacionalidad' de aquí, ahora se gestiona en el Inline abajo
            'fields': (('Nombre', 'Apellidos'), 'Apodo', 'Nacimiento')
        }),
        ('Datos Deportivos', {
            'fields': ('Posicion', 'altura', 'pie_habil', 'retiro')
        }),
        ('Imagen y Enlaces', {
            'fields': ('imagen', 'soccerdonna_url', 'market_value', 'soccerdonna_last_updated')
        }),
    )

    # Añadimos ambos inlines: Nacionalidades y Trayectoria
    inlines = [NacionalidadInline, TrayectoriaInline]

    # --- MÉTODOS VISUALES ---

    def ver_foto(self, obj):
        if obj.imagen:
            # Si 'imagen' ya es la URL completa, quita el "/" inicial
            path = obj.imagen if obj.imagen.startswith('http') else f"/{obj.imagen}"
            return format_html('<img src="{}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />', path)
        return "No foto"
    ver_foto.short_description = 'Foto'

    def ver_nacionalidades(self, obj):
        # Buscamos todas las nacionalidades asociadas a esta jugadora
        nacionalidades = JugadoraPais.objects.filter(jugadora=obj).select_related('pais')
        if not nacionalidades:
            return "Sin datos"
            
        html = '<div style="display: flex; gap: 5px;">'
        for n in nacionalidades:
            # Resaltamos la primaria con un borde o un estilo diferente
            estilo = "border: 2px solid #79aec8;" if n.es_primaria else "opacity: 0.6;"
            html += format_html(
                '<span class="fi fi-{}" title="{}" style="{} border-radius: 2px;"></span>',
                n.pais.iso.lower(),
                f"{n.pais.nombre} ({'Principal' if n.es_primaria else 'Secundaria'})",
                estilo
            )
        html += '</div>'
        return format_html(html)
    ver_nacionalidades.short_description = 'Nacionalidades'

    class Media:
        css = {
            'all': ('https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css', '/static/futfem/css/custom_admin.css',)

        }

@admin.register(Equipo)
class EquipoAdmin(admin.ModelAdmin):
    list_display = ('ver_escudo', 'nombre', 'ver_logo_liga', 'ver_color', 'latitud', 'longitud')
    list_filter = ('liga',)
    search_fields = ('nombre',)
    
    # Organizar el formulario por secciones
    fieldsets = (
        ('Información Básica', {
            'fields': ('nombre', 'liga', 'escudo')
        }),
        ('Identidad y Ubicación', {
            'fields': ('color', ('latitud', 'longitud'))
        }),
    )

    def ver_escudo(self, obj):
        if obj.escudo:
            # Como indicas que 'escudo' ya es la URL propia, la usamos directamente
            return format_html('<img src="/{}" width="35" height="35" style="object-fit: contain;" />', obj.escudo)
        return "No logo"
    ver_escudo.short_description = 'Escudo'

    def ver_logo_liga(self, obj):
        if obj.liga and obj.liga.logo:
            # Detectamos si es una URL completa o una ruta relativa
            url = obj.liga.logo.url if hasattr(obj.liga.logo, 'url') else f"/{obj.liga.logo}"
            return format_html(
                '<div style="display:flex; align-items:center; gap:5px;">'
                '<img src="{}" width="25" height="25" style="object-fit:contain;">'
                '<span>{}</span></div>', 
                url, obj.liga.nombre
            )
        return obj.liga.nombre if obj.liga else "-"
    ver_logo_liga.short_description = 'Liga'

    def ver_color(self, obj):
        if obj.color:
            return format_html(
                '<div style="display: flex; align-items: center; gap: 8px;">'
                '<div style="width: 20px; height: 20px; background-color: {}; border: 1px solid #ccc; border-radius: 3px;"></div>'
                '<span>{}</span></div>',
                obj.color, obj.color
            )
        return "Sin color"
    ver_color.short_description = 'Color Principal'
    class Media:
        css = {
            'all': ('https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css','/static/futfem/css/custom_admin.css')
        }

@admin.register(Liga)
class LigaAdmin(admin.ModelAdmin):
    # Vista de lista: Nombre, Bandera del País y Logo de la Liga
    list_display = ('ver_logo', 'nombre', 'ver_pais')
    search_fields = ('nombre',) # NECESARIO para que aparezca en el autocomplete de Equipo
    list_filter = ('pais',)

    def ver_logo(self, obj):
        if obj.logo:
            # Si el logo es una URL directa (TextField)
            return format_html('<img src="/{}" width="40" height="40" style="object-fit: contain;" />', obj.logo)
        return "Sin logo"
    ver_logo.short_description = 'Logo'

    def ver_pais(self, obj):
        if obj.pais:
            # Usando la librería de banderas que cargamos antes en PistaAdmin
            return format_html(
                '<span class="fi fi-{}" style="margin-right: 8px;"></span> {}',
                obj.pais.iso.lower(),
                obj.pais.nombre
            )
        return "-"
    ver_pais.short_description = 'País'

    # Cargamos los iconos de banderas también aquí
    class Media:
        css = {
            'all': ('https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css','/static/futfem/css/custom_admin.css')
        }