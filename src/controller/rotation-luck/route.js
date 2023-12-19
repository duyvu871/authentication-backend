import express from 'express';
import {celebrate} from 'celebrate';

import AuthService from "../../services/auth.service.js";
import { rotationLuckSchema } from './dto.js';
import { RotationLuckService } from './service.js';
import {ensureAuthenticated} from "../../subcribers/auth.subscriber.js";
import { authenticateJWT} from "../../scripts/authenticateJWT.js";

export const rotationLuckRouter = express.Router();
console.log(`rotationLuckRouter path: /rotation-luck`);
rotationLuckRouter.post(
    '/get-rotation-result',
    // celebrate(rotationLuckSchema), // validate params
    // ensureAuthenticated, // check auth
    authenticateJWT,
    async (req, res) => {
        try {
            // get params
            const { email, id } = req.body;
            // get user's ip
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            // const authService = new AuthService(); // create new instance of auth service
            // const user = await authService.getUserByEmail(email); // get user by email

            // call service
            const rotationLuckController = new RotationLuckService();

            const index =  rotationLuckController.setRotationTargetItem(1);
            const result = rotationLuckController.generateRotationLuck(ip);

            // return result
            return res.status(200).json(result)//.redirect('/luck-rotation-page');
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
);

rotationLuckRouter.get(
    '/get-rotation-list',
    // celebrate(rotationLuckSchema), // validate params
    // ensureAuthenticated, // check auth
    authenticateJWT,
    async (req, res) => {
        try {
            // get params
            // const { email, id } = req.body;
            // get user's ip
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            // const authService = new AuthService(); // create new instance of auth service
            // const user = await authService.getUserByEmail(email); // get user by email

            // call service
            const rotationLuckController = new RotationLuckService();

            // const index =  rotationLuckController.setRotationTargetItem(1);
            const result = rotationLuckController.getRotationList(ip);

            // return result
            return res.status(200).json(result)//.redirect('/luck-rotation-page');
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
);