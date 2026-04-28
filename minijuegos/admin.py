from django.contrib import admin
from .models import Pista
from django.utils.html import format_html
from futfem.models import Jugadora, Liga, Equipo, Pais

@admin.register(Pista)
class PistaAdmin(admin.ModelAdmin):
    list_display = ('id_juego', 'descripcion', 'ver_detalles_json')
    search_fields = ('descripcion',)
    readonly_fields = ('ver_detalles_json',)

    def ver_detalles_json(self, obj):
        if not obj.valor:
            return "JSON vacío"

        html_resultado = format_html('<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">')
        
        for clave, valor in obj.valor.items():
            # Normalizamos el valor a lista siempre para simplificar el código
            ids = valor if isinstance(valor, list) else [valor]

            # 1. CASO PAÍS
            if 'pais' in clave.lower():
                html_resultado += format_html('<div style="display:flex; flex-direction:column; align-items:center; gap:5px;">')
                for id_p in ids:
                    try:
                        p = Pais.objects.get(id_pais=id_p)
                        html_resultado += format_html(
                            '<div style="text-align:center;"><span class="fi fi-{}" style="font-size:1.5em;"></span><br><small>{}</small></div>',
                            p.iso.lower(), clave
                        )
                    except Pais.DoesNotExist:
                        html_resultado += format_html('<small style="color:red;">🌍 {}?</small>', id_p)
                html_resultado += format_html('</div>')

            # 2. CASO CLUB / EQUIPO
            elif any(x in clave.lower() for x in ['club', 'equipo', 'escudo']):
                html_resultado += format_html('<div style="display:flex; flex-direction:column; gap:8px; align-items:center;">')
                for id_e in ids:
                    try:
                        club = Equipo.objects.get(id_equipo=id_e)
                        img_url = f"/{club.escudo}" if club.escudo else ""
                        html_resultado += format_html(
                            '<div style="text-align:center; border: 1px solid #eee; padding: 2px; border-radius: 4px;">'
                            '<img src="{}" width="40"><br><small style="font-size:9px;">{}</small></div>',
                            img_url, clave
                        )
                    except Equipo.DoesNotExist:
                        html_resultado += format_html('<small style="color:red;">🛡️ {}?</small>', id_e)
                html_resultado += format_html('</div>')

            # 3. CASO JUGADORA (Nuevo caso como pista)
            elif 'jugadora' in clave.lower():
                html_resultado += format_html('<div style="display:flex; flex-direction:column; gap:8px; align-items:center;">')
                for id_j in ids:
                    try:
                        jugadora = Jugadora.objects.get(id_jugadora=id_j)
                        foto_url = jugadora.imagen if jugadora.imagen else ""
                        html_resultado += format_html(
                            '<div style="text-align:center;">'
                            '<img src="/{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; border: 1px solid #ccc;">'
                            '<br><small style="font-size:9px; font-weight:bold;">{}</small></div>',
                            foto_url, jugadora.Apodo
                        )
                    except Jugadora.DoesNotExist:
                        html_resultado += format_html('<small style="color:red;">⚽ {}?</small>', id_j)
                html_resultado += format_html('</div>')

            # 4. CASO LIGA
            elif 'liga' in clave.lower():
                html_resultado += format_html('<div style="display:flex; flex-direction:column; gap:8px; align-items:center;">')
                for id_l in ids:
                    try:
                        liga = Liga.objects.get(id_liga=id_l)
                        img_url = liga.logo.url if hasattr(liga.logo, 'url') else f"/{liga.logo}"
                        html_resultado += format_html(
                            '<div style="text-align:center;"><img src="{}" width="40"><br><small style="font-size:9px;">{}</small></div>',
                            img_url, clave
                        )
                    except Liga.DoesNotExist:
                        html_resultado += format_html('<small style="color:red;">🏆 {}?</small>', id_l)
                html_resultado += format_html('</div>')

        html_resultado += format_html('</div>')
        return html_resultado

    ver_detalles_json.short_description = "Vista Previa de Pistas"

    class Media:
        css = {
            'all': ('https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css','/static/futfem/css/custom_admin.css')
        }