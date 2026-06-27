"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

const Hero = ({ assets = [] }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();

        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const nextStep = useCallback(() => {
        setIndex((prev) => (prev + 1) % assets.length);
    }, [assets.length]);

    const prevStep = useCallback(() => {
        setIndex((prev) => (prev - 1 + assets.length) % assets.length);
    }, [assets.length]);

    useEffect(() => {
        if (assets.length <= 1 || isPaused) return;

        const timer = setInterval(nextStep, 3000);

        return () => clearInterval(timer);
    }, [assets.length, isPaused, nextStep, index]);

    const handleManualChange = (newIndex) => {
        setIndex(newIndex);
        setIsPaused(true); // Pausar al interactuar manualmente
    };

    const currentAsset = assets[index];

    if (!assets || assets.length === 0) return null;

    return (
        <section
            className="relative w-full overflow-hidden bg-black group"
            style={{ paddingBottom: '36.46%' }}

            //className="relative w-full aspect-[2400/900] min-h-[400px] overflow-hidden bg-black group"
            // style={{ boxShadow: '0px 10px 10px 5px #00000040' }}
        >
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentAsset?.src}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full"
                    >
                        {currentAsset?.type === "video" ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                                src={currentAsset.src}
                            />
                        ) : (
                            <Image
                                src={
                                    isMobile
                                        ? currentAsset.mobileSrc || currentAsset.desktopSrc
                                        : currentAsset.desktopSrc
                                }
                                alt={currentAsset.title || "Banner"}
                                fill
                                unoptimized
                                priority
                                className="object-cover"
                                sizes="100vw"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
                {/* <div className="absolute inset-0 bg-black/30" /> */}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${index}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="pointer-events-auto"
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg" style={{ textShadow: "0px 0px 20px black" }}>
                            {currentAsset.title}
                        </h1>
                        <p className="text-xs md:text-lg mt-2 font-black max-w-xl mx-auto italic" style={{ textShadow: "0px 0px 20px black" }}>
                            {currentAsset.subtitle}
                        </p>

                        <div className="flex flex-col md:flex-row gap-3 mt-6 md:mt-10 w-full justify-center">
                            {currentAsset.ctaText && (
                                <a href={currentAsset.ctaLink} className="bg-white text-black px-8 py-2 rounded-md font-medium hover:bg-gray-200 transition-all text-sm">
                                    {currentAsset.ctaText}
                                </a>
                            )}
                            {currentAsset.ctaText2 && (
                                <a href={currentAsset.ctaLink2} className="bg-black/40 text-white border border-white/50 px-8 py-2 rounded-md font-medium backdrop-blur-sm hover:bg-white/10 transition-all text-sm">
                                    {currentAsset.ctaText2}
                                </a>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {assets.length > 1 && (
                <>
                    <button
                        onClick={prevStep}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronLeft size={48} strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={nextStep}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronRight size={48} strokeWidth={1.5} />
                    </button>
                </>
            )}

            {assets.length > 1 && (
                <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="flex gap-2 items-center bg-black/20 backdrop-blur-xl p-2 px-4 rounded-full border border-white/10 shadow-2xl">
                        <div className="flex gap-2 mr-2 border-r border-white/20 pr-4">
                            {assets.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleManualChange(i)}
                                    className={`h-1.5 transition-all duration-300 rounded-full ${index === i ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Hero;