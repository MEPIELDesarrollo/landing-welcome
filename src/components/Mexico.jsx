'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const images = [
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777050282/2Y5A0787_r8a4xb.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777050282/IMG_2202_iv7h1w.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777050282/2Y5A5708_kk7gdg.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777050281/2Y5A5793_anicmv.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777050281/IMG_9976_yhnxdf.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777050281/2Y5A5777_wdkriv.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777050281/IMG_0036_ylb5a8.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777305035/IMG_2487_jldq0t.jpg',
    'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777305086/IMG_2474_k8js20.jpg',
];

const cards = [
    {
        title: 'Almacenes',
        text: 'Contamos con almacenes ubicados en puntos estratégicos de la república: <strong> El Salto, Jalisco, Guadalajara, Monterrey y CDMX. </strong>',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776977645/landing-06_bskxrr.png',
    },
    {
        title: 'Entregas',
        text: 'Garantizamos entregas de 24 a 48 hrs y entregas el mismo día en la zona metropolitana de Guadalajara y CMDX.',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776977645/landing-07_ttum5i.png',
    },
    {
        title: 'Atención Personalizada',
        text: 'Te ofrecemos la atención personalizada que mereces con nuestra fuerza de venta en campo y nuestro equipo de ejecutivos listos para brindarte asesoria en cada etapa de tu compra.',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776977646/landing-08_wpm11u.png',
    },
    {
        title: 'Más que una distribuidora',
        text: 'Te brindamos herramientas para desarrollar tu negocio a través de nuestros distintos proyectos.',
        icon: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776977647/landing-09_m7mlgy.png',
        logos: [
            { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776207055/category_b90wko.png', href: 'https://ejemplo.com/', alt: 'Category' },
            { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776207143/masterclass_zo2cps.png', href: 'https://ejemplo.com/', alt: 'Masterclass' },
            { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776207262/simposio_zxf8sx.png', href: 'https://ejemplo.com/', alt: 'Simposio' },
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
    }, [index]);

    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
    const next = () => setIndex((prev) => (prev + 1) % images.length);

    return (
        <section
            className="w-full py-25"
            style={{
                backgroundColor: '#EBEBEB',
                backgroundImage: `
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1777061461/curve_myknhm.png'),
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1777061461/curve2_n8jmy6.png')
                        `,
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundPosition: 'top right, bottom left',
                backgroundSize: '30%, 23%',
                backgroundColor: 'transparent',
                position: 'relative',
                zIndex: 0
            }}
        >
            <div className="mx-auto px-24 grid grid-cols-1 lg:grid-cols-3 gap-16">

                <div className="col-span-1 flex flex-col items-center">

                    <div className="relative w-75 aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                className={`absolute w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                            />
                        ))}

                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow transition-all"
                            aria-label="Anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow transition-all"
                            aria-label="Siguiente"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    <div className="clientes-responsive relative mt-8 w-75 bg-gradient-to-r from-[#394aa6] to-[#69afc8] rounded-3xl pt-6 px-6 pb-10 text-center text-white shadow-lg">

                        <p className="tracking-widest uppercase font-poppins">
                            ¡Forma parte de nuestra red
                        </p>

                        <h3 className="font-semibold mt-1  font-poppins">
                            DE CLIENTES!
                        </h3>

                        <div>
                            <a href="/login" className="inline-block bg-white text-gray-600 px-4 py-1 rounded-full shadow hover:bg-gray-100 transition-colors  font-poppins">
                                Iniciar sesión
                            </a>
                        </div>

                        <a href="/registro" className="absolute left-1/2 -translate-x-1/2 -bottom-5 bg-[#cc007b] px-5 py-1 rounded-full shadow-lg whitespace-nowrap z-10 font-poppins">
                            REGISTRARME
                        </a>
                    </div>
                </div>

                <div className="col-span-2">

                    <div className="rincon-responsive mb-10">
                        <p
                            className="uppercase tracking-[0.3em]"
                            style={{
                                fontWeight: 600, fontSize: '2.1em', color: '#606060'
                            }}
                        >
                            Llegamos a cada rincón
                        </p>

                        <h2
                            className="text-[#2d3e8b] text-5xl font-bold mt-2"
                            style={{
                                fontSize: '7em', color: '#283777'
                            }}
                        >
                            DE MÉXICO
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-all"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                        <img
                                            src={card.icon}
                                            alt={card.title}
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-black  font-poppins">
                                        {card.title}
                                    </h4>
                                </div>
                                <p
                                    className="card-responsive text-sm text-[#606060] leading-relaxed font-poppins"
                                    dangerouslySetInnerHTML={{ __html: card.text }}
                                />

                                {card.logos && (
                                    /* 
                                       flex-wrap: permite que los elementos bajen a la siguiente línea.
                                       min-[1450px]:flex-nowrap: obliga a que se mantengan en una sola fila solo si es mayor a 1450px.
                                    */
                                    <div className="flex flex-wrap min-[1450px]:flex-nowrap items-center gap-4 mt-4">
                                        {card.logos.map((logo, j) => (
                                            <Link
                                                key={j}
                                                href={logo.href}
                                                className="bg-nav-button/90 button-shadow rounded-full cursor-pointer overflow-hidden flex-shrink-0"
                                            >
                                                <img
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    className="btn-image-responsive w-auto h-auto object-contain pointer-events-none px-4 py-2"
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {/* {card.logos && (
                                    <div className="flex items-center gap-4 mt-4">
                                        {card.logos.map((logo, j) => (
                                            <Link
                                                key={j}
                                                href={logo.href}
                                                className={
                                                    `bg-nav-button/90 button-shadow rounded-full cursor-pointer overflow-hidden`
                                                }
                                            >
                                                <img
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    className="w-auto h-auto object-contain pointer-events-none px-2"
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                )} */}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section >
    );
}