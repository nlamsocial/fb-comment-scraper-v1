chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((req) => {
        if (req.action === 'scrapping') {
            console.log(req.payload);
        }
        port.postMessage({ status: 'successfully' });
    });
});
