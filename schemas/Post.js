import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 128
    },
    body: {
        type: String,
        required: true,
        min: 6,
        max: 512
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

export default mongoose.model('Post', postSchema);