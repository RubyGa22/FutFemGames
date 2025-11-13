# FutFemGames
El fútbol femenino ha ido en constante crecimiento en los últimos años, pasando de ser un deporte no profesional a obtener un reconocimiento y seguimiento bastante grandes. Sin embargo, a pesar de este constante crecimiento la falta de plataformas digitales y de contenido sobre este mundo sigue siendo bastante notoria, lo que aleja a este deporte de recibir nuevos seguidores.

Por esta razón se ha decidido crear ‘FutFemGames’, una plataforma web que pretende ofrecer una experiencia didáctica y divertida a los aficionados más experimentados y a los nuevos, a través de minijuegos que pondrán a prueba sus conocimientos sobre jugadoras, equipos, trayectorias… La plataforma también permitirá a los usuarios descubrir información sobre las jugadoras.

## Estructura

FutFemGames/             # Carpeta raíz del proyecto
├─ FutFemGames/          # Configuración del proyecto Django
│  ├─ __init__.py
│  ├─ settings.py        # Configuración global (bases de datos, media, apps, etc.)
│  ├─ urls.py            # Rutas principales del proyecto
│  ├─ wsgi.py
│  └─ asgi.py
│
├─ futfem/               # App principal: lógica de jugadores, equipos, ligas
│  ├─ migrations/        # Migraciones de la base de datos
│  ├─ media/             # Archivos subidos por la app o estáticos pesados
│  │  └─ ES/clubes/      # Escudos de equipos (.png, .jpg)
│  ├─ static/            # Archivos estáticos (CSS, JS, imágenes reutilizables)
│  │  ├─ css/
│  │  ├─ js/
│  │  └─ img/
│  ├─ templates/         # Plantillas HTML de la app
│  │  └─ futfem/
│  │      └─ ...         # Index, perfiles de jugadoras, listados, etc.
│  ├─ admin.py           # Registro de modelos para admin
│  ├─ apps.py
│  ├─ models.py          # Modelos de la base de datos (jugadoras, equipos, ligas, trayectorias)
│  ├─ views.py           # Lógica de vistas y APIs (ej: jugadoraxnombre, trayectorias)
│  └─ urls.py            # URLs internas de la app
│
├─ minijuegos/           # App de minijuegos
│  ├─ static/            # CSS y JS propios de los minijuegos
│  │  ├─ css/
│  │  ├─ js/
│  │  └─ img/
│  ├─ templates/         # HTML de cada minijuego
│  │  └─ minijuegos/
│  │      ├─ index.html
│  │      ├─ wordle.html
│  │      └─ ...         # Otros minijuegos
│  ├─ views.py           # Lógica de minijuegos (iniciar, validar respuestas)
│  └─ urls.py            # URLs internas de la app de minijuegos
│
├─ manage.py             # Script de gestión de Django
└─ requirements.txt      # Dependencias del proyecto
