import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImage from '../assets/eu.jpeg';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.9]);

    return (
        <section ref={containerRef} id="about" className="relative w-full bg-[var(--color-bg-secondary)] text-[var(--color-text)]">
            <div className="flex flex-col md:flex-row min-h-[200vh]">
                <div className="w-full md:w-1/2 h-screen sticky top-0 flex flex-col p-0 overflow-hidden">
                    <motion.div style={{ opacity, scale }} className="relative w-full h-full">

                        <div className="absolute inset-0 bg-[var(--color-bg-tertiary)] flex items-center justify-center overflow-hidden">
                            <img
                                src={profileImage}
                                alt="Lucas Gonzaga"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] via-transparent to-transparent opacity-90"></div>
                        </div>

                        <div className="absolute bottom-20 left-8 md:left-20 z-20">
                            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-[var(--color-text)]">
                                Sobre <br /> <span className="text-[var(--color-text-muted)]">Mim</span>
                            </h2>
                        </div>
                    </motion.div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center space-y-32 pb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-light text-[var(--color-text-muted)]">01. O Inicio</h3>
                        <p className="text-xl md:text-2xl leading-relaxed font-light">
                            Desde o berço eu fui uma pessoa apaixonada por tecnologia, sempre tive muitas curiosades em saber tudo que eu via e usava funcionava e com isso por volta dos meus 12 anos eu inciei meus estudos na área de desenvolvimento front-end sendo a minha área de atuação até os dias de hoje.
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
                            Assim que comecei meus estudos na área foi paixão a primeira vista, eu finalmente estava descobrindo como aquela mágica que eu via diante dos meus olhos era por de baixo do pano, e foi assim que eu tive a certeza do que eu queria para mim.
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
                            Eu pretendo para o meu futuro ser uma referência dentro do mercado de desenvolvimento web, sigo muito convicto que num futuro não distante vou me realizar.
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
