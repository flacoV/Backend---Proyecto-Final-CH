import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();  

const URI = process.env.MONGODB_URI

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('Connected to DataBase');
    } catch (err) {
        console.log(err);
    }
}

export default connectToDB;