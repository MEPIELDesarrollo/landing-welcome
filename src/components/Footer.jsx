'use client';

import Link from 'next/link';
import Image from 'next/image';
import PoweredBy from './PoweredBy';

export default function Footer() {
    return (
        <>
            <footer className="w-full bg-[#011461] text-white pt-16 pb-8 px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">

                    {/* Columna 1: Logo e Info (Ocupa el 50% -> col-span-6) */}
                    <div className="md:col-span-6 flex flex-col space-y-6 pr-10">

                        <div className="text-[13px] space-y-2 font-light opacity-90 leading-relaxed max-w-sm">
                            <p>Dirección: C. San Gabriel 3113, Jardines de Los Arcos,</p>
                            <p>44500 Guadalajara, Jal.</p>
                            <p>Teléfono: 33 34613252</p>
                            <p>Correo: contacto@mepiel.com.mx</p>
                        </div>
                        <div className="relative w-50 h-20">
                            <Image
                                src="https://res.cloudinary.com/dpqlilgy6/image/upload/v1776450166/mepiel_ptyv7t.png"
                                alt="Mepiel Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    </div>

                    {/* Contenedor para las columnas de enlaces (Ocupa el otro 50% -> col-span-6) */}
                    <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2">

                        {/* Columna 2: Mi Cuenta (Ocupa el 25% del total) */}
                        <div className="flex flex-col space-y-4">
                            <h3 className="text-lg font-medium">Mi Cuenta</h3>
                            <ul className="space-y-3 text-sm font-light opacity-80">
                                <li><Link href="/pedidos" className="hover:text-blue-300 transition-colors">Pedidos</Link></li>
                                <li><Link href="/pedido-rapido" className="hover:text-blue-300 transition-colors">Pedido Rápido</Link></li>
                                <li><Link href="/facturacion" className="hover:text-blue-300 transition-colors">Facturación</Link></li>
                                <li><Link href="/credito" className="hover:text-blue-300 transition-colors">Crédito</Link></li>
                                <li><Link href="/registro" className="hover:text-blue-300 transition-colors">Conviértete en Cliente</Link></li>
                            </ul>
                        </div>

                        {/* Columna 3: MEnlaces (Ocupa el 25% del total) con borde izquierdo */}
                        <div className="flex flex-col space-y-4 md:border-l md:border-white/10 md:pl-10">
                            <h3 className="text-lg font-medium">Enlaces</h3>
                            <ul className="space-y-3 text-sm font-light opacity-80">
                                <li><Link href="/aviso-privacidad" className="hover:text-blue-300 transition-colors">Aviso de Privacidad</Link></li>
                                <li><Link href="/terminos-condiciones" className="hover:text-blue-300 transition-colors">Términos y Condiciones</Link></li>
                            </ul>
                        </div>

                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] opacity-40 tracking-widest uppercase">
                        © {new Date().getFullYear()} Mepiel. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
            {/* <PoweredBy /> */}
        </>

    );
}