"use client";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Nosotros', type: 'text' },
        { name: 'Marcas', type: 'text' },
        { name: 'Category', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto/v1776192480/category_b90wko.png' },
        { name: 'Masterclass', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto/v1776192480/masterclass_zo2cps.png' },
        { name: 'Simposio', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776200006/simposio_zxf8sx.png' },
    ];

    return (
        <nav
            className="w-full h-32 lg:h-30 flex items-center px-6 lg:px-8 relative z-50"
            style={{
                background: `linear-gradient(to right, 
                    var(--color-sky-pure) 0%, 
                    var(--color-sky-pure) 30%, 
                    var(--color-sky-white) 35%,
                    var(--color-sky-pale) 45%, 
                    var(--color-sky-light) 65%,
                    var(--color-sky-pale) 90%,
                    var(--color-sky-white) 95%,
                    var(--color-sky-pure) 100%)`
            }}
        >
            <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">

                {/* LOGO */}
                <div className="flex-shrink-0">
                    <img
                        src="https://res.cloudinary.com/dpqlilgy6/image/upload/v1776192002/logo.png"
                        alt="Logo"
                        className="h-24 lg:h-32 w-auto object-contain"
                    />
                </div>

                {/* MOBILE BUTTON */}
                <button className="lg:hidden p-2 text-main-dark" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className={`
                                    bg-nav-button/90 button-shadow backdrop-blur-sm rounded-full 
                                    cursor-pointer hover:bg-white transition-all flex items-center justify-center 
                                    h-13 overflow-hidden
                                    ${item.type === 'image' ? 'w-[135px] px-2' : 'px-10'}
                                `}
                            >
                                {item.type === 'text' ? (
                                    <span className="text-slate-800 font-medium text-[15px]">{item.name}</span>
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-contain pointer-events-none"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <button className="bg-[#2d3a7d] text-white px-4 py-3 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-main-blue transition-all whitespace-nowrap">
                        Tienda en línea
                    </button>
                </div>
            </div>
            {/* MOBILE MENU */}
            <div className={`
                fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-6 transition-transform duration-300 lg:hidden
                ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}>
                <button className="absolute top-10 right-8 text-main-dark" onClick={() => setIsOpen(false)}>
                    <X size={40} />
                </button>
                {navItems.map((item) => (
                    <a key={item.name} href="#" className="text-xl font-bold text-slate-800 uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                        {item.name}
                    </a>
                ))}
                <button className="mt-6 bg-[#2d3a7d] text-white px-12 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl">
                    Tienda en línea
                </button>
            </div>
        </nav>
    );
}