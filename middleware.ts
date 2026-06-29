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
              font-family: sans-serif;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div>
            <h1>Sitio en mantenimiento</h1>
            <p>Inténtalo más tarde.</p>
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