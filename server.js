// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/product.js'; 

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Routes
app.use('/api/products', productRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('home routes');
});

// Test route
app.get('/test', (req, res) => {
  res.send('test route response');
});

// Fallback 404 route
app.use((req, res) => {
  res.status(404).json({ message: 'route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
