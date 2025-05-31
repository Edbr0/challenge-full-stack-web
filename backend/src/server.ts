import express from 'express';



const app = express();
const PORT = process.env.PORT || 3000;



// Start the server
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer();