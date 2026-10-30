'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_COLORS = ['#06385F', '#F5A344', '#C90078', '#25C1C9'];

export default function LayerSlider({
    slides = [],
    interval = 4500,
    header,
}) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragDeltaX, setDragDeltaX] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    
    const autoplayTimerRef = useRef(null);
    const inactivityTimerRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden);
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    const nextSlide = useCallback(() => {
        if (slides.length === 0) return;
        setIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        if (slides.length === 0) return;
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const pauseAutoplay = useCallback(() => {
        setIsPaused(true);
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
    }, []);

    const resumeAutoplayAfterInactivity = useCallback(() => {
        pauseAutoplay();
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 3000);
    }, [pauseAutoplay]);

    useEffect(() => {
        if (isPaused || !isVisible || slides.length <= 1) return;
        if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
        }
        autoplayTimerRef.current = setInterval(nextSlide, interval);
        return () => {
            if (autoplayTimerRef.current) {
                clearInterval(autoplayTimerRef.current);
            }
        };
    }, [nextSlide, interval, isPaused, isVisible, slides.length]);

    const handleMouseDown = (e) => {
        if (isMobile) return;
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragDeltaX(0);
        pauseAutoplay();
    };

    const handleMouseMove = (e) => {
        if (!isDragging || isMobile) return;
        e.preventDefault();
        setDragDeltaX(e.clientX - dragStartX);
    };

    const handleMouseUp = () => {
        if (!isDragging || isMobile) return;
        setIsDragging(false);
        if (Math.abs(dragDeltaX) > 80) {
            if (dragDeltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        setDragDeltaX(0);
        resumeAutoplayAfterInactivity();
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setDragStartX(e.touches[0].clientX);
        setDragDeltaX(0);
        pauseAutoplay();
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        setDragDeltaX(e.touches[0].clientX - dragStartX);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (Math.abs(dragDeltaX) > 60) {
            if (dragDeltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        setDragDeltaX(0);
        resumeAutoplayAfterInactivity();
    };

    const handleArrowClick = (direction) => {
        if (direction === 'next') {
            nextSlide();
        } else {
            prevSlide();
        }
        resumeAutoplayAfterInactivity();
    };

    if (!slides.length) return null;

    const getCardStyle = (position) => {
        if (isMobile) {
            return {
                transform: 'scale(1)',
                zIndex: 10,
                opacity: 1,
            };
        }
        if (position === 0) {
            return {
                transform: 'scale(1)',
                zIndex: 20,
                opacity: 1,
            };
        } else if (position === -1 || position === 1) {
            return {
                transform: 'scale(0.91)',
                zIndex: 10,
                opacity: 1,
            };
        } else {
            return {
                transform: 'scale(0.85)',
                zIndex: 5,
                opacity: 0,
                pointerEvents: 'none',
            };
        }
    };

    return (
        <section
            className="w-full bg-white"
            style={{
                paddingTop: isMobile ? '40px' : '80px',
                paddingBottom: isMobile ? '60px' : '80px',
            }}
        >
            {header && (
                <div className="w-full flex justify-center mb-10 md:mb-14 px-4">
                    <h2
                        className="font-poppins font-semibold uppercase text-center"
                        style={{
                            color: '#06385F',
                            fontSize: isMobile ? '1.8rem' : '2.8rem',
                            letterSpacing: '0.15em',
                            fontWeight: 600,
                        }}
                    >
                        {header}
                    </h2>
                </div>
            )}

            <div className="relative w-full max-w-7xl mx-auto px-4 md:px-20">
                {!isMobile && (
                    <>
                        <button
                            onClick={() => handleArrowClick('prev')}
                            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[190px] z-30 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-5 h-5" style={{ color: '#06385F' }} />
                        </button>
                        <button
                            onClick={() => handleArrowClick('next')}
                            className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[190px] z-30 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-5 h-5" style={{ color: '#06385F' }} />
                        </button>
                    </>
                )}

                <div
                    className="relative w-full"
                    style={{
                        height: isMobile ? '340px' : '420px',
                        overflow: 'visible',
                        cursor: isDragging ? 'grabbing' : isMobile ? 'grab' : 'default',
                        userSelect: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => pauseAutoplay()}
                >
                    <div className="relative w-full h-full flex items-center justify-center" style={{ overflow: 'visible' }}>
                        {slides.map((slide, slideIndex) => {
                            const offset = slideIndex - index;
                            let normalizedOffset = offset;
                            if (slides.length > 1) {
                                if (normalizedOffset > 1) normalizedOffset -= slides.length;
                                else if (normalizedOffset < -1) normalizedOffset += slides.length;
                            }

                            const cardStyle = getCardStyle(normalizedOffset);
                            const color = CARD_COLORS[slideIndex % CARD_COLORS.length];

                            return (
                                <motion.div
                                    key={slideIndex}
                                    className="absolute"
                                    initial={false}
                                    animate={{
                                        transform: cardStyle.transform,
                                        zIndex: cardStyle.zIndex,
                                        opacity: normalizedOffset === 0 || normalizedOffset === -1 || normalizedOffset === 1 ? 1 : 0,
                                        x: isMobile ? 0 : normalizedOffset * 400,
                                    }}
                                    transition={{
                                        duration: isDragging ? 0 : 0.7,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    style={{
                                        width: isMobile ? '280px' : '380px',
                                        height: isMobile ? '320px' : '400px',
                                        pointerEvents: normalizedOffset === 0 ? 'auto' : (normalizedOffset === -1 || normalizedOffset === 1) && !isMobile ? 'auto' : 'none',
                                    }}
                                    onClick={() => {
                                        if (!isMobile && normalizedOffset === -1) { prevSlide(); resumeAutoplayAfterInactivity(); }
                                        if (!isMobile && normalizedOffset === 1) { nextSlide(); resumeAutoplayAfterInactivity(); }
                                        if (normalizedOffset === 0) resumeAutoplayAfterInactivity();
                                    }}
                                >
                                    <div
                                        className="w-full h-full rounded-2xl bg-white overflow-hidden transition-all duration-300"
                                        style={{
                                            boxShadow: normalizedOffset === 0
                                                ? '0 25px 50px -12px rgba(6, 56, 95, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.02)'
                                                : '0 10px 30px -10px rgba(0, 0, 0, 0.15)',
                                            border: '1px solid rgba(0, 0, 0, 0.04)',
                                        }}
                                    >
                                        <div className="w-full h-full flex flex-row">
                                            <div
                                                className="w-2/5 h-full relative flex items-center justify-center"
                                                style={{ backgroundColor: color + '08' }}
                                            >
                                                <Image
                                                    src="https://placehold.co/600x400"
                                                    alt={slide.title || ''}
                                                    fill
                                                    className="object-cover"
                                                    draggable={false}
                                                />
                                            </div>
                                            <div className="w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                                <h3
                                                    className="font-poppins font-semibold text-lg md:text-xl mb-3"
                                                    style={{ color: '#06385F' }}
                                                >
                                                    {slide.title || `Canal ${slideIndex + 1}`}
                                                </h3>
                                                <p
                                                    className="text-sm leading-relaxed"
                                                    style={{ color: '#4a5568' }}
                                                >
                                                    {slide.description || 'Solución integral para tu negocio.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center mt-8 md:mt-10">
                    <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: CARD_COLORS[index % CARD_COLORS.length] }}
                            animate={{
                                width: `${((index + 1) / slides.length) * 100}%`,
                            }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {isMobile && (
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={() => handleArrowClick('prev')}
                            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-5 h-5" style={{ color: '#06385F' }} />
                        </button>
                        <button
                            onClick={() => handleArrowClick('next')}
                            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-5 h-5" style={{ color: '#06385F' }} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
