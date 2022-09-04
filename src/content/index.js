chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (req) => {
        if (req.action === 'scrapping') {
            const keywords = new RegExp(handleToRegex(req.payload));

            for (let i = 1; i < 100; i++) {
                let posinset = null;
                if (document.querySelector(`div[aria-posinset="${i}"]`)) {
                    posinset = await waitForElm(`div[aria-posinset="${i}"]`);
                } else {
                    handleSuspendedFeed();
                    posinset = await waitForElm(`div[aria-posinset="${i}"]`);
                }
                const listUl = await waitForChildElms(posinset, 'ul');
                if (listUl.length > 1) {
                    {
                        {
                            const commentList = await waitForChildElm(posinset, 'ul');
                            const commentSeccion = commentList.parentElement;
                            commentSeccion.setAttribute('id', `comment-seccion-${i}`);
                            const commentSeccionChildDivTags = await waitForChildElms(
                                commentSeccion,
                                `#comment-seccion-${i} > div`,
                            );
                            if (commentSeccionChildDivTags) commentSeccionChildDivTags[0].scrollIntoView();
                            const btnList = await waitForChildElms(commentSeccionChildDivTags[1], 'div[role="button"]');
                            if (btnList[1]) {
                                btnList[1].click();
                                const menu = await waitForElm('div[role="menu"]');
                                const listType = await waitForChildElms(menu, 'div[role="menuitem"]');
                                listType[2].click();
                                await sleep(1000);
                            }
                        }
                        {
                            const commentList = await waitForChildElm(posinset, 'ul');
                            const commentSeccion = commentList.parentElement;
                            commentSeccion.setAttribute('id', `comment-seccion-${i}`);
                            const commentSeccionChildDivTags = await waitForChildElms(
                                commentSeccion,
                                `#comment-seccion-${i} > div`,
                            );
                            if (commentSeccionChildDivTags) commentSeccionChildDivTags[0].scrollIntoView();

                            const btnList = await waitForChildElms(commentSeccionChildDivTags[1], 'div[role="button"]');
                            if (btnList[0]) {
                                btnList[0].click();
                            }
                        }
                    }
                    {
                        const commentBox = await waitForChildElm(posinset, 'ul');
                        const commentSeccion = commentBox.parentElement;
                        commentSeccion.setAttribute('id', `comment-seccion-${i}`);
                        await sleep(5000);
                        const commentWrapper = await waitForChildElm(commentSeccion, `#comment-seccion-${i} > ul`);
                        commentWrapper.scrollIntoView();
                        commentWrapper.setAttribute('id', `comment-wrapper-${i}`);
                        const listComment = await waitForChildElms(commentWrapper, `#comment-wrapper-${i} > li`);
                        let commentIndex = 0;
                        [...listComment].map(async (comment) => {
                            const content = await waitForChildElm(comment, 'span[lang="vi-VN"]');
                            if (content) {
                                content.scrollIntoView();
                                const user = content.parentElement.parentElement.querySelector('a');
                                const readmore = content.querySelector('div[role="button"]');
                                readmore ? readmore.click() : readmore;
                                await sleep(500);
                                commentIndex += 1;
                                console.log(content.innerText);
                                if (content.innerText.search(keywords) >= 0) {
                                    port.postMessage({
                                        payload: {
                                            feed: i,
                                            commentIndex,
                                            userName: user.innerText,
                                            userUrl: user.getAttribute('href'),
                                            content: content.innerText,
                                        },
                                    });
                                }
                            }
                        });
                    }
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
function waitForChildElm(prentElm, selector) {
    return new Promise((resolve) => {
        if (prentElm.querySelector(selector)) {
            return resolve(prentElm.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (prentElm.querySelector(selector)) {
                resolve(prentElm.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(prentElm, {
            childList: true,
            subtree: true,
        });
    });
}
function waitForChildElms(prentElm, selector) {
    return new Promise((resolve) => {
        if (prentElm.querySelectorAll(selector)) {
            return resolve(prentElm.querySelectorAll(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (prentElm.querySelectorAll(selector)) {
                resolve(prentElm.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(prentElm, {
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

function handleToRegex(array) {
    const newArray = [];
    array.forEach((item) => {
        newArray.push(`(${item})`);
    });
    return `${newArray.join('|')}`;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
