import React, { useState } from 'react';
import { removeKeyword, useStoreContext } from '../store';

const ListKeyword = () => {
    const [state, dispatch] = useStoreContext();
    const [comments, setComments] = useState([]);

    const handleRemove = (index) => {
        dispatch(removeKeyword(index));
    };

    const handleSearch = () => {
        const listCommentElm = document.querySelector('#listComment');

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup-content' });
            port.postMessage({ action: 'scrapping', payload: state.keywords });

            port.onMessage.addListener((res) => {
                console.log(res);
                const liCommentElm = document.createElement('li');
                liCommentElm.innerText = res.payload.value;
                listCommentElm.appendChild(liCommentElm);
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
