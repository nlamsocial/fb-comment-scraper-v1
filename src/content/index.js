chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (req) => {
        if (req.action === 'scrapping') {
            for (let i = 1; i < 5; i++) {
                let posinset = null;
                if (document.querySelector(`div[aria-posinset="${i}"]`)) {
                    posinset = await waitForElm(`div[aria-posinset="${i}"]`);
                } else {
                    handleSuspendedFeed();
                    posinset = await waitForElm(`div[aria-posinset="${i}"]`);
                }

                const ulElms = posinset.querySelectorAll('ul');
                if (ulElms.length > 1) {
                    const comments = ulElms[0].querySelectorAll('span[lang="vi-VN"]');
                    const btnMoreElm = comments.querySelectorAll('div[role="button"]');
                    if (btnMoreElm) btnMoreElm[0].click();
                    console.log(comments);
                }
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

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
