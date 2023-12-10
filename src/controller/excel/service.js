import xlsx from "xlsx";

class ExcelWriter {
    constructor() {
        this.excel = excel;
        this.workbook = new this.excel.Workbook();
        this.worksheet = this.workbook.addWorksheet('Sheet 1');
        this.row = 1;
        this.col = 1;
    }

    write(data) {
        this.worksheet.cell(this.row, this.col).string(data);
        this.col++;
    }

    newLine() {
        this.row++;
        this.col = 1;
    }

    save(filename) {
        this.workbook.write(filename);
    }


}