import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// id: 14,
//     title: 'Item 14',
//     description: 'Description 14',
//     image: 'https://via.placeholder.com/150'
const CollectionTimeSchema = Schema({
    timeStart: {
        type: String,
        required: true,
        default: new Date().getTime() // current time
    },
    timeEnd: {
        type: String,
        required: true,
        default: new Date().getTime() + 180 // 3 minutes
    },
}, {
    timestamps: true,
})

const CollectionSchema = Schema({
    result: {
        type: String,
        required: true,
    },
    totalBet: {
        type: String,
        required: true,
    },
    totalBetFee: {
        type: String,
        required: true,
    },
    totalBetWin: {
        type: String,
        required: true,
    },
    timeStart: {
        type: String,
        required: true,
    },
    timeEnd: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
}, {
    timestamps: true,
});

const CollectionModel = mongoose.model('CollectionModel', CollectionSchema);
const CollectionTimeModal = mongoose.model('CollectionTimeModel', CollectionTimeSchema);

export { CollectionModel, CollectionTimeModal };