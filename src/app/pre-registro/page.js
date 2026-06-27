import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PreRegistroForm from '@/components/PreRegistro/PreRegistroForm';
import { Toaster } from 'react-hot-toast';


export default function PreRegistro() {
    return (
        <div className="min-h-screen">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <Navbar />
            <PreRegistroForm />
            <Footer />
        </div>
    );
}