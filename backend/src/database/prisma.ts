import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.info('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; 
    }
}

