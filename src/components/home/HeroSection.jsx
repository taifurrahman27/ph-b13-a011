"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
    {
        id: 1,
        badge: "Turn Ideas Into Reality",
        title: "Bring Your Biggest Ideas to Life",
        description:
            "Share your vision with the world and get the support you need to turn your idea into something meaningful.",
        buttonText: "Explore Campaigns",
        buttonLink: "/campaigns",
        image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 2,
        badge: "Support Great Ideas",
        title: "Your Support Can Make a Difference",
        description:
            "Discover inspiring campaigns and support creators who are building products, projects, and causes that matter.",
        buttonText: "Discover Campaigns",
        buttonLink: "/campaigns",
        image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 3,
        badge: "Build Together",
        title: "Great Things Happen When We Come Together",
        description:
            "Join a growing community of creators and supporters working together to transform ambitious ideas into reality.",
        buttonText: "Join CrowdFund",
        buttonLink: "/register",
        image:
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1800&q=80",
    },
];

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white transition-colors duration-300 dark:bg-slate-950">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                className="h-[calc(100vh-4.5rem)] min-h-140 max-h-190"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative flex h-full items-center">

                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                }}
                            />

                            <div className="absolute inset-0 bg-white/45 dark:hidden" />

                            <div className="absolute inset-0 hidden bg-slate-950/70 dark:block" />

                            <div className="absolute inset-0 bg-linear-to-r from-white/85 via-white/45 to-white/10 dark:hidden" />

                            <div className="absolute inset-0 hidden bg-linear-to-r from-slate-950/85 via-slate-950/55 to-slate-950/20 dark:block" />

                            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-5 py-20 sm:px-6 lg:px-8">
                                <div className="max-w-3xl text-left">

                                    <span className="mb-6 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:text-white">
                                        {slide.badge}
                                    </span>

                                    <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
                                        {slide.title}
                                    </h1>

                                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-200">
                                        {slide.description}
                                    </p>

                                    <div className="mt-8">
                                        <Link
                                            href={slide.buttonLink}
                                            className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200/50 transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl dark:shadow-indigo-950/30"
                                        >
                                            {slide.buttonText}

                                            <HiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .swiper-pagination {
                    bottom: 28px !important;
                }

                .swiper-pagination-bullet {
                    width: 9px;
                    height: 9px;
                    background: #4f46e5;
                    opacity: 0.35;
                    transition: all 0.3s ease;
                }

                .swiper-pagination-bullet-active {
                    width: 28px;
                    border-radius: 999px;
                    opacity: 1;
                }

                .dark .swiper-pagination-bullet {
                    background: #ffffff;
                    opacity: 0.5;
                }

                .dark .swiper-pagination-bullet-active {
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
