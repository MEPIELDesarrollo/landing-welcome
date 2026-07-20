import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandsCarousel from '@/components/BrandsCarousel';
import CountInfo from '@/components/CountInfo';
import Distro from '@/components/Distro';
import LayerSlider from '@/components/LayerSlider';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

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
    textColor: '#4F97ED',
  },
  {
    value: 30000,
    symbol: '+',
    valueType: 'prefix',
    text: 'Productos disponibles',
    textColor: '#4F97ED',
  },
  {
    value: 8000,
    symbol: '+',
    valueType: 'prefix',
    text: 'Clientes',
    textColor: '#4F97ED',
  },
  {
    value: 50,
    symbol: '+',
    valueType: 'prefix',
    text: 'Marcas de renombre',
    textColor: '#4F97ED',
  },
];

const slides = [
  {
    id: "banner-1",
    title: "TE ACOMPAÑAMOS",
    mobileLayout: "acompanamos",
    layers: [
      // { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436357/background_f9qh8k.png', delay: 0, type: 'zoomIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776436540/derecha_mjoz4a.png', delay: 0.25, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776436558/izquierda_ej5fb8.png', delay: 0.35, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776436539/text_mdmocs.png', delay: 0.45, type: 'blurIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776378126/punto1.png', delay: 0.5, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776378126/punto2.png', delay: 0.55, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776378127/punto3.png', delay: 0.6, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777920851/circulos_bphqjv.png', delay: 0.63, type: 'blurIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1777392799/robot.final_cjjzgf.gif', delay: 0.75, type: 'zoomIn' },
      // { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1777323835/ffea9c87-3d04-40fe-89e6-77a9c9567133_hwl4wm.gif', delay: 0.68, type: 'zoomIn' }
      {mobilesrc : 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1783980837/Elementos_Landing_Movil_Mesa_de_trabajo_1_d0s4mz.png'},
      {mobilesrc : 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1783980837/Elementos_Landing_Movil-03_vqlfws.png'},
      {mobilesrc : 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1783980837/Logo_mepielconnect_Mesa_de_trabajo_1_1_hykoxa.png'},
    ],
  },
  {
    id: "banner-2",
    title: "TE VISITAMOS",
     mobileLayout: "visitamos",
    layers: [
      // { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436357/background_f9qh8k.png', delay: 0, type: 'zoomIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776438174/derecha_lt59nk.png', delay: 0.25, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776438189/izquierda_fcur3n.png', delay: 0.25, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776438173/text_qcssv6.png', delay: 0.5, type: 'blurIn' },
      {mobilesrc : 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1783980837/Elementos_Landing_Movil-05_o2mz99.png'}
    ],
  },
  {
    id: "banner-3",
    title: "TE ASESORAMOS",
    mobileLayout: "asesoramos",
    layers: [
      // { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776436357/background_f9qh8k.png', delay: 0, type: 'zoomIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439581/derecha_abbi1v.png', delay: 0.25, type: 'fadeInRight' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439589/izquierda_sb6vh1.png', delay: 0.25, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439587/text_xcbmq7.png', delay: 0.5, type: 'blurIn' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439583/punto1_ergcti.png', delay: 1.6, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439580/linea1_ehyb4k.png', delay: 1.64, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439584/punto2_iq1b91.png', delay: 1.68, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439582/linea2_zmiz0m.png', delay: 1.72, type: 'fadeInLeft' },
      { src: 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776439585/punto3_dxm8y7.png', delay: 1.76, type: 'fadeInLeft' },
      {mobilesrc : 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1783980837/Elementos_Landing_Movil-02_aqtdir.png'},
      { mobilesrc : 'https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1783980837/Elementos_Landing_Movil-04_az7h3y.png'},
     
      

    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen pt-32 lg:pt-30">
      <Navbar />
      <Hero assets={misBanners} />
      <BrandsCarousel />
      <CountInfo bgColor="#001564" items={data} />
      <Distro />
      {/* #FBFCFD */}
      <LayerSlider slides={slides} header="CANALES DE VENTA" />
      <CallToAction
        bgType="image"
        backgroundImage="https://res.cloudinary.com/dpqlilgy6/image/upload/f_auto,q_auto/v1776448695/Landing_principal-12.jpg_psjbgl.jpg"
        title=""
        subtitle=""
        description="Tu aliado para hacer crecer tu negocio en el cuidado de la piel."
        descriptionColor="#283776"
        finalDescription="Accede a nuestro catálogo y promociones exclusivas"
        btn1Text="INICIAR SESIÓN"
        btn1Url="https://tienda.mepieldistribuidores.com.mx/mi-cuenta/"
      />
      <Footer />
    </div>
  );
}