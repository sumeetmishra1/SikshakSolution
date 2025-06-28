import express from 'express';
import dotenv from 'dotenv';
import rateLimiter from './middlewares/rateLimiter.js';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
import userRoutes from './routes/user.routes.js';
import streamRoutes from './routes/stream.routes.js';

dotenv.config();
const app = express();

app.use(express.json());

// Apply Rate Limiter to All Routes
app.use(rateLimiter);

// Mount Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('/stream', streamRoutes);

app.get('/', (req, res) => res.send('✅ Sikshak API is running!'));

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
