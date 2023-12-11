import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import UserSchema from '../models/auth.model.js';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config';
import User from '../models/auth.model.js';

export default class AuthService {
    constructor() {
        this.User = User;
    }

    // login
    async checkUser(email, password, ip) {
         // generate token
        // const token = await this.generateToken(email, password); // generate token
        const dbSearch = await this.User.findOne({email: email}); // search user in db
        if (!dbSearch) return {
            response: {
                message :'User not found'
            },
            status: 400,
            specifyCode: 'user_not_found'
        }; // if user not found
        if (dbSearch.password !== password) return {
            response: {
                message :'Password not match'
            },
            status: 400,
            specifyCode: 'password_not_match'

        }; // if password not match
        return {
            response: dbSearch,
            status: 200,
            specifyCode: 'user_found'

        }; // return user
    }
    async signup(userInsertData) {
        // const token = await this.generateToken(username, password); // generate token
        const dbSearch = await this.User.findOne({email: userInsertData.email});// search user in db

        console.log("ip: " + userInsertData.ip);
        console.log("search data: ", dbSearch);
        if (dbSearch) return {
            response: {
                message :'User already exists'
            },
            status: 400,
            specifyCode: 'user_already_exists'
        }
        // if user not found;
        else {
            const newUser = await this.User.create({
                _id: new mongoose.Types.ObjectId(),
                ...userInsertData
            });
            // await newUser.save();
            return {
                response: newUser,
                status: 200,
                specifyCode: 'user_created'
            };
        }
    }
    // generate token
    async generateToken(username, password) {
        return await bcrypt.hash(`${username}-${password}`, 10);
    }

    // get User by id
    async getUserById(id) {
        return await this.User.findOne({_id: id});
    }

    // get User by username
    async getUserByName(username) {
        if (!username) return null;

        return await this.User.findOne({username: username});
    }

    async getUserByEmail(email) {
        return this.User.findOne({email: email});
    }
}