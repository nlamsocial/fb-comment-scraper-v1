chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (req) => {
        if (req.action === 'scrapping') {
            const comments = [];
            for (let i = 1; i < 20; i++) {
                let posinset = null;
                if (document.querySelector(`div[aria-posinset="${i}"]`)) {
                    posinset = await waitForElm(`div[aria-posinset="${i}"]`);
                } else {
                    handleSuspendedFeed();
                    posinset = await waitForElm(`div[aria-posinset="${i}"]`);
                }

                //scan comments
                const ulElms = posinset.querySelectorAll('ul');

                if (ulElms.length > 1) {
                    ulElms[0].parentElement.setAttribute('id', `parent-ul-${i}`);
                    const parentUlElm = document.querySelector(`#parent-ul-${i}`);
                    const btnBox = parentUlElm.querySelectorAll(`#parent-ul-${i} > div`)[1];
                    btnBox.setAttribute('id', `btn-box-${i}`);
                    if (btnBox.querySelectorAll('div').length > 0) {
                        const btnElms = btnBox.querySelectorAll(`#btn-box-${i} > div`);
                        if (btnElms.length > 1) {
                            let btn = btnElms[1].querySelector('div[role="button"]');
                            btn.click();
                            const menuElm = await waitForElm('div[role="menu"]');
                            const menuItems = menuElm.querySelectorAll('div[role="menuitem"]');
                            menuItems[2].click();
                            // await sleep(1000);
                        }
                        let btn = btnElms[0].querySelector('div[role="button"]');
                        btn.click();
                        await sleep(2000);
                    }

                    const commentsElm = ulElms[0].querySelectorAll('span[lang="vi-VN"]');
                    [...commentsElm].map(async (commentElm) => {
                        const comment = {};
                        const btnReadMoreElms = commentElm.querySelectorAll('div[role="button"]');
                        if (btnReadMoreElms.length > 0) {
                            btnReadMoreElms[0].click();
                            await sleep(1000);
                            port.postMessage({
                                status: 'successfully',
                                posinset: i,
                                payload: {
                                    url: commentElm.parentElement.parentElement.querySelector('a').getAttribute('href'),
                                    value: commentElm.innerText,
                                },
                            });
                        } else {
                            port.postMessage({
                                status: 'successfully',
                                posinset: i,
                                payload: {
                                    url: commentElm.parentElement.parentElement.querySelector('a').getAttribute('href'),
                                    value: commentElm.innerText,
                                },
                            });
                        }
                    });
                }
            }
        }
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
