// components/HeroSection.jsx
export default function Distro() {
    return (
        <section
            className="distro flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 lg:py-32"
            style={{
                backgroundImage: `
                url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1777394701/shadow_i3r4vd.png'),
                url('https://res.cloudinary.com/dpqlilgy6/image/upload/v1778079397/Recurso_rayas_l3bjwq.png')
                `,
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundPosition: 'top center, top',
                backgroundSize: 'contain, cover',
            }}
        >
            {/* Título principal */}
            <h1 className="font-bold text-[#001564] max-w-4xl">
                Distribuimos confianza, salud y crecimiento para tu negocio.
            </h1>

            {/* Subtítulo */}
            <p className="text-base max-w-5xl">
                Accede al mejor y más amplio catálogo de productos dermatológicos, con atención personalizada y entregas en todo México.
            </p>

            {/* Botones */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col items-center">
                    <button className="font-poppins text-[#292c35] px-8 py-2 bg-gray-200 shadow hover:bg-gray-300 transition">
                        REGISTRO
                    </button>
                    <span className="mt-2 text-center max-w-md">
                        Crea tu cuenta y potencia tu negocio dermatológico
                    </span>
                </div>

                <div className="flex flex-col items-center">
                    <button className="font-poppins text-[#292c35] px-8 py-2 bg-gray-200 shadow hover:bg-gray-300 transition">
                        INICIAR SESIÓN
                    </button>
                    <span className="mt-2 text-center max-w-md">
                        Accede a nuestro catálogo y promociones exclusivas
                    </span>
                </div>
            </div>
        </section>
    );
}