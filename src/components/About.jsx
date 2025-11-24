import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImage from '../assets/eu.jpeg';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Exit animation: Fade out when reaching the end of the section
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.9]);

    return (
        <section ref={containerRef} id="about" className="relative w-full bg-[var(--color-bg-secondary)] text-[var(--color-text)]">
            <div className="flex flex-col md:flex-row min-h-[200vh]">

                {/* Sticky Left Side (Image & Title) */}
                <div className="w-full md:w-1/2 h-screen sticky top-0 flex flex-col p-0 overflow-hidden">
                    <motion.div style={{ opacity, scale }} className="relative w-full h-full">

                        {/* Image Placeholder */}
                        <div className="absolute inset-0 bg-[var(--color-bg-tertiary)] flex items-center justify-center overflow-hidden">
                            <img
                                src={profileImage}
                                alt="Lucas Gonzaga"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] via-transparent to-transparent opacity-90"></div>
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-20 left-8 md:left-20 z-20">
                            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-[var(--color-text)]">
                                Sobre <br /> <span className="text-[var(--color-text-muted)]">Mim</span>
                            </h2>
                        </div>
                    </motion.div>
                </div>

                {/* Scrollable Right Side (Content) */}
                <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center space-y-32 pb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-light text-[var(--color-text-muted)]">01. A Jornada</h3>
                        <p className="text-xl md:text-2xl leading-relaxed font-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-light text-[var(--color-text-muted)]">02. A Paixão</h3>
                        <p className="text-xl md:text-2xl leading-relaxed font-light">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-light text-[var(--color-text-muted)]">03. O Futuro</h3>
                        <p className="text-xl md:text-2xl leading-relaxed font-light">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <div className="pt-8">
                            <button
                                onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 bg-[var(--color-text)] text-[var(--color-bg)] rounded-full font-medium hover:opacity-80 transition-all transform hover:scale-105"
                            >
                                Ver Projetos
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
