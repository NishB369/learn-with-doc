"use client";

import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface FeaturedCoursesProps {
    data: {
        tag: string;
        title: string;
        ctaText: string;
        courses: {
            id: string;
            title: string;
            description: string;
            duration: string;
            students: string;
            price: string;
            image: string;
        }[];
    };
}

export default function FeaturedCourses({ data }: FeaturedCoursesProps) {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-20 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-center mb-6 gap-8">
                    <div className="max-w-2xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-6"
                        >
                            <span className="text-primary-blue font-bold text-[10px] uppercase tracking-widest">
                                {data.tag}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight-custom leading-[1.1]"
                        >
                            {data.title}
                        </motion.h2>
                    </div>
                </div>

                {/* Swiper Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative group/swiper"
                >
                    {/* Navigation Buttons - Vertical Center */}
                    <button className="swiper-prev-btn absolute left-0 md:-left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary-blue hover:text-primary-blue hover:bg-white shadow-lg transition-all duration-300 cursor-pointer">
                        <ArrowLeft size={20} className="md:w-5 md:h-5" />
                    </button>
                    <button className="swiper-next-btn absolute right-0 md:-right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary-blue hover:text-primary-blue hover:bg-white shadow-lg transition-all duration-300 cursor-pointer">
                        <ArrowRight size={20} className="md:w-5 md:h-5" />
                    </button>

                    <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={24}
                        slidesPerView={1.1} // Show partial next card on mobile
                        navigation={{
                            prevEl: '.swiper-prev-btn',
                            nextEl: '.swiper-next-btn',
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        className="!pb-12 !px-4 md:!px-0 [&_.swiper-pagination-bullet]:!bg-slate-600 [&_.swiper-pagination-bullet-active]:!bg-primary-blue [&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-3 [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!transition-all"
                    >
                        {data.courses.map((course, index) => (
                            <SwiperSlide key={index} className="h-auto py-4">
                                <CourseCard {...course} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-6 text-center"
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#0284c7",
                            boxShadow: "0 0 25px rgba(14, 165, 233, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-primary-blue text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg border-neon animate-glow-neon transition-all duration-300 cursor-pointer"
                    >
                        {data.ctaText}
                        <ArrowRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
