import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SnakeRoadmap from '@/components/SnakeRoadmap';
import ValoresSection from '@/components/Valores';
import MexicoSection from '@/components/Mexico';

export default function Brands() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <SnakeRoadmap />
            <ValoresSection />
            <MexicoSection />
            <Footer />
        </div>
    );
}