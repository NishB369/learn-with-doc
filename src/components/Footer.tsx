"use client";

import React from "react";
import Link from "next/link";
import { Activity, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-slate-50 to-white pt-20 pb-10 border-t border-slate-100">
            <div className="container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 cursor-pointer group w-fit">
                            <div className="bg-primary-blue p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                                <Activity size={20} className="text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight-custom text-slate-900">
                                Medicare
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Send, Save, Spend, And Invest All In One App. Anytime, Anywhere. In-One Mobile Banking Built For Your Lifestyle.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="bg-slate-100 p-2.5 rounded-lg text-slate-600 hover:bg-primary-blue hover:text-white transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="bg-slate-100 p-2.5 rounded-lg text-slate-600 hover:bg-primary-blue hover:text-white transition-all duration-300">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="bg-slate-100 p-2.5 rounded-lg text-slate-600 hover:bg-primary-blue hover:text-white transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="bg-slate-100 p-2.5 rounded-lg text-slate-600 hover:bg-primary-blue hover:text-white transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About Us", href: "/about" },
                                { name: "Courses", href: "/courses" },
                                { name: "Blogs", href: "/blogs" },
                                { name: "Contact Us", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-500 hover:text-primary-blue transition-colors text-sm font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">Legal</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Terms of Service", href: "#" },
                                { name: "Privacy Policy", href: "#" },
                                { name: "Cookies Policy", href: "#" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-500 hover:text-primary-blue transition-colors text-sm font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">Contact Info</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3 text-slate-500 text-sm">
                                <MapPin size={18} className="text-primary-blue mt-0.5 flex-shrink-0" />
                                <span>123 Health Street, New York, USA</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-500 text-sm">
                                <Phone size={18} className="text-primary-blue flex-shrink-0" />
                                <span>+1 (800) 234-5678</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-500 text-sm">
                                <Mail size={18} className="text-primary-blue flex-shrink-0" />
                                <span>support@medicare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2026 Medicare, All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-slate-500 hover:text-primary-blue text-sm font-medium transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-slate-500 hover:text-primary-blue text-sm font-medium transition-colors">
                            Terms Of Use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
