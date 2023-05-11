import mongoose from 'mongoose';

async function connectDB() {
    const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/imageboard';

    try {
        await mongoose.connect(URI);
        console.log(`Connected to database: ${URI}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;