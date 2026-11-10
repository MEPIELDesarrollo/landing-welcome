'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const PERFILES = [
    { name: 'Médico', href: '/pre-registro?perfil=medicos' },
    { name: 'Farmacia', href: '/pre-registro?perfil=farmacia' },
    { name: 'Ecommerce', href: '/pre-registro?perfil=ecommerce' },
];

const BUTTON_CLASS = `
    inline-flex items-center justify-center gap-2 cursor-pointer
    font-poppins font-semibold text-white tracking-wide whitespace-nowrap
    !text-[1.3rem] sm:!text-[1.5rem]
    !mb-0 px-9 py-3 sm:px-11 sm:py-3.5 !rounded-[14px]
    bg-gradient-to-r from-[#8f0056] via-[#cb007b] to-[#e85fa8]
    shadow-lg shadow-[#cb007b]/30
    hover:from-[#7a0049] hover:via-[#b3006c] hover:to-[#d94f97]
    hover:shadow-xl hover:-translate-y-0.5
    transition-all duration-300
`;

export default function Distro() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <section
            className="distro flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 lg:py-32"
            style={{
                backgroundImage: `
                url('https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777394701/shadow_i3r4vd.png'),
                url('https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1778079397/Recurso_rayas_l3bjwq.png')
                `,
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundPosition: 'top center, top',
                backgroundSize: 'contain, cover',
            }}
        >
            {/* Título principal */}

            <h1 className="fuente-montserrat-bold text-[#283776] max-w-4xl">
                Distribuimos confianza, salud y crecimiento para tu negocio.
            </h1>
                
            {/* Subtítulo */}
            <p className="text-base max-w-4xl text-[#283776] fuente-montserrat-regular">
                Accede al mejor y más amplio catálogo de productos dermatológicos, con atención personalizada y entregas en todo México.
            </p>

            {/* Botones */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col items-center mt-[-20px] sm:mt-0">
                    <div ref={menuRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                            aria-controls="distro-pre-registro-menu"
                            className={BUTTON_CLASS}
                        >
                            PRE-REGISTRO
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Dropdown de perfiles (pegado al botón) */}
                        <div
                            id="distro-pre-registro-menu"
                            className={`
                                absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 origin-top
                                flex flex-col gap-1 rounded-2xl bg-white p-2
                                shadow-xl shadow-[#cb007b]/15 ring-1 ring-[#cb007b]/10
                                transition-all duration-200
                                ${isOpen
                                    ? 'visible scale-100 opacity-100'
                                    : 'invisible scale-95 opacity-0 pointer-events-none'
                                }
                            `}
                        >
                            {PERFILES.map((perfil) => (
                                <Link
                                    key={perfil.name}
                                    href={perfil.href}
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl px-4 py-2.5 text-left font-poppins text-[15px] font-medium text-[#283776] transition-colors hover:bg-[#fdf2f8] hover:text-[#cb007b]"
                                >
                                    {perfil.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <span className="mt-2 text-center max-w-md">
                        Crea tu cuenta y <br className='block sm:hidden'/> 
                        potencia tu negocio <br className='block sm:hidden'/> 
                        dermatológico
                    </span>
                </div>

                <div className="flex flex-col items-center mb-[2em] sm:mb-0">
                    <Link
                        key='online_store'
                        href='https://tienda.mepieldistribuidores.com.mx/mi-cuenta/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className={BUTTON_CLASS}
                    >
                        TIENDA EN LÍNEA
                    </Link>
                    <span className="mt-2 text-center max-w-md">
                        Accede a nuestro <br className='block sm:hidden'/>
                        catálogo y promociones <br className='block sm:hidden'/>
                        exclusivas
                    </span>
                </div>
            </div>
        </section>
    );
}
