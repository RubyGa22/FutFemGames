# tu_app/middleware.py
from whitenoise.middleware import WhiteNoiseMiddleware

class CustomWhiteNoiseMiddleware(WhiteNoiseMiddleware):
    def process_response(self, request, response):
        # Si la URL contiene /clubes/ y la respuesta es una imagen (200 OK)
        if "/clubes/" in request.path.lower() and response.status_code == 200:
            # Forzamos la cabecera que hace feliz a Lighthouse
            response['Cache-Control'] = 'public, max-age=31536000, immutable'
        return response

    def update_content_types(self):
        super().update_content_types()
        # Aseguramos que reconozca imágenes si hay formatos raros
        self.content_types['.webp'] = 'image/webp'