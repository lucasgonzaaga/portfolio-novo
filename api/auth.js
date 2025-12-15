import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET missing');

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido ou expirado' });
            }
            req.user = user;
            next();
        });
    } catch (e) {
        console.error('Auth error:', e);
        return res.status(500).json({ error: 'Erro interno de autenticação' });
    }
};
