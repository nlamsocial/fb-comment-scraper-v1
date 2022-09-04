function doGet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName('users');

    const data = ws.getRange('A1').getDataRegion().getValues();
    const headers = data.shift();

    const jsonArray = data.map((row) => {
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });

    const response = [{ status: 200, data: jsonArray }];
    return sendJSON_(response);
}
