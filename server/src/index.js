import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './config/database.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/feedbacks', async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;

        if (!name || !email || !rating || !message) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating deve estar entre 1 e 5' });
        }

        const result = await pool.query(
            'INSERT INTO feedbacks (name, email, rating, message) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, rating, message]
        );

        res.status(201).json({
            message: 'Feedback enviado com sucesso! Aguardando aprovação.',
            id: result.rows[0].id
        });
    } catch (error) {
        console.error('Erro ao criar feedback:', error);
        res.status(500).json({ error: 'Erro ao enviar feedback' });
    }
});

app.get('/api/feedbacks', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name, rating, message, created_at FROM feedbacks WHERE approved = true ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar feedbacks:', error);
        res.status(500).json({ error: 'Erro ao buscar feedbacks' });
    }
});

app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
        }

        const result = await pool.query(
            'SELECT * FROM admin_users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, username: user.username });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

app.get('/api/admin/feedbacks', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM feedbacks ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar feedbacks:', error);
        res.status(500).json({ error: 'Erro ao buscar feedbacks' });
    }
});

app.patch('/api/admin/feedbacks/:id/approve', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE feedbacks SET approved = true WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Feedback não encontrado' });
        }

        res.json({ message: 'Feedback aprovado com sucesso', feedback: result.rows[0] });
    } catch (error) {
        console.error('Erro ao aprovar feedback:', error);
        res.status(500).json({ error: 'Erro ao aprovar feedback' });
    }
});

app.delete('/api/admin/feedbacks/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM feedbacks WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Feedback não encontrado' });
        }

        res.json({ message: 'Feedback deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar feedback:', error);
        res.status(500).json({ error: 'Erro ao deletar feedback' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API funcionando' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
