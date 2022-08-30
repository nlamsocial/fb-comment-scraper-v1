import React, { useRef } from 'react';
import { setKeywordInput, addKeyword, useStoreContext } from '../store';

const EnterKeyword = () => {
    const keywordInputRef = useRef();
    const [state, dispatch] = useStoreContext();
    const handleInput = () => {
        dispatch(addKeyword(state.keyword));
        dispatch(setKeywordInput(''));
        keywordInputRef.current.focus();
    };

    return (
        <>
            <input
                ref={keywordInputRef}
                onChange={(e) => dispatch(setKeywordInput(e.target.value))}
                value={state.keyword}
            />
            <button onClick={handleInput}>Submit</button>
        </>
    );
};

export default EnterKeyword;
