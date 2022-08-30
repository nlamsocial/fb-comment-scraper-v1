import React from 'react';
import { removeKeyword, useStoreContext } from '../store';

const ListKeyword = () => {
    const [state, dispatch] = useStoreContext();

    const handleRemove = (index) => {
        dispatch(removeKeyword(index));
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
        </>
    );
};

export default ListKeyword;
