import React from 'react';

const VALORES = [
    { id: 1, text: 'Compromiso', color: '#1e3a8a' },
    { id: 2, text: 'Innovación', color: '#c20078' },
    { id: 3, text: 'Transparencia', color: '#0ea5e9' },
    { id: 4, text: 'Lealtad', color: '#f59e0b' },
    { id: 5, text: 'Respeto', color: '#1e3a8a' },
    { id: 6, text: 'Pasión', color: '#c20078' },
];

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
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

                {/* 🔵 LADO IZQUIERDO */}
                <div className="relative">

                    {/* TÍTULO */}
                    <h2
                        className="text-[#2f3c7e] font-light tracking-tight leading-none"
                        style={{
                            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                            letterSpacing: '-2px'
                        }}
                    >
                        VALORES
                    </h2>

                    {/* BARRA ROSA */}
                    <div className="mt-2 relative">
                        <div
                            className="text-white uppercase tracking-[0.25em] text-sm font-medium px-6 py-2"
                            style={{
                                background: '#c20078',
                                clipPath: 'polygon(0px 0px, 100% 0px, 91% 100%, 0% 100%)',
                                boxShadow: '0 6px 14px rgba(194,0,120,0.25)'
                            }}
                        >
                            Que nos definen
                        </div>
                    </div>
                </div>






















                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

                    {VALORES.map((val) => (
                        <div
                            key={val.id}
                            className="flex items-center rounded-full px-3 py-2 bg-[#f8fafc]"
                            style={{
                                boxShadow: '0 0px 10px rgb(5 5 5 / 25%)',
                            }}
                        >

                            {/* CÍRCULO */}
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                                style={{
                                    backgroundColor: val.color,
                                }}
                            >
                                {val.id}
                            </div>

                            {/* TEXTO */}
                            <div className="flex-1 text-center">
                                <span
                                    className="text-gray-600 font-medium"
                                    style={{
                                        letterSpacing: '2px',
                                        fontSize: '15px'
                                    }}
                                >
                                    {val.text}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}