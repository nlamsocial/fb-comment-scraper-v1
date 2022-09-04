function doPost(e) {
    let response = {};

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName('comments');
    const headers = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues()[0];
    const headersOriginalOrder = headers.slice();

    const body = e.postData.contents;
    const bodyJSON = JSON.parse(body);

    const headerPassed = Object.keys(bodyJSON);
    if (!compareTwoArray_(headerPassed, headers)) {
        response = { status: 500, message: 'Invalid arguments passed', headers, headerPassed };
        return sendJSON_(response);
    }

    const arrayOfData = headersOriginalOrder.map((header) => bodyJSON[header]);

    ws.appendRow(arrayOfData);

    return sendJSON_({ arrayOfData: arrayOfData });
}

function compareTwoArray_(arr1, arr2) {
    const arr1Temp = arr1.sort();
    const arr2Temp = arr2.sort();
    if (arr1Temp.length !== arr2Temp.length) return false;
    for (let i = 0; i < arr1Temp.length; i++) {
        if (arr1Temp[i] !== arr2Temp[i]) return false;
    }
    return true;
}
