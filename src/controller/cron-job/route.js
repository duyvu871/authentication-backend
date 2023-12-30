import express from 'express';
import {celebrate} from 'celebrate';
import {OrderSchema} from "./dto.js";
import {OrderService} from "../../services/order.service.js";
import {authenticateJWT} from "../../scripts/authenticateJWT.js";
import {responseTemplate} from "../../ultis/responseWrapper.ultis.js";
import {createOrder} from "../../scripts/orderControl.js";

export const CronJobRouter = express.Router();

CronJobRouter.post('/generate-collection-time', authenticateJWT, celebrate({body: OrderSchema}), async (req, res) => {
    try {
        // const order = await createOrder(req.body);

        const orderService = new OrderService();
        const generateCollectionTime = await orderService.createCollectionTime(req.body);

        return  res.status(200).json(responseTemplate(200, 'Create order successfully', order));
    } catch (e) {
        return  res.status(400).json(responseTemplate(400, e.message, null));
    }
});
