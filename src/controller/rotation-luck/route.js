import express from 'express';
import {celebrate} from 'celebrate';

import { rotationLuckSchema } from './dto.js';
import { RotationLuckService } from './service.js';
import {ensureAuthenticated} from "../../subcribers/auth.subscriber.js";

export const rotationLuckRouter = express.Router();
console.log(`rotationLuckRouter path: /rotation-luck`);
rotationLuckRouter.get(
    '/get-rotation-result',
    // celebrate(rotationLuckSchema), // validate params
    // ensureAuthenticated, // check auth
    async (req, res) => {
        try {
            // get params
            const { date, timeToLive } = req.query;
            // get user's ip
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            // get user's id
            const user = req;
            // console.log('user: ', user._passpo);
            const payload = { date, timeToLive };
            // call service
            const rotationLuckController = new RotationLuckService();

            const index =  rotationLuckController.setRotationTargetItem(1);
            const result = rotationLuckController.generateRotationLuck();
            // return result
            return res.status(200).json(result)//.redirect('/luck-rotation-page');
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
)