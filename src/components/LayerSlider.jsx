'use client';

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_COLORS = ['#06385F', '#F5A344', '#C90078', '#25C1C9'];
const COPIES = 3;
const TRANSITION_MS = 600;
const RESUME_DELAY_MS = 3000;
const FALLBACK_IMAGE = '/images/banner.png';

const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const subscribeToVisibility = (callback) => {
    document.addEventListener('visibilitychange', callback);
    return () => document.removeEventListener('visibilitychange', callback);
};

const getVisibilitySnapshot = () => !document.hidden;

const getServerVisibilitySnapshot = () => true;

function getDescription(slide) {
    if (Array.isArray(slide?.description)) {
        return slide.description.join(' ');
    }
    return slide?.description || '';
}

function getImage(slide) {
    if (!slide) return FALLBACK_IMAGE;

    return (
        slide.image ||
        slide.backgroundImage ||
        slide.layers?.find((layer) => layer?.src)?.src ||
        FALLBACK_IMAGE
    );
}

function getAccent(slide, index) {
    return slide?.accent || CARD_COLORS[index % CARD_COLORS.length];
}

function ChannelCard({
    slide,
    accent,
    isCenter,
    isDragging,
    reduceMotion,
    onSelect,
}) {
    const [hovered, setHovered] = useState(false);
    const canHover = !isDragging && !reduceMotion;
    const imageFit = slide?.imageFit === 'cover' ? 'cover' : 'contain';
    const imageSrc = getImage(slide);

    const baseShadow = isCenter
        ? '0 24px 60px -24px rgba(6, 56, 95, 0.28), 0 0 0 1px rgba(6, 56, 95, 0.04)'
        : '0 12px 30px -18px rgba(6, 56, 95, 0.18)';
    const hoverShadow = isCenter
        ? '0 32px 72px -24px rgba(6, 56, 95, 0.34), 0 0 0 1px rgba(6, 56, 95, 0.05)'
        : '0 20px 44px -18px rgba(6, 56, 95, 0.24)';

    return (
        <div
            className="h-full w-full overflow-hidden rounded-[20px] bg-white"
            onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
            onClick={!isCenter ? onSelect : undefined}
            style={{
                border: '1px solid rgba(6, 56, 95, 0.06)',
                boxShadow: hovered && canHover ? hoverShadow : baseShadow,
                cursor: isCenter ? 'default' : 'pointer',
                transform:
                    hovered && canHover ? 'translateY(-6px)' : 'translateY(0)',
                transition: reduceMotion
                    ? 'none'
                    : 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                willChange: 'transform, box-shadow',
            }}
        >
            <div className="flex h-full w-full">
                <div
                    className="relative h-full w-[44%] shrink-0 overflow-hidden"
                    style={{ backgroundColor: `${accent}0D` }}
                >
                    {imageFit === 'cover' ? (
                        <Image
                            src={imageSrc}
                            alt=""
                            fill
                            sizes="(max-width: 767px) 45vw, 200px"
                            draggable={false}
                            className="object-cover"
                            onDragStart={(event) => event.preventDefault()}
                        />
                    ) : (
                        <div className="absolute inset-3 md:inset-4">
                            <Image
                                src={imageSrc}
                                alt=""
                                fill
                                sizes="(max-width: 767px) 45vw, 200px"
                                draggable={false}
                                className="object-contain"
                                onDragStart={(event) => event.preventDefault()}
                            />
                        </div>
                    )}
                </div>

                <div className="flex h-full w-[56%] flex-col justify-center gap-2 p-4 md:p-6 xl:p-8">
                    <span
                        className="block h-[2px] w-8 rounded-full"
                        style={{ backgroundColor: accent }}
                    />
                    <h3
                        className="font-poppins font-semibold leading-snug text-[18px] md:text-[20px]"
                        style={{ color: '#06385F' }}
                    >
                        {slide?.title}
                    </h3>
                    <p
                        className="text-[13px] md:text-[14px] leading-relaxed"
                        style={{ color: '#4A5568' }}
                    >
                        {getDescription(slide)}
                    </p>
                </div>
            </div>
        </div>
    );
}

function CarouselArrow({
    direction,
    onClick,
    className = '',
    style,
    compact,
    small,
}) {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
    const sizeClass = small
        ? 'h-8 w-8'
        : compact
          ? 'h-9 w-9'
          : 'h-11 w-11';
    const iconClass = small || compact ? 'h-4 w-4' : 'h-5 w-5';

    return (
        <button
            type="button"
            onClick={onClick}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={direction === 'prev' ? 'Anterior' : 'Siguiente'}
            className={`absolute z-30 flex cursor-pointer items-center justify-center rounded-full border border-[#E5E7EB] bg-white shadow-[0_6px_20px_-8px_rgba(6,56,95,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_24px_-8px_rgba(6,56,95,0.3)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06385F]/30 focus-visible:ring-offset-2 ${sizeClass} ${className}`}
            style={style}
        >
            <Icon
                className={iconClass}
                style={{ color: '#06385F' }}
                strokeWidth={2}
            />
        </button>
    );
}

export default function LayerSlider({
    slides = [],
    interval = 4500,
    header,
}) {
    const slideCount = slides.length;
    const prefersReducedMotion = useReducedMotion();
    const isVisible = useSyncExternalStore(
        subscribeToVisibility,
        getVisibilitySnapshot,
        getServerVisibilitySnapshot
    );

    const [virtualIndex, setVirtualIndex] = useState(slideCount);
    const [isDragging, setIsDragging] = useState(false);
    const [dragX, setDragX] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const [hasMeasured, setHasMeasured] = useState(false);
    const [autoplayKey, setAutoplayKey] = useState(0);

    const viewportRef = useRef(null);
    const dragStateRef = useRef({
        pointerId: null,
        startX: 0,
        startY: 0,
        axis: null,
        didDrag: false,
        deltaX: 0,
    });
    const lastDragEndRef = useRef(0);
    const inactivityTimerRef = useRef(null);
    const hasMeasuredScheduledRef = useRef(false);

    const loopSlides = useMemo(
        () => Array.from({ length: COPIES }, () => slides).flat(),
        [slides]
    );

    const activeIndex = slideCount
        ? ((virtualIndex % slideCount) + slideCount) % slideCount
        : 0;
    const activeAccent = getAccent(slides[activeIndex], activeIndex);

    useIsomorphicLayoutEffect(() => {
        const element = viewportRef.current;
        if (!element) return undefined;

        const updateWidth = () => {
            const nextWidth = element.getBoundingClientRect().width;
            if (nextWidth <= 0) return;

            setContainerWidth(nextWidth);

            if (!hasMeasuredScheduledRef.current) {
                hasMeasuredScheduledRef.current = true;
                requestAnimationFrame(() => setHasMeasured(true));
            }
        };

        updateWidth();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', updateWidth);
            return () => window.removeEventListener('resize', updateWidth);
        }

        const observer = new ResizeObserver(updateWidth);
        observer.observe(element);
        return () => observer.disconnect();
    }, [slideCount]);

    useIsomorphicLayoutEffect(() => {
        setVirtualIndex(slideCount);
    }, [slideCount]);

    const clearInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = null;
        }
    }, []);

    const pauseAutoplay = useCallback(() => {
        clearInactivityTimer();
        setIsPaused(true);
    }, [clearInactivityTimer]);

    const scheduleResume = useCallback(() => {
        clearInactivityTimer();
        inactivityTimerRef.current = setTimeout(() => {
            setIsPaused(false);
            inactivityTimerRef.current = null;
        }, RESUME_DELAY_MS);
    }, [clearInactivityTimer]);

    useEffect(
        () => () => {
            clearInactivityTimer();
        },
        [clearInactivityTimer]
    );

    const goNext = useCallback(() => {
        if (slideCount <= 1) return;
        setVirtualIndex((current) => current + 1);
        setAutoplayKey((current) => current + 1);
    }, [slideCount]);

    const goPrev = useCallback(() => {
        if (slideCount <= 1) return;
        setVirtualIndex((current) => current - 1);
        setAutoplayKey((current) => current + 1);
    }, [slideCount]);

    // Keep the virtual index inside the middle copy so the loop never jumps.
    useEffect(() => {
        if (slideCount <= 1) return undefined;
        if (virtualIndex >= slideCount && virtualIndex < slideCount * 2) {
            return undefined;
        }

        const timeout = setTimeout(() => {
            const normalized =
                slideCount +
                (((virtualIndex % slideCount) + slideCount) % slideCount);
            setIsJumping(true);
            setVirtualIndex(normalized);
        }, TRANSITION_MS + 60);

        return () => clearTimeout(timeout);
    }, [virtualIndex, slideCount]);

    useEffect(() => {
        if (!isJumping) return undefined;
        const frame = requestAnimationFrame(() => setIsJumping(false));
        return () => cancelAnimationFrame(frame);
    }, [isJumping]);

    // Autoplay is a single timeout that resets after every slide change.
    useEffect(() => {
        if (
            isPaused ||
            !isVisible ||
            slideCount <= 1 ||
            prefersReducedMotion
        ) {
            return undefined;
        }

        const timeout = setTimeout(goNext, interval);
        return () => clearTimeout(timeout);
    }, [
        autoplayKey,
        goNext,
        interval,
        isPaused,
        isVisible,
        prefersReducedMotion,
        slideCount,
    ]);

    const isDesktop = containerWidth >= 1024;
    const isTablet = containerWidth >= 768 && containerWidth < 1024;
    const isMobile = containerWidth > 0 && containerWidth < 768;

    const gap = isDesktop ? 24 : 16;
    const arrowGutter = isDesktop ? 56 : 0;

    let cardWidth = 240;
    if (containerWidth > 0) {
        if (isMobile) {
            cardWidth = Math.min(containerWidth - 32, 360);
        } else if (isTablet) {
            cardWidth = clamp(
                220,
                (containerWidth - gap * 2) / 2.82,
                300
            );
        } else {
            cardWidth = clamp(
                240,
                (containerWidth - gap * 2 - arrowGutter * 2) / 2.82,
                380
            );
        }
    }

    const cardHeight = isMobile
        ? clamp(250, Math.round(cardWidth * 0.82), 340)
        : clamp(240, Math.round(cardWidth * 0.72), 300);
    const step = cardWidth + gap;
    const clusterHalf = 0.955 * cardWidth + gap;
    const arrowsAtEdge =
        isMobile && containerWidth > 0 && containerWidth < 440;
    const viewportHeight = cardHeight + 32;
    const trackX =
        containerWidth / 2 - (virtualIndex * step + cardWidth / 2) + dragX;

    const transition =
        isJumping || isDragging || !hasMeasured
            ? { duration: 0 }
            : {
                  duration: prefersReducedMotion ? 0 : TRANSITION_MS / 1000,
                  ease: [0.22, 1, 0.36, 1],
              };

    const handlePointerDown = (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        if (event.target.closest('button')) return;

        const target = event.currentTarget;
        if (target.setPointerCapture) {
            target.setPointerCapture(event.pointerId);
        }

        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            axis: null,
            didDrag: false,
            deltaX: 0,
        };

        pauseAutoplay();
    };

    const handlePointerMove = (event) => {
        const state = dragStateRef.current;
        if (state.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - state.startX;
        const deltaY = event.clientY - state.startY;

        if (!state.axis) {
            if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) return;
            state.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
            if (state.axis === 'x') {
                state.didDrag = true;
                setIsDragging(true);
            }
        }

        if (state.axis !== 'x') return;

        event.preventDefault();
        state.deltaX = deltaX;
        setDragX(deltaX);
    };

    const finishDrag = (event, cancelled = false) => {
        const state = dragStateRef.current;
        if (state.pointerId !== event.pointerId) return;

        if (
            event.currentTarget.hasPointerCapture?.(event.pointerId) &&
            event.currentTarget.releasePointerCapture
        ) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (state.axis === 'x') {
            const threshold = Math.max(60, cardWidth * 0.18);
            if (!cancelled && Math.abs(state.deltaX) > threshold) {
                if (state.deltaX > 0) goPrev();
                else goNext();
            }
            lastDragEndRef.current = Date.now();
        }

        dragStateRef.current = {
            pointerId: null,
            startX: 0,
            startY: 0,
            axis: null,
            didDrag: false,
            deltaX: 0,
        };

        setIsDragging(false);
        setDragX(0);
        scheduleResume();
    };

    const handlePointerUp = (event) => finishDrag(event);
    const handlePointerCancel = (event) => finishDrag(event, true);

    const handleCardSelect = (direction) => {
        if (Date.now() - lastDragEndRef.current < 250) return;

        if (direction === 'prev') goPrev();
        else goNext();

        pauseAutoplay();
        scheduleResume();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goPrev();
            pauseAutoplay();
            scheduleResume();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goNext();
            pauseAutoplay();
            scheduleResume();
        }
    };

    if (!slideCount) return null;

    return (
        <section
            aria-label="Canales de venta"
            className="relative w-full bg-white py-16 md:py-24"
            style={{ overflowX: 'clip' }}
        >
            {header && (
                <div className="mb-10 flex w-full justify-center px-4 md:mb-14">
                    <h2
                        className="text-center font-poppins font-semibold uppercase"
                        style={{
                            color: '#06385F',
                            fontSize: 'clamp(1.75rem, 3vw, 2.8rem)',
                            letterSpacing: '0.15em',
                            fontWeight: 600,
                        }}
                    >
                        {header}
                    </h2>
                </div>
            )}

            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-12">
                <div
                    ref={viewportRef}
                    role="region"
                    aria-roledescription="carrusel"
                    aria-label="Canales de venta"
                    tabIndex={0}
                    className="relative -mx-4 w-[calc(100%_+_2rem)] outline-none focus-visible:ring-2 focus-visible:ring-[#06385F]/30 focus-visible:ring-offset-4 sm:mx-0 sm:w-full"
                    style={{
                        height: viewportHeight,
                        overflow: 'visible',
                        touchAction: 'pan-y',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                    onPointerEnter={(event) => {
                        if (event.pointerType === 'mouse') pauseAutoplay();
                    }}
                    onPointerLeave={(event) => {
                        if (event.pointerType === 'mouse') scheduleResume();
                    }}
                    onFocusCapture={pauseAutoplay}
                    onBlurCapture={(event) => {
                        if (
                            !event.currentTarget.contains(event.relatedTarget)
                        ) {
                            scheduleResume();
                        }
                    }}
                    onKeyDown={handleKeyDown}
                >
                    <div
                        className="absolute inset-x-0 top-1/2"
                        style={{ transform: 'translateY(-50%)' }}
                    >
                        <motion.div
                            className="flex items-center"
                            style={{
                                gap,
                                willChange: 'transform',
                                opacity: containerWidth ? 1 : 0,
                            }}
                            initial={false}
                            animate={{ x: trackX }}
                            transition={transition}
                        >
                            {loopSlides.map((slide, loopIndex) => {
                                const distance = loopIndex - virtualIndex;
                                const isCenter = distance === 0;
                                const isSide = Math.abs(distance) === 1;
                                const isVisibleCard = isCenter || isSide;
                                const originalIndex = loopIndex % slideCount;
                                const accent = getAccent(slide, originalIndex);
                                const scale = isCenter
                                    ? 1
                                    : isSide
                                      ? 0.91
                                      : 0.85;

                                return (
                                    <motion.div
                                        key={`${slide?.id || originalIndex}-${loopIndex}`}
                                        className="relative shrink-0"
                                        style={{
                                            width: cardWidth,
                                            height: cardHeight,
                                            zIndex: isCenter
                                                ? 20
                                                : isSide
                                                  ? 10
                                                  : 0,
                                            pointerEvents: isVisibleCard
                                                ? 'auto'
                                                : 'none',
                                        }}
                                        initial={false}
                                        animate={{
                                            scale,
                                            opacity: isVisibleCard ? 1 : 0,
                                        }}
                                        transition={{
                                            duration:
                                                isJumping || isDragging
                                                    ? 0
                                                    : prefersReducedMotion
                                                      ? 0
                                                      : 0.5,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        aria-hidden={!isCenter}
                                    >
                                        <ChannelCard
                                            slide={slide}
                                            accent={accent}
                                            isCenter={isCenter}
                                            isDragging={isDragging}
                                            reduceMotion={
                                                prefersReducedMotion
                                            }
                                            onSelect={() =>
                                                handleCardSelect(
                                                    distance < 0
                                                        ? 'prev'
                                                        : 'next'
                                                )
                                            }
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    <CarouselArrow
                        direction="prev"
                        onClick={() => {
                            goPrev();
                            pauseAutoplay();
                            scheduleResume();
                        }}
                        compact={!isDesktop}
                        small={isMobile}
                        className={
                            arrowsAtEdge
                                ? 'left-0.5 top-1/2 -translate-y-1/2'
                                : 'top-1/2 -translate-x-1/2 -translate-y-1/2'
                        }
                        style={
                            arrowsAtEdge
                                ? undefined
                                : {
                                      left: `calc(50% - ${clusterHalf + 32}px)`,
                                  }
                        }
                    />
                    <CarouselArrow
                        direction="next"
                        onClick={() => {
                            goNext();
                            pauseAutoplay();
                            scheduleResume();
                        }}
                        compact={!isDesktop}
                        small={isMobile}
                        className={
                            arrowsAtEdge
                                ? 'right-0.5 top-1/2 -translate-y-1/2'
                                : 'top-1/2 -translate-x-1/2 -translate-y-1/2'
                        }
                        style={
                            arrowsAtEdge
                                ? undefined
                                : {
                                      left: `calc(50% + ${clusterHalf + 32}px)`,
                                  }
                        }
                    />
                </div>

                <div className="mt-8 flex justify-center md:mt-10">
                    <div
                        className="h-1 w-48 overflow-hidden rounded-full bg-[#E5E7EB] md:w-64"
                        role="progressbar"
                        aria-label="Progreso del carrusel"
                        aria-valuemin={1}
                        aria-valuemax={slideCount}
                        aria-valuenow={activeIndex + 1}
                    >
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: activeAccent }}
                            initial={false}
                            animate={{
                                width: `${
                                    ((activeIndex + 1) / slideCount) * 100
                                }%`,
                            }}
                            transition={{
                                duration: prefersReducedMotion ? 0 : 0.5,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    </div>
                </div>

                <p className="sr-only" aria-live="polite">
                    {`Slide ${activeIndex + 1} de ${slideCount}: ${
                        slides[activeIndex]?.title || ''
                    }`}
                </p>
            </div>
        </section>
    );
}
