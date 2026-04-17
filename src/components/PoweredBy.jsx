'use client';

import { motion } from 'framer-motion';

export default function PoweredBy() {
    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="pointer-events-auto bg-white/90 backdrop-blur-md border-t border-x border-gray-200 px-8 py-2 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] group"
            >
                <p className="text-[11px] tracking-[0.2em] uppercase font-medium text-gray-500">
                    Powered by{' '}
                    <span className="text-[#1a2b56] font-bold group-hover:text-blue-600 transition-colors">
                        Marcos Beltran
                    </span>
                </p>
            </motion.div>
        </div>
    );
}