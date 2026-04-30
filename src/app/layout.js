import { Montserrat, Poppins } from "next/font/google";
import "./globals.css?v2";

export const metadata = {
  title: "M.E.piel ",
  description: "Distribuidores Especializados",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
