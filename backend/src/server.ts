import express from 'express';
import { json } from 'body-parser';
import { connectToDatabase } from './database/prisma';
import userRoutes from './routes/user.route';
import studentRoutes from './routes/student.route';
import authRoutes from './routes/auth.routes';
import errorMiddleware from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import authMiddleware from './middleware/auth.middleware';
import cors from 'cors'


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());


app.use(json());

//Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', authMiddleware, userRoutes);
app.use('/api/v1/student', authMiddleware, studentRoutes);

//Middlewares
app.use(errorMiddleware);

const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer();