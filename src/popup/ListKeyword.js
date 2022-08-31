import React from 'react';
import { removeKeyword, useStoreContext } from '../store';

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
                console.log(res);
            });
        });
    };

    return (
        <>
            <ul>
                {state.keywords.map((keyword, index) => (
                    <li key={index}>
                        {keyword} <span onClick={() => handleRemove(index)}>&#10006;</span>
                    </li>
                ))}
            </ul>
            <button onClick={handleSearch}>Search</button>
        </>
    );
};

export default ListKeyword;
