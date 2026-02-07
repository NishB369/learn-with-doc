import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ContactForm from "@/src/components/ContactForm";
import ContactInfo from "@/src/components/ContactInfo";
import FAQ from "@/src/components/FAQ";
import contactData from "@/src/data/contactData.json";

export const metadata = {
    title: "Contact Us | Learn with Doc",
    description: "Get in touch with our team for support, inquiries, or feedback.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header / Hero Section */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-blue/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary-blue animate-pulse" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{contactData.header.tag}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight-custom leading-[1.1]">
                        {contactData.header.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        {contactData.header.subtitle}
                    </p>
                </div>
            </section>

            {/* Main Content: Form & Info */}
            <section className="py-16 md:py-24 relative">
                <div className="container mx-auto px-6 md:px-20 max-w-7xl">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
                        {/* Contact Info - Left/Top on mobile, Right on Desktop */}
                        <div className="lg:col-span-1 order-2 lg:order-2">
                            <div className="lg:sticky lg:top-32">
                                <ContactInfo data={contactData.contactInfo} />
                            </div>
                        </div>

                        {/* Contact Form - Main Focus */}
                        <div className="lg:col-span-2 order-1 lg:order-1">
                            <ContactForm data={contactData.form} />
                        </div>
                    </div>
                </div>
            </section>

            <FAQ data={contactData.faq} />

            <Footer />
        </main>
    );
}
