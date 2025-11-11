import connectDB, { terminateConnection } from './configs/db.js';
import config from './configs/dotenv.js';
import app from './app.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...');
    server.close(async () => {
        await terminateConnection();
        process.exit(0);
    });
});
