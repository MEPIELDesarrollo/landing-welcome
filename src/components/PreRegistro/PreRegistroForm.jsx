'use client';

import { useState } from 'react';
import MedicosForm, { NavButtons } from './MedicosForm';
import FarmaciaForm from './FarmaciaForm';
import EcommerceForm from './EcommerceForm';

const TABS = [
  {
    id: 'medicos',
    label: ['FORMULARIO', 'DE MÉDICOS'],
    icon: { src: '/images/Formulario_de_Medicos.png', alt: 'Formulario de Medicos' },
  },
  {
    id: 'farmacia',
    label: ['SOY FARMACIA'],
    icon: { src: '/images/Soy_Farmacia.png', alt: 'Soy Farmacia' },
  },
  {
    id: 'ecommerce',
    label: ['SOY ECOMMERCE'],
    icon: { src: '/images/Soy_Ecommerce.png', alt: 'Soy Ecommerce' },
  },
];

const TAB_COLORS = {
  medicos:   { bg: 'bg-[#394aa6]', text: 'text-white', inactive: 'bg-gradient-to-r from-[#6ec6e6] to-[#394aa6]', formBg: 'from-[#394aa6] via-[#4a74bc] to-[#6ec6e6]' },
  farmacia:  { bg: 'bg-[#cc007b]', text: 'text-white', inactive: 'bg-[#cc007b]', formBg: 'from-[#cc007b] via-[#cc007b] to-[#cc007b]' },
  ecommerce: { bg: 'bg-[#45519d]', text: 'text-white', inactive: 'bg-[#45519d]', formBg: 'from-[#45519d] via-[#45519d] to-[#45519d]'  },
};

const FORM_GRADIENT_DIR = {
  medicos:   'bg-gradient-to-b',
  farmacia:  'bg-gradient-to-br',
  ecommerce: 'bg-gradient-to-b',
};

export default function PreRegistroForm() {
  const [activeTab, setActiveTab] = useState('medicos');
  const [navProps, setNavProps] = useState(null); // recibe step info desde MedicosForm
  const colors   = TAB_COLORS[activeTab];
  const formBg   = colors.formBg;
  const gradDir  = FORM_GRADIENT_DIR[activeTab];


// Función para forzar el submit del formulario que está dentro de MedicosForm
  const triggerExternalSubmit = () => {
    const hiddenSubmitBtn = document.getElementById('hidden-form-submit-btn');
    if (hiddenSubmitBtn) {
      hiddenSubmitBtn.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-40 pb-10 px-4 relative overflow-x-hidden">

      {/* Banner de Fondo Fijo Absoluto */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-91 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/banner.png')" }}
      />

      {/* Title */}
      <h1 className="text-[#283876] text-7xl fuente-montserrat-semiboldTitle tracking-widest mb-10 uppercase relative z-10 mt-10">
        Pre-Registro
      </h1>

     {/* ── Wrapper relativo principal ── */}
<div className="w-full max-w-5xl relative z-10 flex flex-col items-center px-2">
  {/* CONTENEDOR DE TABS (Estilo Navegador responsivo) */}
  {/* Explicación: Cambiamos max-w-2xl a w-full en móviles para aprovechar toda la pantalla */}
  <div className="w-full max-w-2xl relative flex items-end gap-0 px-1 sm:px-2 z-20">          
    {TABS.map((tab) => {
      const isActive = activeTab === tab.id;
      const currentTabColors = TAB_COLORS[tab.id];
      
      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3
            px-1 sm:px-4 font-bold text-[10px] sm:text-xs tracking-wide transition-all duration-300 
            cursor-pointer rounded-t-[1rem] md:rounded-t-[1.5rem] relative
            ${isActive
              ? `${currentTabColors.bg} ${colors.text} h-20 md:h-28 pt-1 md:pt-2 shadow-[0_-4px_15px_rgba(0,0,0,0.15)] z-30`
              : `${currentTabColors.inactive} ${colors.text} h-14 md:h-15 opacity-100 hover:opacity-75 brightness-100 shadow-inner z-10 mt-6 mb-12`
            }
          `}
          style={isActive ? { marginBottom: '-1px' } : {}}
        >
          {/* Contenedor del Icono (Hacemos que el icono se adapte al tamaño de pantalla) */}
          <span className={`shrink-0 transition-all duration-300 ${isActive ? 'brightness-0 invert' : 'brightness-0 invert opacity-100'}`}>
            <img
              src={tab.icon.src}
              alt={tab.icon.alt}
              className={`object-contain transition-all duration-300 
                ${isActive 
                  ? 'w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14' 
                  : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
                }
              `}
            />
          </span>

          {/* Texto descriptivo de la pestaña */}
          {/* Explicación: 'hidden sm:flex' oculta el texto en pantallas muy pequeñas si la pestaña no está activa, evitando colisiones */}
          <span className={`
            flex-col items-center md:items-start leading-none md:leading-tight fuente-montserrat-regular transition-all duration-300 
            ${isActive 
              ? 'flex text-[10px] sm:text-[14px] opacity-100 mt-0 md:mb-5' 
              : 'hidden sm:flex text-[13px] mt-2 opacity-100'
            }
          `}>
            {tab.label.map((line, i) => (
              <span key={i} className="block whitespace-nowrap text-center md:text-left">{line}</span>
            ))}

            {/* Flecha indicadora hacia abajo (solo si está activo y en pantallas grandes) */}
          {isActive && (
            <span className="md: left-1/2 -translate-x-1/2 md:ml-11 transition-transform duration-300 animate-bounce hidden md:block">
              <img src="/images/flecha_abajo.png" height="19" width="20" alt="flecha" />
            </span>
          )}
          </span>

          
        </button>
      );
    })}
  </div>


        {/* ── White backing con imagen de fondo ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-screen top-[84px] bottom-[-40px] shadow-[0_-15px_10px_-4px_rgba(0,0,0,0.15)] z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/ImagenFondoForm.png')" }}
          />
          <div className="absolute inset-0 bg-white/0" />
        </div>

        {/* FORM CARD (Se acopla y unifica perfectamente con la pestaña activa) */}
        <div className={`w-full max-w-4xl relative ${gradDir} ${formBg} shadow-2xl py-6 px-10 md:py-12 md:px-16 z-20 rounded-[12px] md:rounded-[2rem]`}        >

          {activeTab === 'medicos'   && <MedicosForm onStepChange={setNavProps} />}
          {activeTab === 'farmacia'  && <FarmaciaForm onStepChange={setNavProps} />}
          {activeTab === 'ecommerce' && <EcommerceForm onStepChange={setNavProps} />}
        </div>

        {/* ── NavButtons fuera del card ── */}
        {(activeTab === 'medicos' || activeTab === 'farmacia' || activeTab === 'ecommerce') && navProps && (
          <div className="w-full max-w-4xl relative z-30">
            {/* Integramos la acción de validación del formulario al presionar Continuar/Enviar */}
            <NavButtons {...navProps} disabled={navProps.disabled} onNext={triggerExternalSubmit} onSubmit={triggerExternalSubmit} />
          </div>
        )}

        {/* Footer contact */}
        <div className="relative z-20 py-8 text-center">
          <p className="text-sm text-gray-600 fuente-montserrat-regular">
            Si no perteneces a alguno de estos perfiles contáctanos por correo a{' '}
            <a href="mailto:contacto@mepiel.com.mx" className="fuente-montserrat-bold text-[#61615f]">
              <br/>✉ contacto@mepiel.com.mx
            </a>{' '}
            o al número {''}
            <a 
              href="https://api.whatsapp.com/send?phone=523329789143&text=Hola%2C%20me%20interesa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20pre-registro%2C%20por%20favor"
              target="_blank" 
              rel="noopener noreferrer"
              className="fuente-montserrat-bold text-[#61615f]"
            >
              <img src="/images/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4 inline-block mr-1 ml-1" />
              33 2978 9143
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}