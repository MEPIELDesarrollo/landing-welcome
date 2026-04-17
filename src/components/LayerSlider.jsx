'use client';

import { useEffect, useState, useCallback } from 'react';
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
        animate: { opacity: 1, filter: 'blur(0px)', scale: 1 }
    },
};

export default function LayerSlider({ slides = [], interval = 10000 }) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

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
        <div
            className="group relative w-full h-[400px] md:h-[600px] overflow-hidden bg-white"
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
                                    className="object-cover"
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Flechas de Navegación */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicadores (Dots) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
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
    );
}