import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = Schema({
    result: {
        type: String,
        required: true,
    },
    orderID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const OrderModel = mongoose.model('OrderModel', OrderSchema);

export default OrderModel;