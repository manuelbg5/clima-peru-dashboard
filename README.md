# 🌤️ Clima Perú — Mini Dashboard

Repo de práctica para un taller de deployment: forkea, clona, edita
y despliega en Vercel. Piensa en él como tu "hola mundo" con una API
real y una variable de entorno.

## ¿Qué hace?

Es un dashboard de una sola página donde eliges una ciudad del Perú
en un `<select>` y se muestra su clima actual: temperatura, sensación
térmica, humedad y una descripción (ej. "cielo despejado").

Los datos vienen de [OpenWeatherMap](https://openweathermap.org/). La
petición a esa API se hace **solo desde el servidor** (una API route
de Next.js en `/app/api/weather/route.js`), nunca desde el navegador,
para que tu API key nunca quede expuesta públicamente.

## 1. Consigue tu API key gratis (sin tarjeta)

1. Crea una cuenta en [openweathermap.org](https://openweathermap.org/api).
2. Ve a tu perfil → **API keys** y copia la key que te generan por
   defecto (o crea una nueva).
3. ⏳ **Importante:** una key recién creada puede tardar **hasta 2
   horas** en activarse. Si te da error `401` al probarla, espera un
   poco y vuelve a intentar — no significa que hiciste algo mal.
4. No necesitas ingresar tarjeta de crédito para el plan gratuito.

## 2. Correr en local

```bash
npm install
cp .env.example .env.local
```

Abre `.env.local` y pega tu key:

```
OPENWEATHER_API_KEY=tu_key_real_aqui
```

Luego:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y elige una ciudad.

> `.env.local` ya está incluido en `.gitignore` — nunca se sube al
> repo. La key solo vive en tu máquina (y luego en Vercel).

## 3. Desplegar en Vercel

1. Haz **fork** de este repo y luego **Import Project** en
   [vercel.com/new](https://vercel.com/new) apuntando a tu fork.
2. Antes del primer deploy (o después, no hay problema), ve a
   **Settings → Environment Variables** en tu proyecto de Vercel y
   agrega:
   - **Key:** `OPENWEATHER_API_KEY`
   - **Value:** tu key de OpenWeatherMap
3. Si ya habías desplegado antes de agregar la variable, ve a la
   pestaña **Deployments**, abre el menú "···" del último deploy y
   elige **Redeploy** para que tome la nueva variable.

Si ves el mensaje "Falta configurar OPENWEATHER_API_KEY" en el sitio
desplegado, significa que la variable no está guardada en Vercel (o
falta el redeploy).

## Personalízalo

Todo lo editable está marcado con `// 👉 EDITA AQUÍ`:

- **Lista de ciudades y título del dashboard**: en
  `app/page.js`, al inicio del archivo (`CIUDADES` y
  `DASHBOARD_TITLE`).
- **Colores y estilos**: son clases de Tailwind directamente en
  `app/page.js`, fáciles de cambiar sin tocar lógica.
- **Lógica de la API**: si quieres agregar más datos (viento, presión,
  etc.), edita `app/api/weather/route.js` — ahí está todo lo que
  llega de OpenWeatherMap en `data`.

## Estructura del proyecto

```
app/
  page.js              → la UI (select + card de resultado)
  layout.js            → layout raíz de Next.js
  globals.css          → estilos globales + Tailwind
  api/weather/route.js → API route que llama a OpenWeatherMap
.env.example           → plantilla de variables de entorno
```

Sin backend adicional, sin base de datos: solo Next.js + una API
externa gratuita.
