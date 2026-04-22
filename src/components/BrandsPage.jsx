"use client";

import Image from 'next/image';
import Link from 'next/link';
import brands from '@/data/brands.json';

export default function BrandsPage() {
    return (
        <section className="w-full py-16 bg-[#f5f7fb]">
            <div className="max-w-6xl mx-auto px-4 text-center">

                <h2 className="text-4xl md:text-5xl font-bold text-[#2d3e8b] mb-6">
                    ¡CONOCE NUESTRAS
                </h2>

                <div className="mb-12">
                    <span className="inline-block bg-[#2d3e8b] text-white px-10 py-3 rounded-full text-2xl font-semibold tracking-widest uppercase">
                        Marcas!
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className={`
                                relative group flex flex-col items-center justify-center p-6 
                                aspect-square transition-all duration-300 rounded-sm
                                ${brand.highlight
                                    ? 'bg-[#2d3e8b] text-white'
                                    : 'bg-[#dfe4ec] hover:bg-[#2d3e8b]'
                                }
                            `}
                        >
                            {/* Contenedor del Logo */}
                            <div className="relative w-full h-20 mb-2 transition-transform duration-300 group-hover:-translate-y-2">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className={`object-contain transition-all duration-300 ${!brand.highlight && "group-hover:brightness-0 group-hover:invert"
                                        }`}
                                />
                            </div>

                            {/* Botón "Conocer más" */}
                            {/* Siempre presente pero invisible hasta el hover */}
                            <Link
                                href={brand.link || '#'}
                                className={`
                                    mt-2 border rounded-full px-4 py-1 text-[10px] font-bold tracking-tight uppercase
                                    transition-all duration-300
                                    ${brand.highlight
                                        ? 'border-white text-white opacity-100'
                                        : 'border-white text-white opacity-0 group-hover:opacity-100'
                                    }
                                    hover:bg-white hover:text-[#2d3e8b]
                                `}
                            >
                                Conocer más
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA Final */}
                <div className="mt-16">
                    <p className="text-gray-600 text-lg mb-4">
                        ¿Deseas información sobre los productos que tenemos en existencia?
                    </p>
                    <div className="flex items-center justify-center gap-2 font-bold">
                        <span>¡Descarga nuestro</span>
                        <Link
                            href='/catalogo.pdf'
                            className="bg-[#2d3e8b] text-white px-4 py-1 rounded-full text-sm hover:bg-[#3b4fac] transition-colors uppercase"
                        >
                            Catálogo!
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}