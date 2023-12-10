import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RotationLuckSchema = Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    timeToLive: {
        type: Number,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
});

const RotationLuckModel = mongoose.model('RotationLuckModel', RotationLuckSchema);

export default RotationLuckModel;