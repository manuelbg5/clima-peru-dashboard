import "./globals.css";

export const metadata = {
  title: "Clima Perú — Mini Dashboard",
  description: "Dashboard de práctica para aprender deployment con Next.js y Vercel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
