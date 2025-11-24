import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Linkedin, Github } from 'lucide-react';

const ContactLink = ({ href, label, icon: Icon }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full max-w-2xl py-8 border-b border-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors duration-300"
            whileHover={{ x: 20 }}
        >
            <div className="flex items-center gap-6">
                <Icon className="w-8 h-8 md:w-12 md:h-12 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
                <span className="text-3xl md:text-5xl font-light group-hover:font-medium transition-all duration-300">
                    {label}
                </span>
            </div>
            <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
        </motion.a>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--color-bg-secondary)] text-[var(--color-text)] p-8 md:p-20 relative overflow-hidden">

            <div className="w-full max-w-4xl z-10 flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-center mb-20 tracking-tighter"
                >
                    Vamos criar algo <br /> <span className="text-[var(--color-text-muted)]">juntos?</span>
                </motion.h2>

                <div className="w-full flex flex-col gap-2">
                    <ContactLink
                        href="mailto:seuemail@exemplo.com"
                        label="Email"
                        icon={Mail}
                    />
                    <ContactLink
                        href="https://linkedin.com/in/lucasgonzaaga"
                        label="LinkedIn"
                        icon={Linkedin}
                    />
                    <ContactLink
                        href="https://github.com/lucasgonzaaga"
                        label="GitHub"
                        icon={Github}
                    />
                </div>
            </div>

            <footer className="absolute bottom-8 text-[var(--color-text-muted)] text-sm font-light tracking-widest uppercase">
                © 2025 Lucas Gonzaga
            </footer>
        </section>
    );
};

export default Contact;
