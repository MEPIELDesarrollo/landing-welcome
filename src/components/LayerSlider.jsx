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

export default function LayerSlider({
    slides = [],
    interval = 10000,
    header,
}) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const headerRef = useRef(null);
    const [headerOffset, setHeaderOffset] = useState(0);

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
                paddingLeft: 130,
                paddingRight: 130,
                paddingTop: 0,
                overflow: 'visible',
                backgroundColor: 'rgb(223 229 241)'
            }}
        >
            <div>
                {header && (
                    <div className="relative flex items-center justify-center mb-2 pb-10 w-full px-4 md:px-20">

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
                            className="relative z-10 px-10 py-3 rounded-full text-white text-sm font-poppins font-semibold tracking-widest uppercase shadow-lg shadow-blue-900/20"
                            style={{
                                background: 'linear-gradient(to bottom, #80bdd0, #3a4a98)',
                                marginTop: headerOffset ? `-${headerOffset}px` : 0,
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
                            className="text-center text-3xl md:text-5xl mb-4 mt-6 tracking-wide font-poppins"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {currentSlide.title}
                        </motion.h2>
                    )}
                </AnimatePresence>

                {/* ── Slider ── */}
                <div
                    className="group relative overflow-hidden slider-responsive"
                    style={{ aspectRatio: '16/9', marginTop: '-50px' }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {currentSlide.layers.map((layer, i) => {
                                const anim = animationTypes[layer.type] || animationTypes.fadeInUp;
                                return (
                                    <motion.div
                                        key={`${index}-${i}`}
                                        className="absolute inset-0"
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
                                            className="object-contain"
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>

                    {/* Flechas */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-10 top-1/2 -translate-y-1/2 z-20 p-4 bg-[#2d3a7d]/90 hover:bg-[#2d3a7d] text-white rounded-full transition-all"
                        style={{
                            background: 'linear-gradient(to left, #80bdd0, #3a4a98)',
                        }}
                    >
                        <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-10 top-1/2 -translate-y-1/2 z-20 p-4 bg-[#2d3a7d]/90 hover:bg-[#2d3a7d] text-white rounded-full transition-all"
                        style={{
                            background: 'linear-gradient(to left, #80bdd0, #3a4a98)',
                        }}
                    >
                        <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-2 transition-all rounded-full ${index === i ? 'w-8 bg-blue-600' : 'w-2 bg-gray-400/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}