import {Router} from "express";
import ExportService from "../../services/exportExcel.service.js";
import fs from "fs";
import AuthModel from "../../models/auth.model.js";

const ExcelServiceRouter = new Router();
console.log('ExcelServiceRouter path: /excel-service')
ExcelServiceRouter.get('/get-collection-as-excel', async (req, res) => {
    try {
        const exportService = new ExportService();
        const filePath = await exportService.exportToExcel(AuthModel, {}); // Pass your query
        // res.send(filePath)
        // Set headers for file download
        res.download(filePath, 'data.xlsx', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred while exporting data');
            }

            // Optionally delete the file after sending it
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting the file:', err);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while exporting data');
    }
});

export {ExcelServiceRouter};