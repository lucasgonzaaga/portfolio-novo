import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Folder, Star, GitFork, Clock } from 'lucide-react';

const Works = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [error, setError] = useState(null);

    const featuredRepos = ['portfolio-novo', 'lucasgonzaaga'];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/users/gogotrento/repos?sort=updated&per_page=12');

                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const data = await response.json();
                setProjects(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Não foi possível carregar os projetos. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const languages = ['All', ...new Set(projects.map(p => p.language).filter(Boolean))];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.language === activeFilter);

    const isFeatured = (projectName) => featuredRepos.includes(projectName);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Hoje';
        if (diffDays < 7) return `${diffDays} dias atrás`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
        return `${Math.floor(diffDays / 365)} anos atrás`;
    };

    const SkeletonCard = () => (
        <div className="bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-surface)] animate-pulse">
            <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-[var(--color-surface)] rounded"></div>
                <div className="w-5 h-5 bg-[var(--color-surface)] rounded"></div>
            </div>
            <div className="h-6 bg-[var(--color-surface)] rounded mb-3 w-3/4"></div>
            <div className="h-4 bg-[var(--color-surface)] rounded mb-2"></div>
            <div className="h-4 bg-[var(--color-surface)] rounded mb-6 w-5/6"></div>
            <div className="flex gap-4">
                <div className="h-4 bg-[var(--color-surface)] rounded w-16"></div>
                <div className="h-4 bg-[var(--color-surface)] rounded w-16"></div>
            </div>
        </div>
    );

    const ProjectCard = ({ project, index, isFeatured = false }) => (
        <motion.a
            key={project.id}
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all duration-300 hover:-translate-y-2 overflow-hidden ${isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <Folder className="w-10 h-10 text-[var(--color-primary)] opacity-80 group-hover:scale-110 transition-transform" />
                    <div className="flex gap-4 items-center">
                        {isFeatured && (
                            <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-xs rounded-full font-medium">
                                Destaque
                            </span>
                        )}
                        <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {project.name}
                </h3>

                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description || "Sem descrição disponível para este projeto."}
                </p>

                <div className="flex items-center gap-6 text-xs text-[var(--color-text-muted)] mb-4">
                    {project.language && (
                        <span className="flex items-center gap-2 font-mono">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
                            {project.language}
                        </span>
                    )}
                    {project.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {project.stargazers_count}
                        </span>
                    )}
                    {project.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {project.forks_count}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <Clock className="w-3 h-3" />
                    <span>Atualizado {formatDate(project.updated_at)}</span>
                </div>
            </div>
        </motion.a>
    );

    return (
        <section id="works" className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-8 md:p-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-7xl"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center tracking-tighter">
                    Meus <span className="text-[var(--color-primary)]">Trabalhos</span>
                </h2>

                <p className="text-center text-[var(--color-text-muted)] text-lg mb-12 max-w-2xl mx-auto">
                    Explore meus projetos open-source e trabalhos pessoais
                </p>

                {!loading && !error && (
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setActiveFilter(lang)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === lang
                                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30'
                                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] border border-[var(--color-surface)]'
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center py-20">
                        <p className="text-[var(--color-text-muted)] text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:opacity-80 transition-opacity"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {!loading && !error && (
                    <div className="space-y-12">
                        {filteredProjects.length > 0 ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFilter}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {filteredProjects.map((project, index) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={index}
                                            isFeatured={isFeatured(project.name)}
                                        />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-[var(--color-text-muted)] text-lg">
                                    Nenhum projeto encontrado nesta categoria.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-16"
                    >
                        <a
                            href="https://github.com/gogotrento"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-text)] text-[var(--color-bg)] rounded-full font-medium hover:opacity-80 transition-all transform hover:scale-105"
                        >
                            <Github className="w-5 h-5" />
                            Ver Todos no GitHub
                        </a>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default Works;
