import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
<<<<<<< HEAD
=======
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
>>>>>>> feature/frontend-foundation

// Load environment variables
dotenv.config();

<<<<<<< HEAD
const app = express();
const PORT = 5000;
=======
// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
>>>>>>> feature/frontend-foundation

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Test route
=======
// Health check route
>>>>>>> feature/frontend-foundation
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
});

<<<<<<< HEAD
=======
// User routes
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

>>>>>>> feature/frontend-foundation
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});