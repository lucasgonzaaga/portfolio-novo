import bcrypt from 'bcrypt';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'portfolio_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
});

async function setupDatabase() {
    try {
        console.log('🔧 Configurando banco de dados...');

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const schemaPath = join(__dirname, '..', 'database', 'schema.sql');
        const schema = readFileSync(schemaPath, 'utf8');

        await pool.query(schema);
        console.log('✅ Schema criado com sucesso!');

        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const existingAdmin = await pool.query(
            'SELECT * FROM admin_users WHERE username = $1',
            [adminUsername]
        );

        if (existingAdmin.rows.length === 0) {
            await pool.query(
                'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
                [adminUsername, hashedPassword]
            );
            console.log(`✅ Usuário admin criado: ${adminUsername}`);
            console.log(`⚠️  Senha padrão: ${adminPassword}`);
            console.log('⚠️  ALTERE A SENHA EM PRODUÇÃO!');
        } else {
            console.log('ℹ️  Usuário admin já existe');
        }

        console.log('\n🎉 Banco de dados configurado com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao configurar banco de dados:', error);
        process.exit(1);
    }
}

setupDatabase();
