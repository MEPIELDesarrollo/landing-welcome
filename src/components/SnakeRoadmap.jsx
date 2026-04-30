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
    { minWidth: 1200, cols: 4, labelPos: 'auto' },
    { minWidth: 900, cols: 3, labelPos: 'auto' },
    { minWidth: 600, cols: 2, labelPos: 'auto' },
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
    const [pathD, setPathD] = useState('');
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [activeBp, setActiveBp] = useState(() =>
        getBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 1200)
    );

    const buildPath = () => {
        const container = containerRef.current;
        if (!container) return;
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

        if (pts.length < 2) return;
        setPathD(buildRoundedSnakePath(pts, 55));
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
            <div className='bg-white'>
                <section
                    style={{
                        backgroundImage: "url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776896789/landing-05_qjstea.png')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top right',
                        backgroundSize: '15%',
                        zIndex: 1,
                        position: 'relative',
                    }}
                >
                    <div
                        className="relative w-[70%] max-w-6xl font-sans"
                        style={{ paddingTop: 50, marginBottom: '-50px' }}
                    >
                        <div className="relative z-10 flex">
                            <div
                                className="w-[75%] bg-gradient-to-r from-[#3b4ca8] to-[#6ab2ca] px-10 py-3 rounded-tr-[20px]"
                                style={{ marginBottom: '-1.7em', textAlign: 'right' }}
                            >
                                <span
                                    className="text-white tracking-wide"
                                    style={{ fontSize: '1.5em' }}
                                >
                                    30 años distribuyendo productos
                                </span>
                            </div>
                        </div>

                        {/* Bloque Principal Magenta */}
                        <div className="relative bg-[#cc007b] rounded-tr-[60px] p-8 md:p-12 shadow-lg text-right">
                            <span
                                className="text-white"
                                style={{ fontSize: "3.2em", "fontWeight": "700", letterSpacing: '.2em' }}
                            >DERMATOLÓGICOS</span> <br />
                            <p
                                className="text-white leading-none tracking-tight"
                                style={{ fontSize: "5em", "fontWeight": "700", letterSpacing: '.15em' }}
                            >

                                Y ESTÉTICOS
                            </p>

                            {/* Etiqueta inferior azul + trigger del roadmap */}
                            <div className="absolute bottom-4 right-20 flex items-center gap-3">
                                <div className="bg-gradient-to-r from-[#3b4ca8] to-[#6ab2ca] px-6 py-1 rounded-full shadow-md">
                                    <span className="text-white text-xs font-weight uppercase tracking-widest">
                                        En todo México
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowRoadmap(v => !v)}
                                    className="bg-white px-5 py-1 rounded-full shadow-md border border-[#cc007b] cursor-pointer transition-all hover:bg-[#cc007b] hover:text-white group"
                                    style={{ outline: 'none' }}
                                >
                                    <span className="text-[#cc007b] group-hover:text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                                        {showRoadmap ? '✕ Cerrar historia' : '¡Nuestra historia comienza AQUÍ!'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <motion.section
                    initial={false}
                    animate={showRoadmap ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{
                        // overflow: 'hidden',
                        width: '100%',
                        background: '#fff',
                        backgroundImage: "url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776869609/landing-15_uvax9q.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div style={{ padding: '0px 0 300px' }}>
                        <style>{`
                            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
                            .rm * { box-sizing: border-box; font-family: 'Sora', sans-serif; }`}
                        </style>

                        <div ref={containerRef} className="rm" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', position: 'relative', marginTop: "-100px" }}>

                            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}>
                                <defs>
                                    <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#1e3a8a" />
                                        <stop offset="25%" stopColor="#f97316" />
                                        <stop offset="50%" stopColor="#7c3aed" />
                                        <stop offset="75%" stopColor="#0ea5e9" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                                {pathD && (
                                    <motion.path
                                        d={pathD}
                                        fill="none"
                                        stroke="url(#lg)"
                                        strokeWidth="25"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 3.5, ease: 'easeInOut' }}
                                    />
                                )}
                            </svg>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', zIndex: 1 }}>

                                {/* ── FILA 0: nodo único alineado a la derecha ── */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 220 }}>
                                        {/* Zona superior con label */}
                                        <div style={{ height: VECTOR_H + 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                style={{ marginBottom: 8 }}
                                            >
                                                <LabelGroup item={firstItem} />
                                            </motion.div>
                                            <Stick color={firstColor} direction="top" delay={0} height={VECTOR_H} />
                                        </div>

                                        {/* Círculo */}
                                        <motion.div
                                            ref={(el) => (circleRefs.current[0] = el)}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                delay: 0,
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
                                            <span
                                                style={{
                                                    color: '#7d7d7d',
                                                    fontWeight: 800,
                                                    fontSize: 14.5,
                                                    letterSpacing: '-0.5px'
                                                }}
                                            >
                                                {firstItem?.year}
                                            </span>
                                        </motion.div>
                                        {/* <motion.div
                                        ref={(el) => (circleRefs.current[0] = el)}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0, duration: 0.4, type: 'spring', stiffness: 240, damping: 18 }}
                                        onAnimationComplete={buildPath}
                                        style={{
                                            width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
                                            background: firstColor,
                                            border: '3.5px solid #fff',
                                            boxShadow: `0 0 0 3px ${firstColor}33`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: `0 0 0 6px ${firstColor}`,
                                        }}
                                    >
                                        <span style={{ color: '#fff', fontWeight: 800, fontSize: 14.5, letterSpacing: '-0.5px' }}>
                                            {firstItem?.year}
                                        </span>
                                    </motion.div> */}

                                        {/* Zona inferior vacía (para mantener altura consistente) */}
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
                                                const globalIdx = 1 + rowIdx * itemsPerRow + colIdx;
                                                const color = item.events[0]?.color ?? '#1e3a8a';
                                                const isTop = getLabelPos(globalIdx, colIdx, activeBp) === 'top';
                                                const delay = (globalIdx / (roadmap.length - 1)) * 2;

                                                return (
                                                    <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 200 }}>

                                                        <div style={{ height: VECTOR_H + 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                            {isTop && (
                                                                <>
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 8 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: delay + 0.5 }}
                                                                        style={{ marginBottom: 8 }}
                                                                    >
                                                                        <LabelGroup item={item} />
                                                                    </motion.div>
                                                                    <Stick color={color} direction="top" delay={delay} height={VECTOR_H} />
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* <motion.div
                                                        ref={(el) => (circleRefs.current[globalIdx] = el)}
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay, duration: 0.4, type: 'spring', stiffness: 240, damping: 18 }}
                                                        onAnimationComplete={buildPath}
                                                        style={{
                                                            width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
                                                            background: color,
                                                            border: '3.5px solid #fff',
                                                            boxShadow: `0 0 0 3px ${color}33`,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        }}
                                                    >
                                                        <span style={{ color: '#fff', fontWeight: 800, fontSize: 14.5, letterSpacing: '-0.5px' }}>
                                                            {item.year}
                                                        </span>
                                                    </motion.div> */}
                                                        <motion.div
                                                            ref={(el) => (circleRefs.current[globalIdx] = el)}
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{
                                                                delay: 0,
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
                                                                    <Stick color={color} direction="bottom" delay={delay} height={VECTOR_H} />
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: -8 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: delay + 0.5 }}
                                                                        style={{ marginTop: 8 }}
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
                    className="relative py-25 px-4 overflow-hidden bg-white"
                    style={{
                        backgroundImage: `
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776964654/left_bjr7jh.png'),
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776964654/right_v9mj86.png')
                        `,
                        backgroundRepeat: 'no-repeat, no-repeat',
                        backgroundPosition: 'bottom left, bottom right',
                        backgroundSize: '45%, 35%',
                        backgroundColor: 'transparent',
                        marginTop: '5em',
                        zIndex: 0,
                    }}
                >
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-stretch justify-center">

                        {/* Tarjeta MISIÓN */}
                        <div className="flex-1 flex flex-col items-center">
                            <h2 className="text-[#1e3a8a] text-3xl font-extrabold tracking-widest mb-6 uppercase">
                                Misión
                            </h2>
                            <div className="bg-white rounded-[40px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-50 flex flex-col items-center justify-center h-full">
                                <p className="text-gray-600 text-center text-lg leading-relaxed font-light">
                                    Brindar acceso a la mayor cantidad de productos en segmentos específicos de la medicina,
                                    con condiciones comerciales adecuadas y alianzas que el grupo ha construido como pionero
                                    en la distribución especializada buscando asesorar, desarrollar, proteger y ayudar a nuestros clientes,
                                    además de generar competitividad para lograr crecimiento en cada uno de sus ecosistemas.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta VISIÓN */}
                        <div className="flex-1 flex flex-col items-center">
                            <h2 className="text-[#1e3a8a] text-3xl font-extrabold tracking-widest mb-6 uppercase">
                                Visión
                            </h2>
                            <div className="bg-white rounded-[40px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-50 flex flex-col items-center justify-center h-full">
                                <p className="text-gray-600 text-center text-lg leading-relaxed font-light">
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

function Stick({ color, direction, delay, height }) {
    const isTop = direction === 'top';
    return (
        <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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