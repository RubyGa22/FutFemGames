import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from futfem.models import Jugadora

from futfem.services.soccerdonna_service import (
    get_player_urls_from_club,
    obtener_valor_mercado_desde_url,
    actualizar_market_values
)

@csrf_exempt
def actualizar_soccerdonna_url(request):
    """
    Espera un POST con JSON: { name: "Rika González", url: "..." }
    Actualiza la jugadora cuyo nombre coincida parcialmente con name
    """
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        name = data.get("name")
        url = data.get("url")

        if not name or not url:
            return JsonResponse({"error": "Faltan name o url"}, status=400)

        # Buscar en la base de datos usando __icontains para coincidencia parcial
        jugadora = Jugadora.objects.filter(nombre__icontains=name).first()
        if not jugadora:
            return JsonResponse({"error": f"No se encontró jugadora con nombre {name}"}, status=404)

        jugadora.soccerdonna_url = url
        jugadora.save()

        return JsonResponse({"status": "ok", "jugadora": jugadora.nombre, "url": url})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def api_club_players(request):
    club_url = request.GET.get("club_url")

    if not club_url:
        return JsonResponse({"error": "No se proporcionó club_url"}, status=400)

    try:
        urls = get_player_urls_from_club(club_url)
        return JsonResponse({"player_urls": urls})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def obtener_valor_mercado(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        url = data.get("url")

        if not url:
            return JsonResponse({"error": "URL no proporcionada"}, status=400)

        result = obtener_valor_mercado_desde_url(url)
        return JsonResponse(result)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def actualizar_valores_jugadoras(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        actualizar_market_values()
        return JsonResponse({"status": "ok"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)