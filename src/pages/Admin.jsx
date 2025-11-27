import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Trash2, LogOut, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
            fetchFeedbacks();
        }
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('adminToken', data.token);
                setToken(data.token);
                setIsAuthenticated(true);
                fetchFeedbacks();
            } else {
                setError('Credenciais inválidas');
            }
        } catch (err) {
            setError('Erro ao fazer login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setIsAuthenticated(false);
        setFeedbacks([]);
    };

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/admin/feedbacks`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setFeedbacks(data);
            } else {
                setError('Erro ao carregar feedbacks');
            }
        } catch (err) {
            setError('Erro ao carregar feedbacks');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`${API_URL}/admin/feedbacks/${id}/approve`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setFeedbacks(feedbacks.map(f =>
                    f.id === id ? { ...f, approved: true } : f
                ));
            }
        } catch (err) {
            console.error('Erro ao aprovar feedback:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja deletar este feedback?')) return;

        try {
            const response = await fetch(`${API_URL}/admin/feedbacks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setFeedbacks(feedbacks.filter(f => f.id !== id));
            }
        } catch (err) {
            console.error('Erro ao deletar feedback:', err);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-bg)] p-8" style={{ cursor: 'auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-surface)]"
                >
                    <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Usuário</label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-surface)] focus:border-[var(--color-primary)] outline-none"
                                placeholder="admin"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Senha</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-surface)] focus:border-[var(--color-primary)] outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            Entrar
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-8" style={{ cursor: 'auto' }}>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">Painel Admin - Feedbacks</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[var(--color-bg-secondary)] p-6 rounded-xl border border-[var(--color-surface)]">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-2">Total</h3>
                        <p className="text-3xl font-bold">{feedbacks.length}</p>
                    </div>
                    <div className="bg-[var(--color-bg-secondary)] p-6 rounded-xl border border-[var(--color-surface)]">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-2">Aprovados</h3>
                        <p className="text-3xl font-bold text-green-600">{feedbacks.filter(f => f.approved).length}</p>
                    </div>
                    <div className="bg-[var(--color-bg-secondary)] p-6 rounded-xl border border-[var(--color-surface)]">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-2">Pendentes</h3>
                        <p className="text-3xl font-bold text-yellow-600">{feedbacks.filter(f => !f.approved).length}</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">Carregando...</div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {feedbacks.map((feedback) => (
                                <motion.div
                                    key={feedback.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className={`bg-[var(--color-bg-secondary)] p-6 rounded-xl border ${feedback.approved
                                        ? 'border-green-500/30'
                                        : 'border-yellow-500/30'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className="font-semibold text-lg">{feedback.name}</h3>
                                                <span className="text-sm text-[var(--color-text-muted)]">{feedback.email}</span>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < feedback.rating
                                                                ? 'fill-[var(--color-primary)] text-[var(--color-primary)]'
                                                                : 'text-[var(--color-surface)]'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                {feedback.approved && (
                                                    <span className="px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-full">
                                                        Aprovado
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[var(--color-text-muted)] mb-2">{feedback.message}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">
                                                {new Date(feedback.created_at).toLocaleString('pt-BR')}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 ml-4">
                                            {!feedback.approved && (
                                                <button
                                                    onClick={() => handleApprove(feedback.id)}
                                                    className="p-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                                    title="Aprovar"
                                                >
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(feedback.id)}
                                                className="p-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                                title="Deletar"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {feedbacks.length === 0 && (
                            <div className="text-center py-12 text-[var(--color-text-muted)]">
                                Nenhum feedback ainda.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
