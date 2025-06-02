import express from 'express';
import { json } from 'body-parser';
import { connectToDatabase } from './database/prisma';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.routes';
import errorMiddleware from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import authMiddleware from './middleware/auth.middleware';



const app = express();
const PORT = process.env.PORT || 3000;


app.use(json());

//Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', authMiddleware, userRoutes);

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