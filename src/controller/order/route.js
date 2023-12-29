import express from 'express';
import {celebrate} from 'celebrate';
import {OrderSchema} from "./dto.js";
import { OrderService } from "../../services/order.service.js";
import { authenticateJWT} from "../../scripts/authenticateJWT.js";
import {RotationLuckService} from "../rotation-luck/service.js";
import { responseTemplate } from "../../ultis/responseWrapper.ultis.js";
import { createOrder } from "../../scripts/orderControl.js";

export const orderRouter = express.Router();
console.log(`Order router loaded: /order`);
orderRouter.get(
    '/get-order-list',
    // celebrate(OrderSchema),
    authenticateJWT,
    async (req, res) => {
        try {
            const userId = req.user_id;
            // get user's ip
            const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            // call service
            const orderService = new OrderService();
            // const result = await orderService.getOrdersByUserID(userId);
            const result = await orderService.getAllOrders();
            // return result
            return responseTemplate(res).status(200).json(result)//.redirect('/luck-rotation-page');
        } catch (error) {
            return responseTemplate(res).status(500).json({message: error.message});
        }
    }
);

orderRouter.post(
    '/create-order',
    celebrate(OrderSchema),
    authenticateJWT,
    async (req, res) => {
        // try {
        //     const userId = req.user_id;
        //     const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        //     const orderService = new OrderService();
        //     const lastOrder = await orderService.getLastOrderByUserID(userId);
        //     const orderID = lastOrder ? lastOrder.orderID : 0;
        //     const orderData = {
        //         result: orderService.getResult(),
        //         orderID: Number(orderID) + 1,
        //         from: userId,
        //         status: 'completed',
        //     }
        //     const result = await orderService.createOrder(orderData);
        //     return responseTemplate(res).status(200).json(result);
        // } catch (error) {
        //     return responseTemplate(res).status(500).json({message: error.message});
        // }
        const orderResponse = await createOrder(req, res);

        return orderResponse
    }
);