'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function CallToAction({
    // Fondo
    bgType = 'image',
    backgroundImage,
    backgroundColor,
    backgroundStyle,

    // Contenido
    title,
    subtitle,
    description,
    titleColor,
    subtitleColor,
    descriptionColor,

    btn1Text,
    btn1Url,
    btn1Style = { background: 'linear-gradient(to right, #0082ff, #0000ff)', color: '#fff' },

    btn2Text,
    btn2Url,
    btn2Style = { background: '#fff', color: '#1a2b56', border: '1px solid #e5e7eb' },
}) {

    const containerStyle = {
        ...(bgType === 'gradient' ? backgroundStyle : { backgroundColor: backgroundColor || '#FBFCFD' })
    };

    return (
        <section
            className="relative w-full flex items-center justify-center py-24 md:py-32 px-6 overflow-hidden"
            style={containerStyle}
        >
            {/* Fondo de Imagen */}
            {bgType === 'image' && backgroundImage && (
                <div className="absolute inset-0 z-0 w-full h-full">
                    <Image
                        src={backgroundImage}
                        alt=""
                        fill
                        className="object-cover opacity-90"
                        unoptimized
                    />
                </div>
            )}

            {/* Contenido Dinámico */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center max-w-4xl flex flex-col items-center"
            >
                {title && (
                    <h1 className="text-6xl md:text-8xl font-serif leading-tight" style={{ color: titleColor }}>
                        {title}
                    </h1>
                )}

                {subtitle && (
                    <h2 className="text-3xl md:text-5xl font-sans tracking-[0.2em] uppercase mt-[-12px] mb-8" style={{ color: subtitleColor }}>
                        {subtitle}
                    </h2>
                )}

                {description && (
                    <p className="text-lg md:text-xl font-light mb-12 max-w-2xl leading-relaxed" style={{ color: descriptionColor }}>
                        {description}
                    </p>
                )}

                {/* Botones como Links */}
                <div className="flex flex-wrap justify-center gap-4">
                    {btn2Text && btn2Url && (
                        <Link href={btn2Url} passHref>
                            <motion.span
                                display="inline-block"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-4 rounded-xl font-bold tracking-wider uppercase shadow-sm cursor-pointer inline-block"
                                style={btn2Style}
                            >
                                {btn2Text}
                            </motion.span>
                        </Link>
                    )}

                    {btn1Text && btn1Url && (
                        <Link href={btn1Url} passHref>
                            <motion.span
                                display="inline-block"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-4 rounded-xl font-bold tracking-wider uppercase shadow-lg shadow-blue-500/10 cursor-pointer inline-block"
                                style={btn1Style}
                            >
                                {btn1Text}
                            </motion.span>
                        </Link>
                    )}
                </div>
            </motion.div>
        </section>
    );
}