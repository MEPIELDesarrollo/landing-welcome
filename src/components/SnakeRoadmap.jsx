'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import roadmap from '@/data/dates.json'

const ITEMS_PER_ROW = 4;
const VECTOR_H = 35;

const IS_TOP = [true, false, true, true, true, false, false, false, false];

export default function SnakeRoadmap() {
    const containerRef = useRef(null);
    const circleRefs = useRef([]);
    const [pathD, setPathD] = useState('');

    const buildPath = () => {
        const container = containerRef.current;
        if (!container) return;
        const cRect = container.getBoundingClientRect();

        const pts = circleRefs.current.map((el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
                x: r.left + r.width / 2 - cRect.left,
                y: r.top + r.height / 2 - cRect.top,
            };
        }).filter(Boolean);

        if (pts.length < 2) return;

        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
            const p = pts[i - 1], c = pts[i];
            const mx = (p.x + c.x) / 2;
            d += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`;
        }
        setPathD(d);
    };

    useEffect(() => {
        const raf = requestAnimationFrame(() => requestAnimationFrame(buildPath));
        window.addEventListener('resize', buildPath);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', buildPath); };
    }, []);

    // Separar primer nodo del resto
    const [firstItem, ...restItems] = roadmap;

    // Armar filas del resto (4 por fila)
    const rows = [];
    for (let i = 0; i < restItems.length; i += ITEMS_PER_ROW) {
        rows.push(restItems.slice(i, i + ITEMS_PER_ROW));
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
                    }}
                >
                    <div
                        className="relative w-[60%] max-w-6xl font-sans"
                        style={{ paddingTop: 50, marginBottom: '-50px' }}
                    >
                        {/* Contenedor Superior (Texto pequeño azul) */}
                        <div className="relative z-10 flex">
                            <div className="bg-gradient-to-r from-[#3b5998] to-[#6dbcc3] px-10 py-1.5 rounded-tr-[20px]">
                                <span className="text-white text-sm font-medium tracking-wide">
                                    30 años distribuyendo productos
                                </span>
                            </div>
                        </div>

                        {/* Bloque Principal Magenta */}
                        <div className="relative bg-[#c20078] rounded-tr-[60px] p-8 md:p-12 shadow-lg text-right">
                            <span
                                className="text-white"
                                style={{ fontSize: "3.2em", "fontWeight": "700" }}
                            >DERMATOLÓGICOS</span> <br />
                            <p
                                className="text-white leading-none tracking-tight"
                                style={{ fontSize: "5em", "fontWeight": "700" }}
                            >

                                Y ESTÉTICOS
                            </p>

                            {/* Etiqueta inferior azul */}
                            <div className="absolute bottom-4 right-20 bg-gradient-to-r from-[#3b5998] to-[#6dbcc3] px-6 py-1 rounded-full shadow-md">
                                <span className="text-white text-xs font-bold uppercase tracking-widest">
                                    En todo México
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    style={{
                        width: '100%',
                        padding: '0px 0 300px',
                        background: '#fff',
                        backgroundImage: "url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776869609/landing-15_uvax9q.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
                .rm * { box-sizing: border-box; font-family: 'Sora', sans-serif; }
            `}</style>

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
                                        transition={{ delay: 0, duration: 0.4, type: 'spring', stiffness: 240, damping: 18 }}
                                        onAnimationComplete={buildPath}
                                        style={{
                                            width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
                                            background: firstColor,
                                            border: '3.5px solid #fff',
                                            boxShadow: `0 0 0 3px ${firstColor}33`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >
                                        <span style={{ color: '#fff', fontWeight: 800, fontSize: 14.5, letterSpacing: '-0.5px' }}>
                                            {firstItem?.year}
                                        </span>
                                    </motion.div>

                                    {/* Zona inferior vacía (para mantener altura consistente) */}
                                    <div style={{ height: VECTOR_H + 70 }} />
                                </div>
                            </div>

                            {/* ── FILAS SNAKE: 4 nodos por fila ── */}
                            {rows.map((row, rowIdx) => {
                                // fila 0 del snake (rowIdx=0) viene de la derecha → row-reverse
                                // fila 1 (rowIdx=1) va de izquierda a derecha → row
                                const isReverse = rowIdx % 2 === 0;
                                return (
                                    <div key={rowIdx} style={{
                                        display: 'flex',
                                        flexDirection: isReverse ? 'row-reverse' : 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        {row.map((item, colIdx) => {
                                            const globalIdx = 1 + rowIdx * ITEMS_PER_ROW + colIdx;
                                            const color = item.events[0]?.color ?? '#1e3a8a';
                                            const isTop = IS_TOP[globalIdx] ?? false;
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

                                                    <motion.div
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
                </section>
                <section
                    className="relative z-10 py-30 px-4 overflow-hidden bg-white"
                    style={{
                        backgroundImage: `
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776964654/left_bjr7jh.png'),
                            url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1776964654/right_v9mj86.png')
                        `,
                        backgroundRepeat: 'no-repeat, no-repeat',
                        backgroundPosition: 'bottom left, bottom right',
                        backgroundSize: '45%, 35%',
                        backgroundColor: 'transparent',
                        marginTop: '-200px',
                        zIndex: 0
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