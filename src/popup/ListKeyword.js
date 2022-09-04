import React from 'react';
import { removeKeyword, useStoreContext } from '../store';
import { POST } from '../apis';

console.log('listkeyword');

const ListKeyword = () => {
    const [state, dispatch] = useStoreContext();
    const handleRemove = (index) => {
        dispatch(removeKeyword(index));
    };

    const handleSearch = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup-content' });
            port.postMessage({ action: 'scrapping', payload: state.keywords });

            port.onMessage.addListener((res) => {
                const data = {
                    username: res.payload.userName,
                    userurl: 'https://www.facebook.com/' + res.payload.userUrl,
                    content: res.payload.content,
                };

                POST(data);

                const listCommentElm = document.querySelector('#listComment');
                const commentUl = document.createElement('ul');
                commentUl.style.borderBottom = '1px solid #ccc';
                commentUl.style.listStyleType = 'none';

                commentUl.innerHTML = `
                    <li>
                        <h5>${res.payload.feed}-${res.payload.commentIndex} 
                            <a href='https://fb.com/${res.payload.userUrl}'>
                                ${res.payload.userName}
                            </a>
                        </h5>
                    </li>
                    <li style=''padding-left:10px;>
                        ${res.payload.content}
                    </li>`;
                listCommentElm.appendChild(commentUl);
            });
        });
    };

    return (
        <>
            <ul id="listKeyword">
                {state.keywords.map((keyword, index) => (
                    <li key={index}>
                        {keyword} <span onClick={() => handleRemove(index)}>&#10006;</span>
                    </li>
                ))}
            </ul>
            <button onClick={handleSearch}>Search</button>
            <ul id="listComment"></ul>
        </>
    );
};

export default ListKeyword;
