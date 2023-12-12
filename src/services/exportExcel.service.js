import mongoose from 'mongoose';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import AppConfig from "../configs/app.config.js";

// Service class to handle the logic
class ExportService {
    async exportToExcel(model, query) {
        // Query the data from MongoDB
        const data = await model.find(query).lean();

        // Convert to Excel format
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');

        // Define file path
        const filePath = path.join(AppConfig.rootPath, 'src/storage/temp', 'data.xlsx');

        // Write workbook to file system
        xlsx.writeFile(workbook, filePath);

        return filePath;
    }
}

export default ExportService;