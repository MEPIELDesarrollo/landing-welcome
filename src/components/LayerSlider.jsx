'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const animationTypes = {
    fadeInUp: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    fadeInRight: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
    fadeInLeft: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
    zoomIn: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
    blurIn: {
        initial: { opacity: 0, filter: 'blur(20px)', scale: 1.1 },
        animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
    },
};


/* ══════════════════════════════════════════════════════════════
   MobileSlide — layout específico por slide en móvil
══════════════════════════════════════════════════════════════ */
function MobileSlide({ slide }) {
    const mobileLayers = slide.layers.filter((l) => l.mobilesrc);
    const layout = slide.mobileLayout || 'stack';

    if (layout === 'acompanamos') {
        return (
            <div className="w-full flex flex-col" style={{ marginBottom: -20 , gap: 0 }}>
 
                {/* Badge E-COMMERCE — pequeño y centrado */}
                {mobileLayers[0] && (
                    <div className="flex justify-center" style={{ marginTop: -30, marginBottom: 0 }}>
                        <div className="relative" style={{ width: '70%', aspectRatio: '12/4' }}>
                            <Image
                                src={mobileLayers[0].mobilesrc}
                                alt="E-Commerce"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}
 
                {/* Texto descriptivo */}
                <p style={{
                    fontSize: '1.10em',
                    lineHeight: 1.55,
                    color: '#283777',
                    textAlign: 'center',
                    margin: '0 0 4px 0',
                    padding: '0 8px',
                    fontWeight: 400,
                }}>
                    Compra a través de nuestra tienda en línea con acceso a{' '}
                    <strong>+50 marcas de renombre</strong>{' '}
                    a la hr que quieras, desde el medio que quieras.
                </p>
 
                {/* Robot + círculos*/}
                {mobileLayers[1] && (
                    <div className="w-full relative" style={{ aspectRatio: '1/1', marginTop: -30 }}>
                        <Image
                            src={mobileLayers[1].mobilesrc}
                            alt="Robot"
                            fill
                            unoptimized
                            className="object-contain"
                        />
                    </div>
                )}
 
                {/* logo MepielConnect izquierda + texto derecha */}
                {mobileLayers[2] && (
                    <div
                        className="w-full flex flex-row items-center"
                        style={{ gap: 12, marginTop: -60, padding: '0 8px' }}
                    >
                        {/* Logo MepielConnect */}
                        <div className="relative flex-shrink-0" style={{ width: '35%', aspectRatio: '1/1' }}>
                            <Image
                                src={mobileLayers[2].mobilesrc}
                                alt="MepielConnect"
                                fill
                                unoptimized
                                className="object-contain object-right"
                            />
                        </div>
                        {/* Texto a la derecha */}
                        <p style={{
                            fontSize: '0.80em',
                            lineHeight: 1.45,
                            color: '#283777',
                            margin: 0,
                            // flex: 1,
                            width: '65%',
                            textAlign: 'center'
                        }}>
                            Recibe <strong>atención personalizada</strong> a través de nuestro chatbot las 24 hrs del día, los 365 días del año.
                        </p>
                    </div>
                )}
            </div>
        );
    }

    /* ── TE VISITAMOS ── */
    if (layout === 'visitamos') {
        return (
            <div className="w-full flex flex-col" style={{ gap: 0 }}>
                {/* Texto descriptivo*/}
                <p
                    style={{
                        fontSize: '1em',
                        lineHeight: 1.55,
                        color: '#283777',
                        textAlign: 'center',
                        padding: '0 4px 16px 4px',
                        margin: 0,
                        fontWeight: 400,
                    }}
                >
                    Garantizamos la mejor atención a través de nuestro equipo de visita médica, los cuales pueden visitarte, asesorarte, levantar pedido por ti y visitarte las veces que necesites.
                </p>

                {/* Mapa*/}
                {mobileLayers[0] && (
                    <div className="w-full relative" style={{ aspectRatio: '3/3' }}>
                        <Image
                            src={mobileLayers[0].mobilesrc}
                            alt="Mapa de zonas de visita"
                            fill
                            unoptimized
                            className="object-contain object-top"
                        />
                    </div>
                )}
            </div>
        );
    }

    /* ── TE ASESORAMOS ── */
    if (layout === 'asesoramos') {
        return (
            <div className="w-full flex flex-col" style={{ gap: '0px', marginTop: -60, padding: '0 8px' }}>
                
              
                {/* Badge E-COMMERCE */}
                {mobileLayers[0] && (
                    <div className="flex justify-center" style={{ marginTop: 30, marginBottom: 0 }}>
                        <div className="relative" style={{ width: '70%', aspectRatio: '12/6' }}>
                            <Image
                                src={mobileLayers[0].mobilesrc}
                                alt="Call Center"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}

                {/* Texto explicativo */}
                <div className="flex justify-center">
                    <p style={{
                        fontSize: '1.25em',
                        lineHeight: 1.35,
                        color: '#283776',
                        marginTop: 8,    
                        marginBottom: 0, 
                        width: '65%',
                        textAlign: 'center'
                    }}>
                        Te brindamos ayuda a {''}
                        través de nuestros
                    </p>
                </div>
                

                {/* Imagen inferior*/}
                {mobileLayers[1] && (
                    <div className="w-full relative" style={{ aspectRatio: '1/1', marginTop: '-25px' }}>
                        <Image 
                            src={mobileLayers[1].mobilesrc} 
                            alt="Ejecutivos Especializados" 
                            fill 
                            unoptimized 
                            className="object-contain object-bottom" 
                        />
                    </div>
                )}
            </div>
        );
    }

    /* ── Fallback ── */
    return (
        <div className="w-full flex flex-col items-center gap-2">
            {mobileLayers.map((l, i) => (
                <div key={i} className="w-full relative" style={{ aspectRatio: '16/9' }}>
                    <Image src={l.mobilesrc} alt="" fill unoptimized className="object-contain" />
                </div>
            ))}
        </div>
    );
}

export default function LayerSlider({
    slides = [],
    interval = 10000,
    header,
}) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const headerRef = useRef(null);
    const [headerOffset, setHeaderOffset] = useState(0);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();

        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);


    useEffect(() => {
        if (!headerRef.current) return;
        const updateOffset = () => {
            // Mover el section hacia arriba exactamente la mitad de la altura del badge
            // para que quede centrado sobre el borde superior
            setHeaderOffset(headerRef.current.offsetHeight / 2);
        };
        updateOffset();
        const ro = new ResizeObserver(updateOffset);
        ro.observe(headerRef.current);
        return () => ro.disconnect();
    }, [header]);

    const nextSlide = useCallback(() => {
        setIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer);
    }, [nextSlide, interval, isPaused]);

    if (!slides.length) return null;

    const currentSlide = slides[index];

    return (
        <section
            style={{
                paddingLeft: isMobile ? 16 : 130,
                paddingRight: isMobile ? 16 : 130,
                paddingBottom: 1,
                overflow: 'visible',
                backgroundColor: 'rgb(223 229 241)'
            }}
        >
            <div>
                {header && (
                    <div className="relative flex items-center justify-center items-center mb-2 pb-10 w-full px-4 md:px-20">

                        <svg
                            className="absolute z-0"
                            style={{ width: '100%', height: '4px', marginTop: headerOffset ? `-${headerOffset}px` : 0 }}
                            viewBox="0 0 100 4"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <polygon
                                points="0,2 10,0 90,0 100,2 90,4 10,4"
                                fill="#d1d5db"
                            />
                        </svg>
                        <span
                            ref={headerRef}
                            className="channels relative z-10 px-4 md:px-18 py-3 text-white font-poppins tracking-widest uppercase shadow-lg shadow-blue-900/20 text-center"
                            style={{
                                background: 'linear-gradient(to bottom, #80bdd0, #3a4a98)',
                                marginTop: headerOffset ? `-${headerOffset}px` : 0,
                                fontSize: isMobile ? '1em' : '2.2em',
                                borderRadius: '20px',
                                fontWeight: 400,
                                letterSpacing: isMobile ? '1px' : '6px',
                                width: isMobile ? '90%' : 'auto',
                                maxWidth: '100%',
                            }}
                        >
                            {header}
                        </span>
                    </div>
                )}


                {/* ── Título del slide actual ── */}
                <AnimatePresence mode="wait">
                    {currentSlide.title && (
                        <motion.h2
                            key={`title-${index}`}
                            className="channel-title text-center mb-1 mt-6 tracking-wide font-poppins"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ fontSize: isMobile ? '2em' : '4em', marginBottom: isMobile ? '30px' : '0px'}}
                        >
                            {currentSlide.title}
                        </motion.h2>
                    )}
                </AnimatePresence>

                {/* ── Slider ── */}
                {isMobile ? (
                    <div className="w-full" style={{ marginBottom: 60 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`mobile-${index}`}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full"
                            >
                                <MobileSlide slide={currentSlide} />
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-center gap-3 mt-6">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`h-2 transition-all rounded-full ${index === i ? 'w-8 bg-blue-600' : 'w-2 bg-gray-400/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                <div
                    className="group relative overflow-hidden touch-pan-y w-full max-w-full mx-auto"
                    style={{ 
                        aspectRatio: '16/9', 
                        marginTop: '-50px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginBottom: '100px'
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {currentSlide.layers.map((layer, i) => {
                                if (!layer.src) return null;
                                const anim = animationTypes[layer.type] || animationTypes.fadeInUp;
                                return (
                                    <motion.div
                                        key={`${index}-${i}`}
                                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                                        initial={anim.initial}
                                        animate={anim.animate}
                                        transition={{
                                            delay: layer.delay || 0,
                                            duration: 0.8,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        <Image
                                            src={layer.src}
                                            alt=""
                                            fill
                                            unoptimized
                                            priority={index === 0}
                                            className="object-cover md:object-contain w-full h-full"
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>

                    {/* Flechas */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 z-20 p-4 bg-[#2d3a7d]/90 hover:bg-[#2d3a7d] text-white rounded-full transition-all"
                        style={{ background: 'linear-gradient(to left, #80bdd0, #3a4a98)' }}
                    >
                        <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-20 p-4 bg-[#2d3a7d]/90 hover:bg-[#2d3a7d] text-white rounded-full transition-all"
                        style={{ background: 'linear-gradient(to left, #80bdd0, #3a4a98)' }}
                    >
                        <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-2 transition-all rounded-full ${index === i ? 'w-8 bg-blue-600' : 'w-2 bg-gray-400/50'}`}
                            />
                        ))}
                    </div>
                </div>
                )}
            </div>
        </section>
    );
}