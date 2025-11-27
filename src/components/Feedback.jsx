import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 0,
        message: ''
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`${API_URL}/feedbacks`);
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error('Erro ao buscar feedbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.rating || !formData.message) {
            setSubmitStatus({ type: 'error', message: 'Preencha todos os campos' });
            return;
        }

        setSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(`${API_URL}/feedbacks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Feedback enviado com sucesso! Aguardando aprovação.'
                });
                setFormData({ name: '', email: '', rating: 0, message: '' });
            } else {
                throw new Error('Erro ao enviar feedback');
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Erro ao enviar feedback. Tente novamente.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const StarRating = ({ rating, onRate, onHover, interactive = true }) => {
        return (
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        type="button"
                        onClick={() => interactive && onRate && onRate(star)}
                        onMouseEnter={() => interactive && onHover && onHover(star)}
                        onMouseLeave={() => interactive && onHover && onHover(0)}
                        whileHover={interactive ? { scale: 1.2 } : {}}
                        whileTap={interactive ? { scale: 0.9 } : {}}
                        className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
                        disabled={!interactive}
                    >
                        <Star
                            className={`w-8 h-8 ${star <= (interactive ? (hoverRating || rating) : rating)
                                ? 'fill-[var(--color-primary)] text-[var(--color-primary)]'
                                : 'text-[var(--color-surface)]'
                                }`}
                        />
                    </motion.button>
                ))}
            </div>
        );
    };

    return (
        <section id="feedback" className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-8 md:p-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-7xl"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center tracking-tighter">
                    Deixe seu <span className="text-[var(--color-primary)]">Feedback</span>
                </h2>

                <p className="text-center text-[var(--color-text-muted)] text-lg mb-12 max-w-2xl mx-auto">
                    Sua opinião é muito importante! Compartilhe sua experiência e ajude a melhorar.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-surface)]"
                    >
                        <h3 className="text-2xl font-bold mb-6">Enviar Feedback</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nome</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-surface)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    placeholder="Seu nome"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-surface)] focus:border-[var(--color-primary)] outline-none transition-colors"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Avaliação</label>
                                <StarRating
                                    rating={formData.rating}
                                    onRate={(rating) => setFormData({ ...formData, rating })}
                                    onHover={setHoverRating}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Mensagem</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-surface)] focus:border-[var(--color-primary)] outline-none transition-colors resize-none"
                                    placeholder="Compartilhe sua experiência..."
                                />
                            </div>

                            <AnimatePresence>
                                {submitStatus && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`flex items-center gap-2 p-4 rounded-lg ${submitStatus.type === 'success'
                                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                                            }`}
                                    >
                                        {submitStatus.type === 'success' ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5" />
                                        )}
                                        <span className="text-sm">{submitStatus.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    'Enviando...'
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Enviar Feedback
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold mb-6">Feedbacks Recentes</h3>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-[var(--color-bg-secondary)] p-6 rounded-xl border border-[var(--color-surface)] animate-pulse">
                                        <div className="h-4 bg-[var(--color-surface)] rounded w-1/3 mb-3"></div>
                                        <div className="h-3 bg-[var(--color-surface)] rounded w-full mb-2"></div>
                                        <div className="h-3 bg-[var(--color-surface)] rounded w-2/3"></div>
                                    </div>
                                ))}
                            </div>
                        ) : feedbacks.length === 0 ? (
                            <div className="text-center py-12 text-[var(--color-text-muted)]">
                                <p>Nenhum feedback ainda. Seja o primeiro!</p>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {feedbacks.map((feedback, index) => (
                                    <motion.div
                                        key={feedback.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[var(--color-bg-secondary)] p-6 rounded-xl border border-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold">{feedback.name}</h4>
                                            <StarRating rating={feedback.rating} interactive={false} />
                                        </div>
                                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                                            {feedback.message}
                                        </p>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-3">
                                            {new Date(feedback.created_at).toLocaleDateString('pt-BR')}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Feedback;
