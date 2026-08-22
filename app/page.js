"use client";

import { useState } from "react";

// 👉 EDITA AQUÍ: nombre del dashboard que se muestra arriba
const DASHBOARD_TITLE = "Visualiza clima en el Perú ";

// 👉 EDITA AQUÍ: agrega, quita o cambia ciudades de esta lista.
// Deben ser nombres que OpenWeatherMap reconozca dentro de Perú.
const CIUDADES = [
  "Lima",
  "Arequipa",
  "Cusco",
  "Trujillo",
  "Piura",
  "Chiclayo",
  "Puno",
  "Tacna",
  "Huancayo",
];

export default function Home() {
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function handleChange(event) {
    const ciudadSeleccionada = event.target.value;
    setCiudad(ciudadSeleccionada);
    setClima(null);
    setError(null);

    if (!ciudadSeleccionada) return;

    setCargando(true);
    try {
      const res = await fetch(
        `/api/weather?city=${encodeURIComponent(ciudadSeleccionada)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ocurrió un error inesperado.");
      } else {
        setClima(data);
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          🌤️ {DASHBOARD_TITLE}
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Selecciona una ciudad para ver el clima actual
        </p>

        <select
          value={ciudad}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">— Elige una ciudad —</option>
          {CIUDADES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="mt-6">
          {cargando && (
            <div className="rounded-2xl bg-white shadow-md p-6 text-center text-slate-500 animate-pulse">
              Cargando clima...
            </div>
          )}

          {!cargando && error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 shadow-sm p-6 text-center text-red-700">
              ⚠️ {error}
            </div>
          )}

          {!cargando && !error && clima && (
            <div className="rounded-2xl bg-white shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold text-slate-800 mb-1">
                {clima.city}
              </h2>
              <p className="text-slate-500 capitalize mb-4">
                {clima.description}
              </p>

              <div className="text-5xl font-bold text-blue-600 mb-4">
                {clima.temperature}°C
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-slate-400">Sensación térmica</div>
                  <div className="font-semibold text-slate-700">
                    {clima.feelsLike}°C
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-slate-400">Humedad</div>
                  <div className="font-semibold text-slate-700">
                    {clima.humidity}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {!cargando && !error && !clima && (
            <div className="rounded-2xl bg-white/60 border border-dashed border-slate-200 p-6 text-center text-slate-400">
              Aún no seleccionaste una ciudad
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
