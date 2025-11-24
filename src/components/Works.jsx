import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

const Works = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/lucasgonzaaga/repos?sort=updated&per_page=6');
                const data = await response.json();
                setProjects(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="works" className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--color-bg-tertiary)] text-[var(--color-text)] p-8 md:p-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-7xl"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center tracking-tighter">
                    Meus <span className="text-[var(--color-text-muted)]">Trabalhos</span>
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-text)]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.a
                                key={project.id}
                                href={project.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-surface)] hover:border-[var(--color-text-muted)] transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <Folder className="w-10 h-10 text-[var(--color-text)] opacity-80" />
                                    <div className="flex gap-4">
                                        <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                                    {project.name}
                                </h3>

                                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description || "Sem descrição disponível para este projeto."}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] font-mono">
                                    {project.language && (
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[var(--color-text)]"></span>
                                            {project.language}
                                        </span>
                                    )}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Works;
