"use client"; // Importante: Framer Motion requiere hooks de cliente

import React from 'react';
import { motion } from 'framer-motion';

const VALORES = [
    { id: 1, text: 'Compromiso', color: '#1e3a8a' },
    { id: 2, text: 'Innovación', color: '#c20078' },
    { id: 3, text: 'Transparencia', color: '#0ea5e9' },
    { id: 4, text: 'Lealtad', color: '#f59e0b' },
    { id: 5, text: 'Respeto', color: '#1e3a8a' },
    { id: 6, text: 'Pasión', color: '#c20078' },
];

// Configuración de la animación para los contenedores (labels)
const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1, // Efecto cascada: cada uno tarda 0.1s más que el anterior
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

export default function ValoresSection() {
    return (
        <section
            className="w-full bg-white py-16"
            style={{
                boxShadow: '0px 0px 10px 10px #0000002e',
                position: 'relative',
                zIndex: 1
            }}
        >
            <div className="valores-responsive mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">

                {/* 🔵 LADO IZQUIERDO */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <h2
                        className="text-[#2f3c7e] font-semibold tracking-tight leading-none font-poppins"
                        style={{
                            fontSize: 'clamp(8rem, 8vw, 6rem)',
                            letterSpacing: '-2px',
                            paddingLeft: '.5em',
                        }}
                    >
                        VALORES
                    </h2>

                    <div className="mt-2 relative -ml-15 md:-ml-4" >
                        <div
                            className="text-white uppercase tracking-[0.25em] font-medium py-2  font-poppins sm:pl-1"
                            style={{
                                background: '#c20078',
                                clipPath: 'polygon(0px 0px, 100% 0px, 91% 100%, 0% 100%)',
                                boxShadow: '0 6px 14px rgba(194,0,120,0.25)',
                                paddingLeft: '6em'
                            }}
                        >
                            Que nos definen
                        </div>
                    </div>
                </motion.div>

               {/* 🟢 GRILLA DE VALORES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
                    {VALORES.map((val, i) => (
                    <motion.div
                        key={val.id}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInVariant}
                        className="flex items-center rounded-full px-3 py-2 md:px-4 md:py-3 bg-[#f8fafc] w-full"
                        style={{
                            boxShadow: '0 0px 10px rgb(5 5 5 / 25%)',
                        }}
                    >
                        {/* CÍRCULO - Tamaño responsivo */}
                        <div
                            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base shrink-0 font-poppins"
                            style={{ backgroundColor: val.color }}
                        >
                            {val.id}
                        </div>

                    {/* TEXTO - Alineado a la izquierda en móviles */}
                    <div className="flex-1 text-left sm:text-center">
                        <span
                            className="text-gray-600 font-medium px-2 sm:px-3 font-poppins text-xs sm:text-sm md:text-base"
                            style={{
                                letterSpacing: '1px',
                                fontSize: 'clamp(12px, 2vw, 16px)'
                            }}
                        >
                            {val.text}
                        </span>
                    </div>
                </motion.div>
                ))}
            </div>
        </div>
    </section>
    );
}