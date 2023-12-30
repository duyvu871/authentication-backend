import express from 'express';
import {celebrate} from 'celebrate';
import {OrderSchema} from "./dto.js";
import {OrderService} from "../../services/order.service.js";
import {authenticateJWT} from "../../scripts/authenticateJWT.js";
import {responseTemplate} from "../../ultis/responseWrapper.ultis.js";
import {createOrder} from "../../scripts/orderControl.js";

export const orderRouter = express.Router();
console.log(`Order router loaded: /order`);
orderRouter.get(
    '/get-order-list',
    // celebrate(OrderSchema),
    // authenticateJWT,
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
    // authenticateJWT,
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
        return await createOrder(req, res)
    }
);

orderRouter.post('/create-collection', async (req, res) => {
    try {
        const orderService = new OrderService();
        const result = await orderService.createCollection(req.body);
        return responseTemplate(res).status(200).json(result);
    } catch (error) {
        return responseTemplate(res).status(500).json({message: error.message});
    }
})

orderRouter.post('/create-collection-time', async (req, res) => {
        try {
            // const { collectionTime: { start, end } } = req.body;
            const orderService = new OrderService();
            const result = undefined //await orderService.createCollectionTime();
            const getAllCollectionByTimeRange = await orderService.getAllCollectionByTimeRange(req.body);
            // console.log(getAllCollectionByTimeRange);
            return responseTemplate(res).status(200).json(result || getAllCollectionByTimeRange);
        } catch (error) {
            return responseTemplate(res).status(500).json({message: error.message});
        }
    }
)

orderRouter.post("/update-collection-time", async (req, res) => {
    try {
        // const {collectionTime: {start, end}} = req.body;
        const currentTime = new Date().getTime();
        const after30Minutes = currentTime + 30 * 60 * 1000;
        const orderService = new OrderService();
        const result = await orderService.updateCollectionTime(currentTime, after30Minutes);
        return responseTemplate(res).status(200).json(result);
    } catch (error) {
        return responseTemplate(res).status(500).json({message: error.message});
    }
})

orderRouter.get('/get-collection-time', async (req, res) => {
        try {
            const orderService = new OrderService();
            const result = await orderService.getCollectionTime();
            return responseTemplate(res).status(200).json(result);
        } catch (error) {
            return responseTemplate(res).status(500).json({message: error.message});
        }
    }
)