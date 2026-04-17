'use client';

import Image from 'next/image';

const brands = [
    { name: 'ACM', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284319/ACM_gbzraw.png', link: 'https://mepieldistribuidores.com.mx/?s=acm&post_type=product' },
    { name: 'ADERMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284378/ADERMA_rvk189.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/pierre-fabre/aderma/' },
    { name: 'ADVAITA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284403/ADVAITA_pm4jot.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/advaita/' },
    { name: 'ALASTIN', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284423/ALASTI_ul2odq.png', link: 'https://mepieldistribuidores.com.mx/?s=alastin&post_type=product' },
    { name: 'APIVITA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284457/APIVITA_yfsvgj.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/puig/apivita/' },
    { name: 'ARMSTRONG', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284480/ARMSTRONG_vl2flr.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/armstrong/' },
    { name: 'AVENE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284499/AVENE_glzsih.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/pierre-fabre/avene/' },
    { name: 'BENZACARE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284552/BENZACARE_bzahqf.png', link: 'https://mepieldistribuidores.com.mx/?s=BENZACARE&post_type=product' },
    { name: 'BEXIDENT', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284574/BEXIDENT_rfodfp.png', link: 'https://mepieldistribuidores.com.mx/?s=BEXIDENT&post_type=product' },
    { name: 'BIODERMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284590/BIODERMA_ioqzre.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/naos/bioderma/' },
    { name: 'BIRETIX', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284613/BIRETIX_lkyudm.png', link: 'https://mepieldistribuidores.com.mx/?s=biretix&post_type=product' },
    { name: 'CANTABRIA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284633/CANTABRIA_t1asau.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/cantabria/' },
    { name: 'CELLPHARMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284654/CELLPHARMA_s8jaq2.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/cell-pharma/' },
    { name: 'CERAVE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284672/CERAVE_w6jced.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/loreal/cerave/' },
    { name: 'CETAPHIL', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284706/CETAPHIL_dki29c.png', link: 'https://mepieldistribuidores.com.mx/?s=CETAPHIL&post_type=product' },
    { name: 'DARROW', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284721/DARROW_ztw48c.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/pierre-fabre/darrow/' },
    { name: 'DS', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284741/DS_mv7aqk.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/ds/' },
    { name: 'DUCRAY', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284758/DUCRAY_rhvqgx.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/pierre-fabre/ducray/' },
    { name: 'ENDOCARE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284778/ENDOCARE_bn8zgl.png', link: 'https://mepieldistribuidores.com.mx/?s=endocare&post_type=product' },
    { name: 'ESTHEDERM', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284802/ESTHEDERM_wnpabz.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/naos/esthederm/' },
    { name: 'ETAT PUR', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284817/ETATPURE_enltma.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/naos/etat-pur/' },
    { name: 'EUCERIN', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284832/EUCERIN_xfpfpk.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/eucerin/' },
    { name: 'EUDERMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284848/EUDERMA_it6ckk.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/euderma/' },
    { name: 'FARMAPIEL', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284870/FARMAPIEL_wdrudq.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/farmapiel/' },
    { name: 'FEDELE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284892/FEDELE_ptgpk5.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/fedele/' },
    { name: 'GALDERMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284923/GALDERMA_jy9gux.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/galderma/' },
    { name: 'GENOVE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284940/GENOVE_tzmiby.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/genove/' },
    { name: 'GLENMARK', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284966/GLENMARK_mlpi3a.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/glenmark/' },
    { name: 'GSK', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284980/GSK_eewkdc.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/gsk/' },
    { name: 'HELIOCARE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776284999/HELIOCARE_ld2ecy.png', link: 'https://mepieldistribuidores.com.mx/?s=heliocare&post_type=product' },
    { name: 'HIDRISAGE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285015/HIDRASAGE_azsf7d.png', link: 'https://mepieldistribuidores.com.mx/?s=HIDRISAGE&post_type=product' },
    { name: 'IRALTONE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285044/IRALTONE_izxt5e.png', link: 'https://mepieldistribuidores.com.mx/?s=iraltone&post_type=product' },
    { name: 'ISDIN', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285061/ISDIN_vd0jy9.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/isdin/' },
    { name: 'ISISPHARMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285079/ISISPHARMA_lmofxu.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/isispharma/' },
    { name: 'ITALMEX', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285165/ITALMEX_w7wrun.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/italmex/' },
    { name: 'KORFF', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285191/KORFF-23_loxwqy.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/truca-import-export/' },
    { name: 'LA ROCHE POSAY', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285214/LRP_xgrwwa.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/loreal/la-roche-posay/' },
    { name: 'LEOPHARMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285237/LEO_td5omz.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/leo-pharma/' },
    { name: 'LOREAL', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776285265/LOREAL_bpyddw.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/loreal/' },
    { name: 'MARTIDERM', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286570/MARTIDERM_lc0oai.png', link: 'https://mepieldistribuidores.com.mx/?s=MARTIDERM&post_type=product' },
    { name: 'MEGALABS', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286606/MEGALABS_tsdfa2.png', link: 'https://mepieldistribuidores.com.mx/?s=MEGALABS&post_type=product' },
    { name: 'MUSTELA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286631/MUSTELA_tjzga7.png', link: 'https://mepieldistribuidores.com.mx/?s=MUSTELA&post_type=product' },
    { name: 'NAOS', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286650/NAOS_bmdiav.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/naos/' },
    { name: 'NEOSTRATA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286684/NEOSTRATA_pts4ih.png', link: 'https://mepieldistribuidores.com.mx/?s=NEOSTRATA&post_type=product' },
    { name: 'NOREVA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286723/NOREV_viuvgg.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/led/' },
    { name: 'PANALAB', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286751/PANALAB_qzyqbd.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/panalab/' },
    { name: 'PANTOGAR', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286771/PANTOGAR_spsde0.png', link: 'https://mepieldistribuidores.com.mx/?s=PANTOGAR+90+CAPS&post_type=product' },
    { name: 'PERSPIREX', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286819/PERSPIREX_i3ugf3.png', link: 'https://mepieldistribuidores.com.mx/?s=PERSPIREX&post_type=product' },
    { name: 'PIERRE FABRE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286838/PIERREFABRE_zak8bd.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/pierre-fabre/' },
    { name: 'PUIG', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286869/PUIG_pm1wqb.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/puig/' },
    { name: 'REMEXA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286898/REMEXA_fprxy3.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/remexa/' },
    { name: 'SESDERMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286924/SESDERMA_agkbmb.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/sesderma/' },
    { name: 'TOPICREM', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286951/TOPICREM_qu1p9j.png', link: 'https://mepieldistribuidores.com.mx/page/2/?s=TOPICREM&post_type=product' },
    { name: 'UMBRELLA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286971/UMBRELLA_shfdss.png', link: 'https://mepieldistribuidores.com.mx/?s=UMBRELLA&post_type=product' },
    { name: 'UPPHARMA', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776286997/UPPHARMA_twvdjg.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/up-pharma/' },
    { name: 'URIAGE', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776287011/URIAGE_zmjfz0.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/puig/uriage/' },
    { name: 'VICHY', logo: 'https://res.cloudinary.com/dpqlilgy6/image/upload/v1776287026/VICHY_ntyw4l.png', link: 'https://mepieldistribuidores.com.mx/categoria-producto/loreal/vichy/' },
];

export default function BrandsSection() {
    return (
        <section className="w-full bg-[#f5f5f5] overflow-hidden py-8 md:py-20 lg:py-20">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-3 md:gap-0">
                <div className="border border-gray-400 rounded-full leading-tight text-center px-10 py-2 md:pr-24 md:-mr-10">
                    <div className="text-gray-700 font-bold text-sm md:text-base lg:text-lg">
                        DISTRIBUIDORES
                    </div>
                    <div className="text-gray-400 font-semibold text-[10px] md:text-xs lg:text-sm">
                        DE MÁS DE
                    </div>
                </div>

                <div className="bg-gradient-to-r from-[#2f3f8f] to-[#5bc0de] text-white rounded-full font-extrabold px-5 py-1 md:px-8 md:py-2 md:-ml-6 text-2xl md:text-4xl lg:text-6xl">
                    50 MARCAS
                </div>
            </div>

            {/* CARRUSEL */}
            <div className="px-4 md:px-10 lg:px-20">
                <div className="relative overflow-hidden">

                    {/* fade izquierdo */}
                    <div className="absolute left-0 top-0 h-full w-12 md:w-16 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5] to-transparent z-10" />

                    {/* fade derecho */}
                    <div className="absolute right-0 top-0 h-full w-12 md:w-16 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5] to-transparent z-10" />

                    <div className="flex gap-4 md:gap-8 animate-scroll whitespace-nowrap will-change-transform">

                        {[...brands, ...brands].map((brand, i) => (
                            <a
                                key={i}
                                href={brand.link}
                                target="_blank"
                                className="flex items-center justify-center min-w-[80px] md:min-w-[140px] lg:min-w-[160px] opacity-70 hover:opacity-100 transition"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={120}
                                    height={60}
                                    className="object-contain h-[24px] md:h-[45px] lg:h-[55px] w-auto"
                                />
                            </a>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    );
}