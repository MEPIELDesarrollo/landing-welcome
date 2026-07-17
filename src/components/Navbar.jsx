"use client";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
 //   const [showNavbar, setShowNavbar] = useState(true);

    const navItems = [
        { name: 'Nosotros', href: '/nosotros', type: 'text' },
        { name: 'Marcas', href: '/marcas', type: 'text' },
     // { name: 'Category', href: '/category', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777384808/category_crop_28149c.png' },
        { name: 'Masterclass', href: 'https://masterclass.mepieldistribuidores.com.mx/', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777384971/masterclass_crop_3772e5.png' },
     // { name: 'Simposio', href: '/simposio', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777384929/simposio_crop_f8bb8f.png' },
       // { nameMobile: "Tienda en línea", href: "https://mepieldistribuidores.com.mx/mi-cuenta/", type: "text" },
    ];

    const navItemsShop = [
       
        { nameMobile: "Tienda en línea", href: "https://mepieldistribuidores.com.mx/mi-cuenta/", type: "text" },
    ];
/*
    useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Si baja
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNavbar(false);
        } 
        // Si sube
        else {
            setShowNavbar(true);
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);*/

    return (
        <nav
            // CAMBIOS AQUÍ: sticky, top-0 y z-index alto
             className={`
        fixed top-0 left-0
        w-full h-32 lg:h-30
        flex items-center
        px-6 lg:px-8
        z-[100]
        shadow-md
        
    `}
    /*transition-transform duration-300
        ${showNavbar ? 'translate-y-0' : '-translate-y-full'}*/

            style={{
                background: `linear-gradient(to right, 
                    var(--color-sky-pure) 0%, 
                    var(--color-sky-pure) 30%, 
                    var(--color-sky-white) 35%,
                    var(--color-sky-pale) 45%, 
                    var(--color-sky-light) 65%,
                    var(--color-sky-pale) 90%,
                    var(--color-sky-white) 100%,
                    var(--color-sky-pure) 100%)`
            }}
        >
            <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
                {/* LOGO */}
                <Link href="/" className="flex-shrink-0">
                    <img
                        //src="https://res.cloudinary.com/dpqlilgy6/image/upload/v1776192002/logo.png"
                       src='/images/MEPIEL-Distribuidores2.png'
                        alt="Logo"
                        //className="h-34 lg:h-48 w-auto object-contain"
                        className="h-20 lg:h-25 w-auto object-contain"

                    />
                </Link>

                {/* MOBILE BUTTON */}
                <button
                    className="lg:hidden p-2 text-main-dark"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                target={item.name === 'Masterclass' ? '_blank' : '_self'}
                                rel={item.name === 'Masterclass' ? 'noopener noreferrer' : undefined}
                                className={`
                                    bg-nav-button/90 button-shadow backdrop-blur-sm rounded-full 
                                    cursor-pointer hover:bg-white transition-all flex items-center justify-center 
                                    h-9 overflow-hidden
                                    ${item.type === 'image' ? 'w-[125px] px-4' : 'px-10'}
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
                            </Link>
                        ))}
                    </div>
                    <Link
                        key='online_store'
                        href='https://mepieldistribuidores.com.mx/mi-cuenta/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className="bg-[#283776] text-white px-3 py-1.5 rounded-full font-semibold text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#2d3a7d] transition-all whitespace-nowrap"
                    >
                        <span>Tienda en línea</span>
                    </Link>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div className={`
                fixed inset-0 bg-white z-[110] flex flex-col items-center justify-center gap-6 transition-transform duration-300 lg:hidden
                ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}>
                <button className="absolute top-10 right-8 text-main-dark" onClick={() => setIsOpen(false)}>
                    <X size={40} />
                </button>
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-xl font-bold text-slate-800 uppercase tracking-widest"
                        onClick={() => setIsOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
                {navItemsShop.map((item)=>{
                    if(item.nameMobile){
                        return(
                            <Link
                                key={item.nameMobile}
                                href={item.href}
                                 target='_blank'
                                rel='noopener noreferrer'
                                className="text-xl font-bold text-slate-800 uppercase tracking-widest"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.nameMobile}
                            </Link>
                        )
                    }
                })}
            </div>
        </nav>
    );
}