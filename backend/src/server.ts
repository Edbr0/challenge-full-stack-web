import express from 'express';
import { connectToDatabase } from './database/prisma';



const app = express();
const PORT = process.env.PORT || 3000;


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