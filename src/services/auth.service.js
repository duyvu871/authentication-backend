import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import UserSchema from '../models/auth.model.js';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config';
import User from '../models/auth.model.js';
import jwt from "jsonwebtoken"
import AppConfig from "../configs/app.config.js";

export default class AuthService {
    constructor() {
        this.User = User;
    }

    // login
    async checkUser(username, password, ip) {
         // generate token
        // const token = await this.generateToken(email, password); // generate token
        const dbSearch = await this.User.findOne({username: username}); // search user in db
        // console.log("dbs: ", dbSearch);
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
        const dbSearch = await this.User.findOne({username: userInsertData.username});// search user in db

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

    // Generate jwt
    async generateJWT(_id, accessTokenSecret, accessTokenLife) {
        return await jwt.sign(
            {id: _id},
            accessTokenSecret,
            {
                expiresIn: accessTokenLife,
                algorithm: 'HS256',
            }
        );
    }

    async generateRefreshToken(_id, refreshToken) {
        return await jwt.sign(
            {id: _id},
            refreshToken,
            {
                algorithm: 'HS256',
            }
        );
    }

    async decodeToken(token, accessTokenSecret) {
        return await jwt.decode(token, accessTokenSecret);
    }

    async updateRefreshToken(_id, refreshToken) {
        await this.User.findOneAndUpdate({_id: _id}, {refresh_token: refreshToken});

    }

    // Verify jwt
    async verifyToken(token, accessTokenSecret) {
        return await jwt.verify(token, accessTokenSecret);
    }


    // get User by username
    async getUserByName(username) {
        if (!username) return null;

        return await this.User.findOne({username: username});
    }

    async getUserByEmail(email) {
        return this.User.findOne({email: email});
    }

    async getUserById(id) {
        const dbSearch = await this.User.findOne({_id: id}); // search user in db
        if (!dbSearch) return {
            response: {
                message :'User not found'
            },
            status: 400,
            specifyCode: 'user_not_found'
        }; // if user not found

        return {
            response: dbSearch,
            status: 200,
            specifyCode: 'user_found'

        }; // return user
    }
}