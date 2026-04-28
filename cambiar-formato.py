import sys
import os
from PIL import Image
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM

QUALITY = 85

def procesar_imagen(input_path, output_path, width=None, height=None):
    try:
        if not os.path.exists(input_path): return False
        with Image.open(input_path) as img:
            original_width, original_height = img.size
            if width or height:
                if width and not height:
                    height = int((width * original_height) / original_width)
                elif height and not width:
                    width = int((height * original_width) / original_height)
                img = img.resize((width, height), Image.Resampling.LANCZOS)

            # Mantener transparencia si existe
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")

            img.save(output_path, "WEBP", quality=QUALITY, method=6)
            return True
    except Exception as e:
        print(f"   ❌ Error procesando {input_path}: {e}")
        return False

def procesar_archivo_unico(input_file, es_mini, w, h):
    input_file = os.path.normpath(input_file)
    if not os.path.isfile(input_file): return

    root = os.path.dirname(input_file)
    archivo = os.path.basename(input_file)
    nombre_sin_ext = os.path.splitext(archivo)[0]
    
    target_dir = os.path.join(root, 'mini') if es_mini else root
    if es_mini: os.makedirs(target_dir, exist_ok=True)
    
    output_file = os.path.join(target_dir, f"{nombre_sin_ext}.webp")
    if procesar_imagen(input_file, output_file, w, h):
        print(f"✔ Individual: {archivo} -> {output_file}")

def procesar_directorio_especifico(input_dir, es_mini, w, h):
    """Procesa todas las imágenes dentro de una ruta de carpeta dada."""
    input_dir = os.path.normpath(input_dir)
    print(f"📂 Procesando carpeta: {input_dir}...")
    
    for root, dirs, files in os.walk(input_dir):
        if 'mini' in root: continue 
        
        target_dir = os.path.join(root, 'mini') if es_mini else root
        if es_mini: os.makedirs(target_dir, exist_ok=True)

        for archivo in files:
            if archivo.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                input_file = os.path.join(root, archivo)
                output_file = os.path.join(target_dir, f"{os.path.splitext(archivo)[0]}.webp")
                if procesar_imagen(input_file, output_file, w, h):
                    print(f"   ✔ {archivo} OK")

def batch_procesar_categoria(categoria, crear_mini, w, h):
    base_path = os.path.join('futfem', 'media') 
    if not os.path.exists(base_path):
        print(f"❌ No se encuentra la carpeta base: {base_path}")
        return

    print(f"🚀 Optimizando categoría: {categoria.upper()}...")
    for iso in os.listdir(base_path):
        categoria_path = os.path.join(base_path, iso, categoria)
        if os.path.isdir(categoria_path):
            procesar_directorio_especifico(categoria_path, crear_mini, w, h)

if __name__ == "__main__":
    args = sys.argv[1:]
    script_name = os.path.basename(sys.argv[0])

    if not args:
        print(f"Uso: python {script_name} [archivo|directorio|categoria] [mini] [ancho]")
        sys.exit()

    # 1. Detección de tipos de entrada
    archivo_directo = next((a for a in args if os.path.isfile(a) and a.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', 'svg'))), None)
    directorio_directo = next((a for a in args if os.path.isdir(a)), None)
    
    # 2. Flags y Dimensiones
    dimensiones = [int(a) for a in args if a.isdigit()]
    es_mini = "mini" in args
    
    # 3. Categorías "mágicas"
    categorias_validas = ['clubes', 'ligas', 'jugadoras', 'trofeos', 'trayectorias']
    categoria_seleccionada = next((c for c in categorias_validas if c in args), None)

    # Valores por defecto para dimensiones
    d_w = dimensiones[0] if dimensiones else (50 if es_mini else None)
    d_h = dimensiones[1] if len(dimensiones) > 1 else None

    # Lógica de ejecución
    if archivo_directo:
        procesar_archivo_unico(archivo_directo, es_mini, d_w, d_h)
    elif directorio_directo:
        procesar_directorio_especifico(directorio_directo, es_mini, d_w, d_h)
    elif categoria_seleccionada:
        batch_procesar_categoria(categoria_seleccionada, es_mini, d_w, d_h)
    else:
        print(f"❌ No se pudo determinar qué procesar. Revisa la ruta o categoría.")