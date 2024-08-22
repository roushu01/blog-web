import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { DB_USERNAME, DB_PASSWORD } = process.env;

export const Connection = async () => {
    const URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@cluster0-shard-00-00.gxoyv.mongodb.net:27017,cluster0-shard-00-01.gxoyv.mongodb.net:27017,cluster0-shard-00-02.gxoyv.mongodb.net:27017/?ssl=true&replicaSet=atlas-4kg0pc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(URL); // No options needed for the latest Mongoose
        console.log('Database Connected successfully')
    } catch (error) {
        console.log('Error while connecting with the database:', error.message);
    }
};

export default Connection;
