"use client";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Supporter",
        image: "https://i.pravatar.cc/150?img=47",
        quote:
            "CrowdFunding made it incredibly easy to support projects that truly matter to me. I love seeing my contributions make a difference.",
    },
    {
        id: 2,
        name: "Michael Brown",
        role: "Creator",
        image: "https://i.pravatar.cc/150?img=12",
        quote:
            "Launching my campaign through CrowdFunding was a great experience. The platform helped me reach supporters and turn my idea into reality.",
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Supporter",
        image: "https://i.pravatar.cc/150?img=32",
        quote:
            "I really enjoy discovering meaningful campaigns on CrowdFunding. The platform is simple to use and makes supporting creators effortless.",
    },
    {
        id: 4,
        name: "Daniel Wilson",
        role: "Creator",
        image: "https://i.pravatar.cc/150?img=11",
        quote:
            "CrowdFunding gave me the opportunity to share my project with a supportive community. I am grateful for everyone who believed in my idea.",
    },
    {
        id: 5,
        name: "Sophia Miller",
        role: "Supporter",
        image: "https://i.pravatar.cc/150?img=44",
        quote:
            "The experience has been wonderful. I can easily find campaigns I care about and contribute using my available credits.",
    },
    {
        id: 6,
        name: "James Anderson",
        role: "Creator",
        image: "https://i.pravatar.cc/150?img=13",
        quote:
            "From creating my campaign to receiving support, everything felt straightforward. CrowdFunding is a great platform for bringing ideas to life.",
    },
];

const TopTestimonials = () => {
    return (
        <section className="bg-slate-50 py-16 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        Testimonials
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                        What Our Users Say
                    </h2>

                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Hear from creators and supporters who are making a
                        difference with CrowdFunding.
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
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
                    className="testimonial-swiper pb-12"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id} className="h-auto">
                            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="mb-5 text-4xl leading-none text-purple-500">
                                    “
                                </div>

                                <p className="flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    {testimonial.quote}
                                </p>

                                <div className="mt-6 flex items-center gap-4">
                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {testimonial.name}
                                        </h3>

                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TopTestimonials;
