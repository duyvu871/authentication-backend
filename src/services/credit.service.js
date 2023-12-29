import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import UserSchema from '../models/auth.model.js';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config';
import User from '../models/auth.model.js';
import jwt from "jsonwebtoken"
import AppConfig from "../configs/app.config.js";
import { createOrder } from "../scripts/orderControl.js";

export default class CreditService {
    constructor() {
        this.User = User;
    }

    RechargeToUserById(amount, uid) {
        const user = this.User.findOne({ _id: uid });
        if (user) {
            user.balance += amount;
            user.save();
            return {
                response: {
                    message : 'Recharge success',
                },
                status: 200,
                specifyCode: 'recharge_success'
            };
        } else {
            return {
                response: {
                    message : 'Recharge fail'
                },
                status: 400,
                specifyCode: 'recharge_fail'
            };
        }
    }

    // addToOrderHistory(uid, order) {
    //     const
    // }
}