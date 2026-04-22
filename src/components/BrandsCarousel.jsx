'use client';

import Image from 'next/image';
import brands from '@/data/brands.json';

export default function BrandsSection() {
    return (
        <section className="w-full bg-[#f5f5f5] overflow-hidden py-8 md:py-20 lg:py-20">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-3 md:gap-0">
                <div className="border border-gray-400 rounded-full leading-tight text-center px-10 py-2 md:pr-24 md:-mr-10">
                    <div className="text-gray-700 font-bold text-sm md:text-base lg:text-lg">
                        DISTRIBUIDORES
                    </div>
                    <div className="text-gray-400 font-semibold text-[10px] md:text-xs lg:text-sm">
                        DE MÁS DE
                    </div>
                </div>

                <div className="bg-gradient-to-r from-[#2f3f8f] to-[#5bc0de] text-white rounded-full font-extrabold px-5 py-1 md:px-8 md:py-2 md:-ml-6 text-2xl md:text-4xl lg:text-6xl">
                    50 MARCAS
                </div>
            </div>

            {/* CARRUSEL */}
            <div className="px-4 md:px-10 lg:px-20">
                <div className="relative overflow-hidden">

                    {/* fade izquierdo */}
                    <div className="absolute left-0 top-0 h-full w-12 md:w-16 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5] to-transparent z-10" />

                    {/* fade derecho */}
                    <div className="absolute right-0 top-0 h-full w-12 md:w-16 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5] to-transparent z-10" />

                    <div className="flex gap-4 md:gap-8 animate-scroll whitespace-nowrap will-change-transform">

                        {[...brands, ...brands].map((brand, i) => (
                            <a
                                key={i}
                                href={brand.link}
                                target="_blank"
                                className="flex items-center justify-center min-w-[80px] md:min-w-[140px] lg:min-w-[160px] opacity-70 hover:opacity-100 transition"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={120}
                                    height={60}
                                    className="object-contain h-[24px] md:h-[45px] lg:h-[55px] w-auto"
                                />
                            </a>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    );
}