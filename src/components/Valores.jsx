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
            <div className="mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">

                {/* 🔵 LADO IZQUIERDO */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} // Solo se anima la primera vez que se ve
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <h2
                        className="text-[#2f3c7e] font-semibold tracking-tight leading-none font-poppins"
                        style={{
                            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                            letterSpacing: '-2px'
                        }}
                    >
                        VALORES
                    </h2>

                    <div className="mt-2 relative" style={{ marginLeft: '-1em' }}>
                        <div
                            className="text-white uppercase tracking-[0.25em] text-sm font-medium px-6 py-2  font-poppins"
                            style={{
                                background: '#c20078',
                                clipPath: 'polygon(0px 0px, 100% 0px, 91% 100%, 0% 100%)',
                                boxShadow: '0 6px 14px rgba(194,0,120,0.25)'
                            }}
                        >
                            Que nos definen
                        </div>
                    </div>
                </motion.div>

                {/* 🟢 GRILLA DE VALORES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {VALORES.map((val, i) => (
                        <motion.div
                            key={val.id}
                            custom={i} // Pasamos el índice para el delay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }} // Se activa 50px antes de entrar
                            variants={fadeInVariant}
                            className="flex items-center rounded-full px-3 py-2 bg-[#f8fafc]"
                            style={{
                                boxShadow: '0 0px 10px rgb(5 5 5 / 25%)',
                            }}
                        >
                            {/* CÍRCULO */}
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 font-poppins"
                                style={{ backgroundColor: val.color }}
                            >
                                {val.id}
                            </div>

                            {/* TEXTO */}
                            <div className="flex-1 text-center">
                                <span
                                    className="text-gray-600 font-medium font-poppins"
                                    style={{
                                        letterSpacing: '2px',
                                        fontSize: '15px'
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