// API route interna: es la ÚNICA parte del proyecto que habla con
// OpenWeatherMap. Corre en el servidor, así que la API key nunca
// llega al navegador del usuario.

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "Falta el parámetro 'city' en la petición." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "Falta configurar OPENWEATHER_API_KEY. Revisa el README para crear tu .env.local (o la variable de entorno en Vercel).",
      },
      { status: 500 }
    );
  }

  // El sufijo ",PE" fuerza a buscar la ciudad dentro de Perú y evita
  // resultados de ciudades homónimas en otros países.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )},PE&appid=${apiKey}&units=metric&lang=es`;

  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    return Response.json(
      { error: "No se pudo conectar con OpenWeatherMap. Intenta de nuevo." },
      { status: 502 }
    );
  }

  if (response.status === 401) {
    return Response.json(
      {
        error:
          "La API key de OpenWeatherMap parece inválida o aún no está activa (la activación puede tardar hasta 2 horas después de crearla).",
      },
      { status: 401 }
    );
  }

  if (response.status === 404) {
    return Response.json(
      { error: `No se encontró la ciudad "${city}" en Perú.` },
      { status: 404 }
    );
  }

  if (!response.ok) {
    return Response.json(
      { error: "OpenWeatherMap devolvió un error inesperado. Intenta de nuevo." },
      { status: response.status }
    );
  }

  const data = await response.json();

  return Response.json({
    city: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    description: data.weather?.[0]?.description ?? "sin descripción",
  });
}
