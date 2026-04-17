import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandsCarousel from '@/components/BrandsCarousel';
import CountInfo from '@/components/CountInfo';
import LayerSlider from '@/components/LayerSlider';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import PoweredBy from '@/components/PoweredBy';

const misBanners = [
  {
    type: 'image',
    desktopSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner1.jpg',
    mobileSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner1_r.jpg',
  },
  {
    type: 'image',
    desktopSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner2.jpg',
    mobileSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner2_r.jpg',
  },
  {
    type: 'image',
    desktopSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner3.jpg',
    mobileSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner3_r.jpg',
  },
  {
    type: 'image',
    desktopSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner4.jpg',
    mobileSrc: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776264267/banner4_r.jpg',
  }
];

const data = [
  {
    value: 30,
    symbol: 'años',
    valueType: 'suffix',
    text: 'de experiencia',
    valueColor: '#ffffff',
    textColor: '#60a5fa',
  },
  {
    value: 30000,
    symbol: '+',
    valueType: 'prefix',
    text: 'Productos disponibles',
  },
  {
    value: 8000,
    symbol: '+',
    valueType: 'prefix',
    text: 'Clientes',
  },
  {
    value: 50,
    symbol: '+',
    valueType: 'prefix',
    text: 'Marcas de renombre',
  },
];

const slides = [
  {
    id: "banner-1",
    title: "TE ACOMPAÑAMOS",
    layers: [
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436357/background_f9qh8k.png', delay: 0, type: 'zoomIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436540/derecha_mjoz4a.png', delay: 0.25, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436558/izquierda_ej5fb8.png', delay: 0.35, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436539/text_mdmocs.png', delay: 0.45, type: 'blurIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776378126/punto1.png', delay: 0.5, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776378126/punto2.png', delay: 0.55, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776378127/punto3.png', delay: 0.6, type: 'fadeInRight' },
    ],
  },
  {
    id: "banner-2",
    title: "TE VISITAMOS",
    layers: [
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436357/background_f9qh8k.png', delay: 0, type: 'zoomIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776438174/derecha_lt59nk.png', delay: 0.25, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776438189/izquierda_fcur3n.png', delay: 0.25, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776438173/text_qcssv6.png', delay: 0.5, type: 'blurIn' },
    ],
  },
  {
    id: "banner-3",
    title: "TE ASESORAMOS",
    layers: [
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436357/background_f9qh8k.png', delay: 0, type: 'zoomIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439581/derecha_abbi1v.png', delay: 0.25, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439589/izquierda_sb6vh1.png', delay: 0.25, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439587/text_xcbmq7.png', delay: 0.5, type: 'blurIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439583/punto1_ergcti.png', delay: 1.6, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439580/linea1_ehyb4k.png', delay: 1.64, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439584/punto2_iq1b91.png', delay: 1.68, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439582/linea2_zmiz0m.png', delay: 1.72, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776439585/punto3_dxm8y7.png', delay: 1.76, type: 'fadeInLeft' },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero assets={misBanners} />
      <BrandsCarousel />
      <CountInfo bgColor="#001564" items={data} />
      <section
        className="w-full py-5 md:py-6 bg-gradient-to-r from-[#3d88f6] from-[1%] to-[#0008fe]"
      >
        <div className="flex flex-row items-center justify-center gap-4 md:gap-20 lg:gap-60 py-6">
          <button className="bg-[#e8eef9] text-[#1a1a1a] font-medium px-10 py-3 rounded-2xl shadow-sm hover:bg-[#dbeafe] transition-all duration-300 min-w-[160px]">
            Registro
          </button>
          <button className="bg-[#e8eef9] text-[#1a1a1a] font-medium px-10 py-3 rounded-2xl shadow-sm hover:bg-[#dbeafe] transition-all duration-300 min-w-[160px]">
            Iniciar Sesión
          </button>
        </div>
      </section>
      {/* #FBFCFD */}
      <LayerSlider slides={slides} header="CANALES DE VENTA" />
      <CallToAction
        bgType="image"
        backgroundImage="https://res.cloudinary.com/dpqlilgy6/image/upload/v1776448695/Landing_principal-12.jpg_psjbgl.jpg"
        title="Avanzando"
        subtitle="JUNTOS 2026"
        description="Tu aliado para hacer crecer tu negocio en el cuidado de la piel."
        descriptionColor="#616160"

        // Solo pasas los strings de las rutas
        btn1Text="INICIAR SESIÓN"
        btn1Url="/login"
      />
      <Footer />
      <PoweredBy />
    </div>
  );
}