# 🌍 Mundo Interactivo — README

## 📖 Descripción
Mundo Interactivo es un proyecto educativo para **aprender desarrollo web paso a paso**, comenzando con HTML, CSS y JavaScript puro. Actualmente muestra:

- Una **página de inicio animada** con un globo 3D (WebGL + Globe.gl + Three.js).
- Un botón que lleva a un **mapa interactivo** (Leaflet + OpenStreetMap).
- Filtros por “gustos” (comida, naturaleza, arte, café, historia) almacenados localmente en el navegador.

El objetivo es practicar organización, despliegue gratuito y progresión diaria en el aprendizaje web.

---

## 🧱 Estructura del proyecto
```
mapa-gustos/
├── index.html           # Página inicial (globo 3D)
├── mapa.html            # Página del mapa interactivo
├── /assets/             # Imágenes o íconos (vacío por ahora)
├── /data/places.json    # Datos con ubicaciones y etiquetas
├── /js/app.js           # Lógica del mapa Leaflet
└── README.md            # Este archivo
```

---

## 🚀 Cómo publicar gratis
### Opción 1 — GitHub Pages
1. Ve a **Settings → Pages**.
2. En “Source”, elige `Deploy from a branch` → `main` / `/ (root)`.
3. Espera unos segundos y tendrás tu sitio en `https://<usuario>.github.io/mapa-gustos/`.

### Opción 2 — Netlify (recomendado)
1. En Netlify, selecciona **Add new site → Import from GitHub**.
2. Conecta tu cuenta y elige el repositorio.
3. Configura:
   - **Branch to deploy:** `main`
   - **Base directory:** *(vacío)*
   - **Build command:** *(vacío)*
   - **Publish directory:** `/`
4. Presiona **Deploy site** y espera la URL tipo `https://mapadepruebas.netlify.app`.

---

## 🧭 Cómo contribuir o practicar
Cada día se puede hacer un pequeño avance. Ejemplos:
- **Día 1:** crear repositorio y página HTML simple.
- **Día 2:** agregar mapa Leaflet básico.
- **Día 3:** filtrar lugares por gustos.
- **Día 4:** mejorar el diseño con CSS o separar el JS.
- **Día 5:** conectar datos desde `/data/places.json`.
- **Día 6:** preparar README y automatizar publicación.

---

## ⚙️ Comandos básicos de Git
```bash
git add .
git commit -m "mensaje corto"
git push origin main
```
Cada `push` publica automáticamente en Netlify si ya está vinculado.

---

## 📚 Tecnologías utilizadas
| Tipo | Librería / Tecnología | Propósito |
|------|-----------------------|------------|
| Mapa | [Leaflet](https://leafletjs.com/) | Mapa interactivo OpenStreetMap |
| Visual 3D | [Globe.gl](https://github.com/vasturiano/globe.gl) | Globo en 3D con Three.js |
| Datos | JSON local (`/data/places.json`) | Lugares y categorías |
| Hosting | GitHub Pages / Netlify | Despliegue gratuito |

---

## ✨ Próximos pasos
- [ ] Crear estilos y temas personalizados.
- [ ] Añadir marcadores desde una API externa.
- [ ] Guardar preferencias de usuario en Supabase o Firebase (opcional).
- [ ] Agregar modo oscuro/claro automático.

---

## 🧑‍💻 Autor
**Angelomax2099** — proyecto personal para practicar desarrollo web y visualización interactiva.
