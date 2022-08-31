chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((req) => {
        if (req.action === 'scrapping') {
            for (let i = 1; i < 5; i++) {
                const posinsetElm =
            }
        }
        port.postMessage({ status: 'successfully' });
    });
});

function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

function handleSuspendedFeed() {
    const suspendedFeedElm = document.querySelector('.suspended-feed');
    const progressbarElm = suspendedFeedElm.parentElement.querySelector('div[role="progressbar"]');
    progressbarElm.scrollIntoView();
}
