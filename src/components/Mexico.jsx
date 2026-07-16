'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target } from 'lucide-react';

const images = [
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777050282/2Y5A0787_r8a4xb.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777050282/IMG_2202_iv7h1w.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777050282/2Y5A5708_kk7gdg.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777050281/2Y5A5793_anicmv.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777050281/IMG_9976_yhnxdf.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777050281/2Y5A5777_wdkriv.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777050281/IMG_0036_ylb5a8.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777305035/IMG_2487_jldq0t.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777305086/IMG_2474_k8js20.jpg',
];

const cards = [
    {
        title: 'Almacenes',
        text: 'Contamos con almacenes ubicados en puntos estratégicos de la república: <strong> El Salto, Jalisco, Guadalajara, Monterrey y CDMX. </strong>',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776977645/landing-06_bskxrr.png',
    },
    {
        title: 'Entregas',
        text: 'Garantizamos entregas de 24 a 48 hrs y entregas el mismo día en la zona metropolitana de Guadalajara y CMDX.',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776977645/landing-07_ttum5i.png',
    },
    {
        title: 'Atención Personalizada',
        text: 'Te ofrecemos la atención personalizada que mereces con nuestra fuerza de venta en campo y nuestro equipo de ejecutivos listos para brindarte asesoria en cada etapa de tu compra.',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776977646/landing-08_wpm11u.png',
    },
    {
        title: 'Más que una distribuidora',
        text: 'Te brindamos herramientas para desarrollar tu negocio a través de nuestros distintos proyectos.',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776977647/landing-09_m7mlgy.png',
        logos: [
            { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776207143/masterclass_zo2cps.png', href: 'https://masterclass.mepieldistribuidores.com.mx/', alt: 'Masterclass' },
        ],
    },
];

export default function MexicoSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
    const next = () => setIndex((prev) => (prev + 1) % images.length);

    return (
        <section
            className="w-full py-12 sm:py-16 md:py-20 lg:py-25"
            style={{
                backgroundColor: '#EBEBEB',
                backgroundImage: `
                    url('https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777061461/curve_myknhm.png'),
                    url('https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777061461/curve2_n8jmy6.png')
                `,
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundPosition: 'top right, bottom left',
                backgroundSize: '20%, 15%',
                backgroundColor: 'transparent',
                position: 'relative',
                zIndex: 0
            }}
        >
            <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 max-w-7xl">
                
                {/* Grid principal - centrado en móviles */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0  md:gap-12 lg:gap-16 items-start">
                    
                    {/* COLUMNA IZQUIERDA - Centrada en móviles */}
                    <div className="col-span-1 flex flex-col items-center mb-12 lg:items-center">
                        
                        {/* Carrusel */}
                        <div className="relative w-full max-w-[300px] sm:max-w-[320px] md:max-w-[350px] lg:w-75 aspect-[3/4] rounded-3xl overflow-hidden shadow-lg mx-auto lg:mx-0">
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    className={`absolute w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                                    alt={`Imagen ${i + 1}`}
                                />
                            ))}

                            <button
                                onClick={prev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shadow transition-all"
                                aria-label="Anterior"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <button
                                onClick={next}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shadow transition-all"
                                aria-label="Siguiente"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Tarjeta "Forma parte" */}
                        <div className="relative mt-6 sm:mt-8 w-full max-w-[300px] sm:max-w-[320px] md:max-w-[350px] lg:w-75 bg-gradient-to-r from-[#394aa6] to-[#69afc8] rounded-3xl pt-6 px-4 sm:px-6 pb-6 md:pb-10 text-center text-white shadow-lg mx-auto lg:mx-0">
                            <p className="tracking-widest uppercase font-poppins text-xs sm:text-sm">
                                ¡Forma parte de nuestra red
                            </p>
                            <h3 className="font-semibold mt-1 font-poppins text-sm sm:text-base">
                                DE CLIENTES!
                            </h3>

                            <div className="mt-4 md:mt-3 flex flex-row justify-center items-center gap-3 md:block">
                               

                                <a 
                                    href="/pre-registro" 
                                    className="inline-block md:absolute md:left-1/2 md:-translate-x-1/2 md:-bottom-5 bg-[#cc007b] text-white px-4 md:px-5 py-1.5 md:py-1 rounded-full shadow hover:bg-pink-600 transition-colors whitespace-nowrap z-10 font-poppins text-xs sm:text-sm md:shadow-lg"
                                >
                                    PRE-REGISTRO
                                </a>

                                 <Link
                                    href='https://mepieldistribuidores.com.mx/mi-cuenta/'
                                    className="inline-block bg-white text-gray-600 px-4 py-1.5 md:py-1 rounded-full shadow hover:bg-gray-100 transition-colors font-poppins text-xs sm:text-sm"
                                >
                                    <span>Tienda en línea</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="col-span-2">
                        
                        {/* Títulos - AHORA RESPONSIVOS */}
                        <div className="text-center lg:text-left mb-6 sm:mb-8 md:mb-10">
                            <p
                                className="uppercase tracking-[0.2em] sm:tracking-[0.3em] font-poppins"
                                style={{
                                    fontWeight: 600,
                                    fontSize: 'clamp(1.2rem, 4vw, 2.1rem)',
                                    color: '#606060'
                                }}
                            >
                                Llegamos a cada rincón
                            </p>

                            <h2
                                className="font-bold mt-1 sm:mt-2 font-poppins"
                                style={{
                                    fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                                    color: '#283777',
                                    lineHeight: '1.1',
                                    wordBreak: 'break-word'
                                }}
                            >
                                DE MÉXICO
                            </h2>
                        </div>

                        {/* Grid de tarjetas - centrado en móviles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {cards.map((card, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <img
                                                src={card.icon}
                                                alt={card.title}
                                                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                                            />
                                        </div>
                                        <h4 className="font-semibold text-black font-poppins text-sm sm:text-base">
                                            {card.title}
                                        </h4>
                                    </div>
                                    
                                    <p
                                        className="text-[#606060] leading-relaxed font-poppins text-xs sm:text-sm"
                                        dangerouslySetInnerHTML={{ __html: card.text }}
                                    />

                                    {card.logos && (
                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                                            {card.logos.map((logo, j) => (
                                                <Link
                                                    key={j}
                                                    href={logo.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-nav-button/90 button-shadow rounded-full cursor-pointer overflow-hidden flex-shrink-0"
                                                >
                                                    <img
                                                        src={logo.src}
                                                        alt={logo.alt}
                                                        
                                                        className="w-auto h-auto object-contain pointer-events-none px-3 sm:px-4 py-1.5 sm:py-2"
                                                        style={{ maxHeight: '40px' }}
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}