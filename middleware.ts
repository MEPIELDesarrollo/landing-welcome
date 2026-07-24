import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return new NextResponse(
    `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mantenimiento</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
             
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div>
            <h1>Estamos actualizando nuestro sitio.</h1>
            <p>Regresa a partir de las 11:00 a.m. para seguir disfrutando de nuestros servicios. ¡Gracias por tu paciencia!</p>
          </div>
        </body>
      </html>
    `,
    {
      status: 503,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export const config = {
  matcher: "/:path*",
};