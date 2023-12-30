import cron from 'node-cron';
import fs from 'fs';
import fetch from 'node-fetch';
import { OrderService } from "./services/order.service.js";

const testCron = async () => {
    const orderService = new OrderService();
    console.log('cron started')
    cron.schedule('*/3 * * * *', () => {
        const collectionTime = {
            timeStart: new Date().getTime(),
            timeEnd: new Date().getTime() + 180 // 3 minutes
        }
        orderService.createCollectionTime(collectionTime);
    })
}

export default testCron;