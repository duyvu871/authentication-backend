import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CreditRechargeSchema = Schema({
    amount: {
        type: Number,
        required: true,
    },
    rechargeFor: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    paymentId: {
        type: String,
        required: false,
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'bank', 'wallet'],
        default: 'bank',
        required: false,
    },
    paymentGateway: {
        type: String,
        enum: ['razorpay', 'paytm', 'paypal'],
        default: 'paypal',
        required: false,
    },
    paymentResponse: {
        type: Object,
        default: {},
        required: false,
    },
}, {
    timestamps: true,
});

const CreditRechargeModal = mongoose.model('CreditRechargeSchema', CreditRechargeSchema);

export default CreditRechargeModal;