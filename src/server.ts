import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);


// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Early Warning System API running on http://localhost:${PORT}`);
})