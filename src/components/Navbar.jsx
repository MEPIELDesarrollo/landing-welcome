"use client";
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function DesktopNavLink({ item }) {
    const isExternal = item.name === 'Masterclass';

    return (
        <Link
            href={item.href}
            target={isExternal ? '_blank' : '_self'}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-haspopup={item.children ? 'true' : undefined}
            className={`
                bg-nav-button/90 button-shadow backdrop-blur-sm rounded-full 
                cursor-pointer hover:bg-white transition-all flex items-center justify-center 
                h-9 overflow-hidden
                ${item.type === 'image' ? 'w-[125px] px-4' : item.children ? 'px-6 gap-1.5' : 'px-10'}
            `}
        >
            {item.type === 'text' ? (
                <span className="text-slate-800 font-medium text-[15px] whitespace-nowrap">{item.name}</span>
            ) : (
                <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-contain pointer-events-none"
                />
            )}
            {item.children && (
                <ChevronDown
                    size={16}
                    className="text-slate-800 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                />
            )}
        </Link>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

    const closeMobileMenu = () => {
        setIsOpen(false);
        setOpenMobileSubmenu(null);
    };
 //   const [showNavbar, setShowNavbar] = useState(true);

    const navItems = [
        { name: 'Inicio', href: '/', type: 'text' },
        { name: 'Nosotros', href: '/nosotros', type: 'text' },
        { name: 'Marcas', href: '/marcas', type: 'text' },
        {
            name: 'Pre-registro',
            href: '/pre-registro',
            type: 'text',
            children: [
                { name: 'Médico', href: '/pre-registro?perfil=medicos' },
                { name: 'Farmacia', href: '/pre-registro?perfil=farmacia' },
                { name: 'Ecommerce', href: '/pre-registro?perfil=ecommerce' },
            ],
        },
     // { name: 'Category', href: '/category', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777384808/category_crop_28149c.png' },
        { name: 'Masterclass', href: 'https://masterclass.mepieldistribuidores.com.mx/', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777384971/masterclass_crop_3772e5.png' },
        { name: 'Simposio', href: 'https://simposio.mepieldistribuidores.com.mx/', type: 'image', url: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777384929/simposio_crop_f8bb8f.png' },
       // { nameMobile: "Tienda en línea", href: "https://mepieldistribuidores.com.mx/mi-cuenta/", type: "text" },
    ];

    const navItemsShop = [
       
        { nameMobile: "Tienda en línea", href: "https://tienda.mepieldistribuidores.com.mx/mi-cuenta/", type: "text" },
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
                <Link href="https://www.mepieldistribuidores.com.mx" className="flex-shrink-0">
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
                    onClick={() => (isOpen ? closeMobileMenu() : setIsOpen(true))}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        {navItems.map((item) => (
                            <div key={item.name} className={item.children ? 'relative group' : undefined}>
                                <DesktopNavLink item={item} />
                                {item.children && (
                                    <div
                                        className="absolute left-1/2 top-full z-[120] -translate-x-1/2 translate-y-1 pt-3 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                                    >
                                        <div className="flex w-48 flex-col gap-1 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="rounded-xl px-4 py-2 text-left text-[15px] font-medium text-slate-800 transition-colors hover:bg-nav-button"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <Link
                        key='online_store'
                        href='https://tienda.mepieldistribuidores.com.mx/mi-cuenta/'
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
                fixed inset-0 bg-white z-[110] flex flex-col items-center justify-start gap-5 pt-28 pb-10 overflow-y-auto transition-transform duration-300 lg:hidden
                ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}>
                <button className="absolute top-10 right-8 text-main-dark" onClick={closeMobileMenu} aria-label="Cerrar menú">
                    <X size={40} />
                </button>
                {navItems.map((item) => {
                    const isSubmenuOpen = openMobileSubmenu === item.name;
                    const submenuId = `mobile-submenu-${item.name.toLowerCase()}`;

                    return (
                        <div key={item.name} className="flex w-full flex-col items-center gap-2">
                            {item.children ? (
                                <button
                                    type="button"
                                    onClick={() => setOpenMobileSubmenu(isSubmenuOpen ? null : item.name)}
                                    aria-expanded={isSubmenuOpen}
                                    aria-controls={submenuId}
                                    className="flex items-center gap-2 text-xl font-bold text-slate-800 uppercase tracking-widest"
                                >
                                    {item.name}
                                    <ChevronDown
                                        size={22}
                                        className={`transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-xl font-bold text-slate-800 uppercase tracking-widest"
                                    onClick={closeMobileMenu}
                                >
                                    {item.name}
                                </Link>
                            )}

                            {item.children && (
                                <div
                                    id={submenuId}
                                    className={`
                                        w-full flex-col items-center gap-2 overflow-hidden transition-all duration-200
                                        ${isSubmenuOpen ? 'flex' : 'hidden'}
                                    `}
                                >
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            className="rounded-full bg-nav-button/90 px-5 py-1.5 text-sm font-semibold text-slate-700 uppercase tracking-[0.15em]"
                                            onClick={closeMobileMenu}
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
                {navItemsShop.map((item)=>{
                    if(item.nameMobile){
                        return(
                            <Link
                                key={item.nameMobile}
                                href={item.href}
                                 target='_blank'
                                rel='noopener noreferrer'
                                className="text-xl font-bold text-slate-800 uppercase tracking-widest"
                                onClick={closeMobileMenu}
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