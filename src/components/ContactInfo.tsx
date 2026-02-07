"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

const iconMap: { [key: string]: any } = {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Instagram,
    Facebook
};

interface ContactInfoProps {
    data: {
        details: {
            icon: string;
            label: string;
            value: string;
            link: string;
        }[];
        socials: {
            icon: string;
            link: string;
        }[];
    };
}

export default function ContactInfo({ data }: ContactInfoProps) {
    return (
        <div className="flex flex-col h-full gap-8">
            <div className="grid gap-6">
                {data.details.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    return (
                        <motion.a
                            key={index}
                            href={item.link}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-blue/30 hover:bg-sky-50/50 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-blue group-hover:scale-110 transition-transform duration-300 shrink-0">
                                <Icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">{item.label}</h3>
                                <p className="text-slate-600 font-medium">{item.value}</p>
                            </div>
                        </motion.a>
                    );
                })}
            </div>

            <div className="mt-auto">
                <h3 className="font-bold text-slate-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                    {data.socials.map((social, index) => {
                        const Icon = iconMap[social.icon];
                        return (
                            <motion.a
                                key={index}
                                href={social.link}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-blue hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                <Icon size={20} />
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
