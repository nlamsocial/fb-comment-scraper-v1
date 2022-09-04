function sendJSON_(response) {
    const contService = ContentService.createTextOutput(JSON.stringify(response));
    contService.setMimeType(ContentService.MimeType.JSON);
    return contService;
}
