import config from './dotenv.js';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config['mongoUri'] as string);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};

export const terminateConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log(`✅ MongoDB connection closed`);
    } catch (err) {
        console.error('❌ MongoDB connection close failed:', err);
        process.exit(1);
    }
};

export default connectDB;
