'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import roadmap from '@/data/dates.json'

const VECTOR_H = 35;

// ─── Configuración responsiva ────────────────────────────────────────────────
// cols     : nodos por fila en ese breakpoint
// labelPos : 'auto' | 'top' | 'bottom' | string[]
//   'auto'   → alterna por columna dentro de cada fila (par=top, impar=bottom)
//   'top'    → todos los labels arriba
//   'bottom' → todos los labels abajo
//   array    → posición explícita por índice global (0=firstItem, 1..N=restItems)
const BREAKPOINTS = [
    { minWidth: 1200, cols: 4, labelPos: ['top', 'bottom', 'top', 'top', 'top', 'bottom', 'bottom', 'bottom', 'bottom'] },
    { minWidth: 900, cols: 3, labelPos: ['top', 'bottom', 'top', 'bottom', 'top', 'bottom', 'top', 'bottom', 'top'] },
    { minWidth: 600, cols: 2, labelPos: ['top', 'bottom', 'top', 'bottom', 'top', 'bottom', 'top', 'bottom', 'top'] },
    { minWidth: 0, cols: 1, labelPos: 'top' },
];

function getBreakpoint(w) {
    for (const bp of BREAKPOINTS) {
        if (w >= bp.minWidth) return bp;
    }
    return BREAKPOINTS[BREAKPOINTS.length - 1];
}

function getLabelPos(globalIdx, colIdx, bp) {
    if (globalIdx === 0) return 'top';
    const { labelPos } = bp;
    if (Array.isArray(labelPos)) return labelPos[globalIdx] ?? 'top';
    if (labelPos === 'top') return 'top';
    if (labelPos === 'bottom') return 'bottom';
    // 'auto': alterna dentro de cada fila por posición de columna
    return colIdx % 2 === 0 ? 'top' : 'bottom';
}

// ─── Path con esquinas redondeadas (L + Q) ──────────────────────────────────
// Dibuja líneas rectas entre nodos y sustituye cada esquina por un arco
// cuadrático de radio r. Sin Bézier cúbico → sin curvas exageradas.
function buildRoundedSnakePath(pts, r = 50) {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        const next = pts[i + 1];

        if (!next) {
            d += ` L ${curr.x} ${curr.y}`;
            continue;
        }

        const dx1 = curr.x - prev.x, dy1 = curr.y - prev.y;
        const len1 = Math.hypot(dx1, dy1);
        const dx2 = next.x - curr.x, dy2 = next.y - curr.y;
        const len2 = Math.hypot(dx2, dy2);
        const rr = Math.min(r, len1 / 2.2, len2 / 2.2);

        const t1x = curr.x - (dx1 / len1) * rr;
        const t1y = curr.y - (dy1 / len1) * rr;
        const t2x = curr.x + (dx2 / len2) * rr;
        const t2y = curr.y + (dy2 / len2) * rr;

        d += ` L ${t1x} ${t1y} Q ${curr.x} ${curr.y} ${t2x} ${t2y}`;
    }
    return d;
}

export default function SnakeRoadmap() {
    const containerRef = useRef(null);
    const circleRefs = useRef([]);
    const [pathSegments, setPathSegments] = useState([]);
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [activeBp, setActiveBp] = useState(() =>
        getBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 1200)
    );

    const buildPath = () => {
        const container = containerRef.current;
        if (!container || !roadmap.length) return;

        const cRect = container.getBoundingClientRect();
        const pts = circleRefs.current
            .map((el) => {
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return {
                    x: r.left + r.width / 2 - cRect.left,
                    y: r.top + r.height / 2 - cRect.top,
                };
            })
            .filter(Boolean);

        // Solo procedemos si tenemos todos los puntos necesarios
        if (pts.length < roadmap.length) return;

        const segments = [];
        for (let i = 0; i < pts.length - 1; i++) {
            const start = pts[i];
            const end = pts[i + 1];
            // El color del tramo es el color del año de destino
            const segmentColor = roadmap[i + 1]?.events[0]?.color ?? '#1e3a8a';

            segments.push({
                d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
                color: segmentColor
            });
        }
        setPathSegments(segments);
    };

    // Detecta cambio de breakpoint en resize
    useEffect(() => {
        const onResize = () => setActiveBp(getBreakpoint(window.innerWidth));
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Recalcula el path cuando el roadmap es visible o cambia el layout
    useEffect(() => {
        if (!showRoadmap) return;
        // Doble rAF: espera que el DOM repinte completamente el nuevo layout
        let raf2;
        const raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(buildPath);
        });
        // También en resize (se ejecuta después de que el DOM ya se actualizó)
        const onResize = () => requestAnimationFrame(buildPath);
        window.addEventListener('resize', onResize);
        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
            window.removeEventListener('resize', onResize);
        };
    }, [showRoadmap, activeBp]);

    const itemsPerRow = activeBp.cols;

    const [firstItem, ...restItems] = roadmap;

    const rows = [];
    for (let i = 0; i < restItems.length; i += itemsPerRow) {
        rows.push(restItems.slice(i, i + itemsPerRow));
    }

    const firstColor = firstItem?.events[0]?.color ?? '#1e3a8a';

    return (
        <>

            <section
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776896789/landing-05_qjstea.png')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top right',
                    backgroundSize: 'clamp(60px, 10%, 120px)',
                    zIndex: 1,
                    position: 'relative',
                }}
            >
                <div
                    className="relative w-full md:w-[70%] max-w-6xl mt-26 font-sans"
                    style={{ paddingTop: 50, marginBottom: '-50px' }}
                >
                    <div className="relative z-10 flex mr-13"
                    style={{
                        transform: 'translateY(20px)'
                    }}>
                        <div
                            className="w-[90%] bg-gradient-to-r from-[#3b4ca8] to-[#6ab2ca] px-10 py-3 rounded-tr-[20px]"
                            style={{ marginBottom: '-1.7em', textAlign: 'right' }}
                        >
                            <span
                                className="responsive-30 text-white tracking-wide"
                                style={{ fontSize: 'clamp(0.8em, 3vw, 1.5em)'}}
                            >
                                30 años distribuyendo productos
                            </span>
                        </div>
                    </div>

                    <div className="relative bg-[#cc007b] rounded-tr-[60px] mt-8 p-8 md:p-12 shadow-lg text-right w-full lg:w-[115%]">
                        <span
                            className="derma-span text-white"
                            style={{ fontSize: 'clamp(1.4em, 6vw, 4.5em)', "fontWeight": "700", letterSpacing: '.2em' }}
                        >DERMATOLÓGICOS</span> <br />
                        <p
                            className="derma-p text-white leading-none tracking-tight"
                            style={{ fontSize: 'clamp(2.5em, 10vw, 7em)', "fontWeight": "700", letterSpacing: '.15em' }}
                        >

                            Y ESTÉTICOS
                        </p>

                       {/* Etiqueta inferior azul + trigger del roadmap responsivo */}
                        <div
                            className={`w-full px-4 md:px-0 absolute -bottom-6 md:-bottom-5 left-0 right-0 md:left-auto md:right-20 flex justify-center md:justify-end transition-all duration-500 z-20 ${
                                showRoadmap ? 'translate-x-0' : 'translate-x-0'
                            }`}
                        >
                            {/* Contenedor Cápsula */}
                            <div
                                className={`flex items-center bg-white rounded-full shadow-md overflow-hidden max-w-full ${showRoadmap ? 'lg:translate-x-[-25px]' : 'lg:translate-x-80'}`}
                                style={{
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 10px 1px'
                                }}
                            >
                                {/* Label Azul (Izquierda) */}
                                <div className="bg-gradient-to-r from-[#3b4ca8] to-[#6ab2ca] px-4 md:px-6 py-2 rounded-full z-10 -ml-[1px]">
                                    <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest whitespace-nowrap">
                                        En todo México
                                    </span>
                                </div>

                                {/* Lado derecho: Controlado para no romper en celulares */}
                                {!showRoadmap && (
                                    <div className="flex items-center gap-1 whitespace-nowrap px-3 md:px-5 py-1 text-[10px] sm:text-xs md:text-sm animate-in fade-in slide-in-from-left-2 duration-500">
                                        <span className="text-black uppercase tracking-wider hidden sm:inline">
                                            ¡Nuestra historia comienza
                                        </span>
                                        <span className="text-black uppercase tracking-wider inline sm:hidden">
                                            Historia 
                                        </span>

                                        <button
                                            onClick={() => setShowRoadmap(true)}
                                            className="text-black font-black uppercase tracking-widest cursor-pointer underline hover:text-[#3b4ca8] transition-colors"
                                            style={{ background: 'none', border: 'none', outline: 'none' }}
                                        >
                                            ¡AQUÍ!
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div
                className='bg-white'
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776869609/landing-15_uvax9q.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <motion.section
                    initial={false}
                    animate={showRoadmap ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{
                        // overflow: 'hidden',
                        width: '100%',
                        // background: '#fff',
                        // backgroundImage: "url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776869609/landing-15_uvax9q.png')",
                        // backgroundSize: 'cover',
                        // backgroundPosition: 'center',
                        // backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div
                    // style={{ padding: '0px 0 70px' }}
                    >
                        <style>{`
                            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
                            .rm * { box-sizing: border-box; font-family: 'Sora', sans-serif; }`}
                        </style>

                        <div ref={containerRef} className="rm" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', position: 'relative',  }}>

                            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}>
                                {pathSegments.map((seg, idx) => (
                                    <motion.path
                                        key={idx}
                                        d={seg.d}
                                        fill="none"
                                        stroke={seg.color}
                                        strokeWidth="25"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        // CAMBIO AQUÍ: Solo anima a 1 si showRoadmap es true
                                        animate={{ pathLength: showRoadmap ? 1 : 0 }}
                                        transition={{
                                            duration: 0.6,
                                            // Agregamos un pequeño delay extra (0.4) para que la línea 
                                            // empiece justo después de que el primer círculo aparezca
                                            delay: showRoadmap ? (idx * 0.6) + 0.4 : 0,
                                            ease: "linear"
                                        }}
                                    />
                                ))}
                            </svg>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', zIndex: 1, transform: showRoadmap && activeBp.minWidth < 600
                                ? 'translateY(180px)'
                                : 'translateY(0)',
                                    transition: 'transform 0.6s ease-in-out', }}>

                                {/* ── FILA 0: nodo único alineado a la derecha ── */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: itemsPerRow === 1 ? '100%' : 200
                                    }}>
                                        {/* Zona superior con label */}
                                        <div style={{ height: VECTOR_H + 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={showRoadmap ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                                transition={{ delay: 0.5 }}
                                                style={{
                                                    marginBottom: 8,
                                                    ...(itemsPerRow === 1 && {
                                                        background: 'rgba(255,255,255,0.88)',
                                                        borderRadius: 10,
                                                        padding: '6px 10px',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                        alignSelf: 'flex-end',
                                                        marginRight: 8,
                                                    })
                                                }}
                                            >
                                                <LabelGroup item={firstItem} />
                                            </motion.div>
                                            <Stick color={firstColor} direction="top" delay={0} height={VECTOR_H} showRoadmap={showRoadmap} />
                                        </div>

                                        {/* Círculo */}
                                        <motion.div
                                            ref={(el) => (circleRefs.current[0] = el)}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={showRoadmap ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                            transition={{
                                                delay: showRoadmap ? 0 : 0,
                                                duration: 0.4,
                                                type: 'spring',
                                                stiffness: 240,
                                                damping: 18,
                                            }}
                                            onAnimationComplete={buildPath}
                                            style={{
                                                width: 55,
                                                height: 55,
                                                borderRadius: '50%',
                                                background: '#f7f7f7',
                                                border: `1px solid ${firstColor}`,
                                                boxShadow: `0 0 0 4px #f6f6f6, 0 0 0 11px ${firstColor}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <span style={{ color: '#7d7d7d', fontWeight: 800, fontSize: 14.5, letterSpacing: '-0.5px' }}>
                                                {firstItem?.year}
                                            </span>
                                        </motion.div>

                                        {/* Zona inferior vacía */}
                                        <div style={{ height: VECTOR_H + 70 }} />
                                    </div>
                                </div>

                                {/* ── FILAS SNAKE ── */}
                                {rows.map((row, rowIdx) => {
                                    const isReverse = rowIdx % 2 === 0;
                                    return (
                                        <div key={rowIdx} style={{
                                            display: 'flex',
                                            flexDirection: isReverse ? 'row-reverse' : 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            {row.map((item, colIdx) => {
                                                const color = item.events[0]?.color ?? '#1e3a8a';
                                                const globalIdx = 1 + rowIdx * itemsPerRow + colIdx;
                                                const isTop = getLabelPos(globalIdx, colIdx, activeBp) === 'top';

                                                const segmentDuration = 0.6;
                                                const delay = globalIdx * segmentDuration;

                                                return (
                                                    /*<div key={colIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: itemsPerRow === 1 ? '100%' : 200 }}>*/
                                                    <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  width: itemsPerRow === 1 ? 173 :itemsPerRow === 2 ? 200 : itemsPerRow === 3 ? 200 : itemsPerRow === 4 ? 200 : 200 }}>
                                                        <div style={{ height: VECTOR_H + 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                            {isTop && (
                                                                <>
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 8 }}
                                                                        animate={showRoadmap ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                                                        // animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: delay + 0.7 }}
                                                                        style={{
                                                                            marginBottom: 8,
                                                                            ...(itemsPerRow === 1 && {
                                                                                background: 'rgba(255,255,255,0.88)',
                                                                                borderRadius: 10,
                                                                                padding: '6px 10px',
                                                                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                                            })
                                                                        }}
                                                                    >
                                                                        <LabelGroup item={item} />
                                                                    </motion.div>
                                                                    <Stick
                                                                        color={color}
                                                                        direction="top"
                                                                        delay={delay + 0.5}
                                                                        height={VECTOR_H}
                                                                        animate={showRoadmap ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                                                        showRoadmap={showRoadmap}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                        <motion.div
                                                            ref={(el) => (circleRefs.current[globalIdx] = el)}
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={showRoadmap ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                                            // animate={{ scale: 1, opacity: 1 }}
                                                            transition={{
                                                                delay: delay,
                                                                duration: 0.4,
                                                                type: 'spring',
                                                                stiffness: 240,
                                                                damping: 18,
                                                            }}
                                                            onAnimationComplete={buildPath}
                                                            style={{
                                                                width: 55,
                                                                height: 55,
                                                                borderRadius: '50%',
                                                                background: '#f7f7f7',
                                                                border: `1px solid ${color}`,
                                                                boxShadow: `0 0 0 4px #f6f6f6, 0 0 0 11px ${color}`,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: '#7d7d7d',
                                                                    fontWeight: 800,
                                                                    fontSize: 14.5,
                                                                    letterSpacing: '-0.5px'
                                                                }}
                                                            >
                                                                {item.year}
                                                            </span>
                                                        </motion.div>
                                                        <div style={{ height: VECTOR_H + 70, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                            {!isTop && (
                                                                <>
                                                                    <Stick
                                                                        color={color}
                                                                        direction="bottom"
                                                                        delay={delay + 0.7}
                                                                        height={VECTOR_H}
                                                                        animate={showRoadmap ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                                                        showRoadmap={showRoadmap}
                                                                    />
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: -8 }}
                                                                        animate={showRoadmap ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                                                        // animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: delay + 0.5 }}
                                                                        style={{
                                                                            marginTop: 8,
                                                                            ...(itemsPerRow === 1 && {
                                                                                background: 'rgba(255,255,255,0.88)',
                                                                                borderRadius: 10,
                                                                                padding: '6px 10px',
                                                                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                                            })
                                                                        }}
                                                                    >
                                                                        <LabelGroup item={item} />
                                                                    </motion.div>
                                                                </>
                                                            )}
                                                        </div>

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.section>
                <section
    className="relative px-4 sm:px-6 md:px-8 lg:px-25 py-12 sm:py-16 md:py-20 lg:py-25 overflow-hidden bg-white"
    style={{
        backgroundImage: `
            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776964654/left_bjr7jh.png'),
            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776964654/right_v9mj86.png')
        `,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'bottom left, bottom right',
        backgroundSize: '25%, 25%',
        backgroundColor: 'transparent',
        marginTop: '3em',
        zIndex: 0,
    }}
>
    <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch justify-center px-0">

        {/* Tarjeta MISIÓN */}
        <div className="flex-1 flex flex-col items-center w-full mt-10 mb-10">
            <h2 className="text-[#1e3a8a] text-2xl sm:text-3xl font-bold tracking-widest mb-3 sm:mb-4 md:mb-6 uppercase text-center">
                Misión
            </h2>
            <div className="bg-white rounded-[30px] sm:rounded-[40px] p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-50 flex flex-col items-center justify-center h-full w-full">
                <p className="text-gray-600 text-center text-sm sm:text-base md:text-lg leading-relaxed font-light">
                    Brindar acceso a la mayor cantidad de productos en segmentos específicos de la medicina,
                    con condiciones comerciales adecuadas y alianzas que el grupo ha construido como pionero
                    en la distribución especializada buscando asesorar, desarrollar, proteger y ayudar a nuestros clientes,
                    además de generar competitividad para lograr crecimiento en cada uno de sus ecosistemas.
                </p>
            </div>
        </div>

        {/* Tarjeta VISIÓN */}
        <div className="flex-1 flex flex-col items-center w-full mt-10 mb-10">
            <h2 className="text-[#1e3a8a] text-2xl sm:text-3xl font-bold tracking-widest mb-3 sm:mb-4 md:mb-6 uppercase text-center">
                Visión
            </h2>
            <div className="bg-white rounded-[30px] sm:rounded-[40px] p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-50 flex flex-col items-center justify-center h-full w-full">
                <p className="text-gray-600 text-center text-sm sm:text-base md:text-lg leading-relaxed font-light">
                    Ser el distribuidor #1 en el país, especializado en segmentos específicos de la medicina,
                    reconocido por tener al cliente como centro de negocio, además de buscar excelencia en el servicio,
                    competitividad y alianzas estratégicas.
                </p>
            </div>
        </div>

    </div>
</section>
            </div>
        </>
    );
}

function Stick({ color, direction, delay, height, showRoadmap }) {
    const isTop = direction === 'top';
    return (
        <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={showRoadmap ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            // animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.4 }}
            style={{
                width: 2, height,
                background: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, ${color}, ${color}25)`,
                transformOrigin: isTop ? 'bottom' : 'top',
                position: 'relative', flexShrink: 0,
            }}
        >
            <div style={{
                position: 'absolute',
                [isTop ? 'top' : 'bottom']: 0,
                left: '50%', transform: 'translateX(-50%)',
                width: 8, height: 8, borderRadius: '50%', background: color,
            }} />
        </motion.div>
    );
}

function LabelGroup({ item }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10}}>
            {item.events.map((ev, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

                    {/* ICONO */}
                    <div style={{
                        width: 55,
                        height: 55,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: `white`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 6,
                        boxShadow: '0px 2px 12px 6px #0000002e',
                    }}>
                        <img
                            src={ev.icon}
                            alt={ev.alt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </div>

                    {/* TEXTO */}
                    <span>
                        {ev.titleParts.map((part, i) => (
                            <span key={i} style={part.style || {}}>
                                {part.text}
                            </span>
                        ))}
                    </span>

                </div>
            ))}
        </div>
    );
}