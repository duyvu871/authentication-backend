import express from "express";
import AppConfig from "../configs/app.config.js";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import flash from "connect-flash";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Routes from "../routes/index.js";
import User from "../models/auth.model.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import path from "path";
import ConnectRedis from "connect-redis";
import redis from "redis";

export default async ({app}) => {

    // const RedisStore = new ConnectRedis(session);
    // const redisClient = redis.createClient({
    //     host: "localhost",
    //     port: 6379,
    //     // password: process.env.REDIS_PASSWORD,
    // });
    // passport config
    // passport.use(new LocalStrategy(
    //     (username, password, done) => {
    //         User.findOne({ username: username }, (err, user) => {
    //             if (err) { return done(err); }
    //             if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
    //             if (!bcrypt.compareSync(password, user.password)) {
    //                 return done(null, false, { message: 'Incorrect password.' });
    //             }
    //             return done(null, user);
    //         }); // end User.findOne
    //     }
    // ));
    // passport session setup
    // passport.serializeUser((user, done) => {
    //     process.nextTick(() => {
    //         return done(null, {
    //             id: user.id,
    //             username: user.username,
    //             name_role: user.name_role,
    //             email: user.email,
    //             phone: user.phone,
    //             address: user.address,
    //             avatar: user.avatar,
    //             is_active: user.is_active,
    //             is_deleted: user.is_deleted,
    //             created_at: user.created_at,
    //             updated_at: user.updated_at,
    //             // deleted_at: user.deleted_at,
    //         }); // user.id is used to identify authenticated user
    //
    //     }); // end process.nextTick
    // }); // end passport config
    // used to deserialize the user
    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         process.nextTick(() => {
    //             if (err) { return done(err); }
    //             if (!user) { return done(null, false); }
    //             return done(null, user);
    //         }); // end process.nextTick
    //     }); // end User.findById
    // }); // end passport config


    app.get("/status", (req, res) => {
        res.status(200).end();
    }); // for load balancers
    app.head("/status", (req, res) => {
        res.status(200).end();
    }); // for load balancers
    app.enable("trust proxy"); // trust first proxy

    dotenv.config(); // load environment variables

    // app.use(session({
    //     genid:(req) => {
    //         console.log('Inside the session middleware')
    //         console.log(req.sessionID);
    //         return uuidv4() //use UUIDs for session IDs
    //     },
    //     // store: new RedisStore({ client: redisClient }), // store session in redis
    //     secret: AppConfig.SESSION_SECRET, // session secret
    //     resave: true, // forces the session to be saved back to the session store
    //     saveUninitialized: true, // dont save unmodified
    //     cookie: {
    //         secure: true, // serve secure cookies
    //         maxAge: 24 * 60 * 60 * 1000 // session expires in 24 hours
    //     }
    // }));

    // app.use(passport.authenticate("session")); // persistent login sessions
    // app.use(passport.initialize()); // initialize passport
    // app.use(passport.session()); // persistent login sessions
    app.use(cors()); // enable cors
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
    app.use(cookieParser()); // parse cookie
    app.use(express.static(path.join(AppConfig.rootPath, "src/statics"))); // set static path
    // console.log(path.join(AppConfig.rootPath, "src/statics"));
    app.use(flash()); // use connect-flash for flash messages stored in session
    Routes(app); // load routes

    return app;
}