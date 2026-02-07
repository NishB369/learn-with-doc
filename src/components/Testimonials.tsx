"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface TestimonialsProps {
    data: {
        tag: string;
        title: string;
        subtitle: string;
        items: {
            name: string;
            title: string;
            course: string;
            rating: number;
            text: string;
            avatar: string;
        }[];
    };
}

const Testimonials = ({ data }: TestimonialsProps) => {
    return (
        <section className="py-24 bg-slate-50 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-[-10%] w-[30%] h-[30%] bg-primary-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-[-10%] w-[30%] h-[30%] bg-primary-blue/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-primary-blue font-bold tracking-wider uppercase text-sm mb-3 block">
                        {data.tag}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                        {data.title}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {data.subtitle}
                    </p>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative group/testimonials"
                >
                    {/* External Navigation Buttons - Desktop */}
                    <button className="swiper-test-prev hidden md:flex absolute left-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-300 opacity-0 group-hover/testimonials:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button className="swiper-test-next hidden md:flex absolute right-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-300 opacity-0 group-hover/testimonials:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>

                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={32}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-test-prev',
                            nextEl: '.swiper-test-next',
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="!pb-8 !px-4 md:!px-0 [&_.swiper-pagination-bullet]:!bg-slate-400 [&_.swiper-pagination-bullet-active]:!bg-primary-blue [&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-3 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!transition-all cursor-grab active:cursor-grabbing"
                    >
                        {data.items.map((testimonial, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full flex flex-col relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {/* Quote Icon Watermark */}
                                    <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors duration-300 transform group-hover:scale-110" size={64} fill="currentColor" stroke="none" />

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-6 relative z-10">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-slate-600 mb-8 relative z-10 leading-relaxed flex-grow italic">
                                        "{testimonial.text}"
                                    </p>

                                    {/* User Profile */}
                                    <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                                            <p className="text-primary-blue text-xs font-medium mb-0.5">{testimonial.title}</p>
                                            <p className="text-slate-400 text-[10px] uppercase tracking-wide">Alumnus: {testimonial.course}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
