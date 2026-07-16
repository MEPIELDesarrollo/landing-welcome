import Link from 'next/link';

export default function Distro() {
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
                    <Link
                        key='online_store'
                        //href='https://mepieldistribuidores.com.mx/'
                        href={'/pre-registro'}
                        className="font-poppins text-[#292c35] px-8 py-2 bg-gray-200 shadow hover:bg-gray-300 transition"
                        style={{ borderRadius: '14px', padding: '1em 3em' }}
                    >
                        <span>PRE-REGISTRO</span>
                    </Link>
                    <span className="mt-2 text-center max-w-md">
                        Crea tu cuenta y <br className='block sm:hidden'/> 
                        potencia tu negocio <br className='block sm:hidden'/> 
                        dermatológico
                    </span>
                </div>

                <div className="flex flex-col items-center mb-[2em] sm:mb-0">
                    <Link
                        key='online_store'
                        href='https://mepieldistribuidores.com.mx/mi-cuenta/'
                        className="font-poppins text-[#292c35] px-8 py-2 bg-gray-200 shadow hover:bg-gray-300 transition"
                        style={{ borderRadius: '14px', padding: '1em 3em' }}
                    >
                        <span>TIENDA EN LÍNEA</span>
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