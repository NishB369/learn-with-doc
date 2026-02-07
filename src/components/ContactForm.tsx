"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
    data: {
        title: string;
        fields: {
            name: { label: string; placeholder: string };
            email: { label: string; placeholder: string };
            subject: { label: string; placeholder: string };
            message: { label: string; placeholder: string };
        };
        buttonText: string;
    };
}

export default function ContactForm({ data }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-sky-100 text-center flex flex-col items-center justify-center min-h-[400px]"
            >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-slate-100 text-slate-700 font-semibold px-6 py-2.5 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                >
                    Send Another Message
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-sky-100"
        >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">{data.title}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">{data.fields.name.label}</label>
                        <input
                            required
                            type="text"
                            placeholder={data.fields.name.placeholder}
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">{data.fields.email.label}</label>
                        <input
                            required
                            type="email"
                            placeholder={data.fields.email.placeholder}
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">{data.fields.subject.label}</label>
                    <input
                        required
                        type="text"
                        placeholder={data.fields.subject.placeholder}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">{data.fields.message.label}</label>
                    <textarea
                        required
                        rows={5}
                        placeholder={data.fields.message.placeholder}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all resize-none"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                    className="w-full bg-primary-blue text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            {data.buttonText}
                            <Send size={18} />
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}
