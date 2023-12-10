import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransactionSchema = Schema({
    result: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true,
    },
})

const AuthSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rotation_transaction: [
        {
            type: Schema.Types.ObjectId,
            ref: 'TransactionModel'
        }
    ]
}, {
    timestamps: true,
});

const AuthModel = mongoose.model('AuthModel', AuthSchema);
const TransactionModel = mongoose.model('TransactionModel', TransactionSchema);

export default AuthModel;