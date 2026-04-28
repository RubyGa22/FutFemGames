from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

# Register your models here.
@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'rol', 'is_staff')
    list_editable = ('rol',) 
    
    # 1. Formulario para editar un usuario existente
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Información Personal', {'fields': ('first_name', 'last_name', 'email')}),
        ('Información Extra', {'fields': ('rol', 'token', 'jugadora_favorita')}),
        ('Estado', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    # 2. Formulario para CREAR un usuario nuevo (Añadir usuario)
    # Es vital definirlo porque UserAdmin por defecto solo pide username y las dos contraseñas
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información Extra', {
            'fields': ('first_name', 'last_name', 'email', 'rol', 'token', 'jugadora_favorita', 'is_active', 'is_staff'),
        }),
    )
    
    list_filter = ('rol', 'is_staff', 'is_active') 
    filter_horizontal = ()
    ordering = ('username',)

    class Media:
            css = {
                'all': ('https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css','/static/futfem/css/custom_admin.css')
            }