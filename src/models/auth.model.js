import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// id: 14,
//     title: 'Item 14',
//     description: 'Description 14',
//     image: 'https://via.placeholder.com/150'
const TransactionSchema = Schema({
    T_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
      type: String,
      required: true
    },
    timeStamp: {
        type: Number,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
})

const AuthSchema = Schema({
    email: {
        type: String,
        required: false
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
        required: false,
    },
    // access_token: {
    //     type: String,
    //     required: true,
    // },
    balance: {
        type: Number,
        required: true,
    },
    refresh_token: {
        type: String,
        required: false,
    },
    // address: {
    //     type: String,
    //     required: true,
    // },
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