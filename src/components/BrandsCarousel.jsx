'use client';

import Image from 'next/image';
import brands from '@/data/brands.json';

export default function BrandsSection() {
    return (
        <section
            className="w-full bg-[#f5f5f5] overflow-hidden py-10 md:py-26 lg:py-26 brands-carousel-bg"
            style={{
                backgroundImage: `
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1777394701/shadow_i3r4vd.png'),
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1777396434/corner_nx8mii.png'),
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1777396765/left_b_avk8w5.png')
                        `,
                backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
                backgroundPosition: 'top center, bottom right, left center',
                backgroundSize: 'contain, 20%, 35%',
                backgroundColor: 'transparent',
                zIndex: 0
            }}
        >

            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-16 gap-3 md:gap-0 font-poppins font-bold">
                <div className="border border-[#606060] rounded-full leading-tight text-center px-10 py-2 md:pr-24 md:-mr-10">
                    <div className="text-[#616160]" style={{ fontSize: '1.9em' }}>
                        DISTRIBUIDORES
                    </div>
                    <div className="text-[#929495]" style={{ fontSize: '1em' }}>
                        DE MÁS DE
                    </div>
                </div>

                <span
                    className="bg-gradient-to-r from-[#3c4a99] to-[#6cb0c7] text-white rounded-full px-4 py-.2  md:-ml-6 brands-50"
                    style={{ fontSize: '3.7em', letterSpacing: '0.06em' }}
                >
                    50 MARCAS
                </span>

            </div>

            {/* CARRUSEL */}
            <div className="px-4 md:px-10 lg:px-20">
                <div className="relative overflow-hidden">

                    {/* fade izquierdo */}
                    <div className="absolute left-0 top-0 h-full w-12 md:w-16 bg-gradient-to-r from-[#ffffff20] via-[#ffffff01] to-transparent z-10" />

                    {/* fade derecho */}
                    <div className="absolute right-0 top-0 h-full w-12 md:w-16 bg-gradient-to-l from-[#ffffff20] via-[#ffffff01] to-transparent z-10" />

                    <div className="flex gap-4 md:gap-8 animate-scroll whitespace-nowrap will-change-transform">

                        {[...brands, ...brands].map((brand, i) => (
                            <a
                                key={i}
                                href={brand.link}
                                target="_blank"
                                className="flex items-center justify-center min-w-[80px] md:min-w-[140px] lg:min-w-[160px] transition"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={120}
                                    height={60}
                                    className="object-contain h-[30px] md:h-[55px] lg:h-[65px] w-auto"
                                />
                            </a>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    );
}