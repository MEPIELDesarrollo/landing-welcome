"use client";

import Image from 'next/image';
import Link from 'next/link';
import brands from '@/data/brands.json';

export default function BrandsPage() {
    return (
        <section className="w-full pt-30">
            <div
                className="brands-top max-w text-center mt-0 p-20 bg-[#f8f8f8]"
                style={{
                    backgroundColor: '#eaeaea',
                    backgroundImage: `url('https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777066831/linea2_a0wxlz.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left center',
                    backgroundSize: '50%',
                }}
            >
                < h2 className="brands-h2 font-bold text-[#2d3e8b]" >
                    ¡CONOCE NUESTRAS
                </h2 >
            </div>
            <div className="flex justify-center -mt-7 relative z-10">
                <span
                    className="bg-[#283778] text-white px-8 py-2 rounded-full font-poppins font-extrabold"
                    style={{ letterSpacing: '0.22em', fontSize: '1.9em' }}
                >
                    MARCAS!
                </span>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 text-center pt-20">

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {brands.map((brand, index) => (
                        <Link
                            href={brand.link || '#'}
                            key={index}
                            className={`
                                relative group flex flex-col items-center justify-center p-6 
                                aspect-square transition-all duration-300 rounded-sm
                                ${brand.highlight
                                    ? 'bg-[#e0e6f2] text-white'
                                    : 'bg-[#e0e6f2] hover:bg-[#283778] active:bg-[#283778] focus:bg-[#283778]'
                                }
                            `}
                        >
                            {/* Sello "Distribuidor Exclusivo" en esquina superior derecha */}
                            {brand.exclusive && (
                                <div className="absolute top-[-5px] right-[-5px] w-20 h-20 z-10 pointer-events-none rotate-30">
                                    <Image
                                        src="/images/Sello_Distribuidor_exclusivo_Mesa_de_trabajo_1.png"
                                        alt="Distribuidor Exclusivo en México"
                                        fill
                                        className={`object-contain transition-all duration-300 
                                        ${!brand.highlight ? "group-hover:brightness-0 group-hover:invert" : ""}
                                        `}
                                    />
                                </div>
                            )}

                            {/* Contenedor del Logo: Ahora siempre estará centrado y actuará como enlace principal en móviles */}
                            <div 
                                
                                className="relative w-full h-20 block transition-transform duration-300 md:group-hover:-translate-y-4"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className={`object-contain transition-all duration-300 
                                    ${!brand.highlight ? "group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert" : ""}
                                    `}
                                />
                            </div>

                            {/* Link con posicionamiento absoluto (Oculto en móviles) */}
                            <div className="absolute bottom-6 left-0 right-0 hidden md:flex justify-center pointer-events-none">
                                <div
                                    
                                    className={`
                                        pointer-events-auto border border-white rounded-full px-4 py-1 text-[10px] font-bold tracking-tight uppercase
                                        transition-all duration-300 
                                        opacity-0 group-hover:opacity-100 
                                        translate-y-4 group-hover:translate-y-0
                                        hover:bg-white hover:text-[#2d3e8b] text-white
                                    `}
                                >
                                    Conocer más
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="w-f h-10" style={{ boxShadow: '0 8px 8px -2px rgba(0,0,0,0.3)' }}></div>
            <div
                className="brands-bottom max-w text-center p-16 bg-[#eaeaea]"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777069186/linea3_ofwlc9.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: '60%',
                }}>
                {/* CTA Final */}
                <div>
                    <p className="catalog-p text-[#373737] text-lg mb-4 font-semibold" style={{ fontSize: '1.4em' }}>
                        ¿Deseas información sobre los productos que tenemos en existencia?
                    </p>
                    <div className="flex items-center justify-center" style={{ fontSize: '1.7em' }}>
                        <span className='catalog-span' style={{ fontWeight: 500, marginRight: '10px', color: '#283778' }}>¡Descarga nuestro</span>
                        <Link
                            href='https://mepielmx-my.sharepoint.com/:x:/g/personal/jaime_mendez_mepiel_com_mx/EcZ0N83hgvxEhXWJMsjgxkEBLOgjCRY2M7-Ldv2g9r-c4A?download=1'
                            style={{ fontSize: '.9em' }}
                            className="catalog-link bg-[#283778] text-white px-4 py-1 rounded-full text-sm hover:bg-[#3b4fac] transition-colors uppercase font-weight"
                        >
                            Catálogo!
                        </Link>
                    </div>
                </div>
            </div >
        </section >
    );
}