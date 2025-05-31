import express from 'express';
import { json } from 'body-parser';
import { connectToDatabase } from './database/prisma';
import userRoutes from './routes/user.route';



const app = express();
const PORT = process.env.PORT || 3000;


app.use(json());

//Routes
app.use('/api/v1/user', userRoutes);

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