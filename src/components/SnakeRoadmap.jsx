'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import roadmap from '@/data/dates.json'

const ITEMS_PER_ROW = 3;
const VECTOR_H = 35;

// true = texto ARRIBA del círculo, false = texto ABAJO
const IS_TOP = [true, true, true, false, false, true, false, false, false];

function lighten(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + Math.round(255 * amt));
    const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * amt));
    const b = Math.min(255, (n & 0xff) + Math.round(255 * amt));
    return `rgb(${r},${g},${b})`;
}

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

    const rows = [];
    for (let i = 0; i < roadmap.length; i += ITEMS_PER_ROW) {
        rows.push(roadmap.slice(i, i + ITEMS_PER_ROW));
    }

    return (
        <section style={{ width: '100%', padding: '80px 0 120px', background: '#fff', overflow: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
                .rm * { box-sizing: border-box; font-family: 'Sora', sans-serif; }
            `}</style>

            <div ref={containerRef} className="rm" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', position: 'relative' }}>

                {/* SVG absoluto, detrás de todo */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e3a8a" />
                            <stop offset="33%" stopColor="#7c3aed" />
                            <stop offset="66%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                    {pathD && (
                        <motion.path
                            d={pathD} fill="none" stroke="url(#lg)" strokeWidth="5" strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 3, ease: 'easeInOut' }}
                        />
                    )}
                </svg>

                {/* Grid snake */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', zIndex: 1 }}>
                    {rows.map((row, rowIdx) => {
                        const isReverse = rowIdx % 2 !== 0;
                        return (
                            <div key={rowIdx} style={{
                                display: 'flex',
                                flexDirection: isReverse ? 'row-reverse' : 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                {row.map((item, colIdx) => {
                                    const globalIdx = rowIdx * ITEMS_PER_ROW + colIdx;
                                    const color = item.events[0]?.color ?? '#1e3a8a';
                                    const isTop = IS_TOP[globalIdx] ?? false;
                                    const delay = (globalIdx / (roadmap.length - 1)) * 2;

                                    return (
                                        <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 250 }}>

                                            {/* Zona superior: texto (si isTop) + palito */}
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

                                            {/* CÍRCULO — el ref va aquí, en el elemento real visible */}
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
                                                <span style={{ color: '#fff', fontWeight: 800, fontSize: 14.5, letterSpacing: '-0.5px', position: 'relative', zIndex: 1 }}>
                                                    {item.year}
                                                </span>
                                            </motion.div>

                                            {/* Zona inferior: palito + texto (si !isTop) */}
                                            <div style={{ height: VECTOR_H + 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
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
                    <div style={{
                        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                        background: `${ev.color}14`, border: `1.5px solid ${ev.color}44`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ev.color} strokeWidth="2.2" strokeLinecap="round">
                            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                        </svg>
                    </div>
                    <p style={{ margin: 0, maxWidth: 195, fontSize: 12.5, fontWeight: 700, lineHeight: 1.4, color: ev.color }}>
                        {ev.title}
                    </p>
                </div>
            ))}
        </div>
    );
}