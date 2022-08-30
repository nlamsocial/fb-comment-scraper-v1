import { ADD_KEYWORD, EDIT_KEYWORD, REMOVE_KEYWORD, SET_KEYWORD_INPUT } from './constant';

const setKeywordInput = (payload) => {
    return {
        type: SET_KEYWORD_INPUT,
        payload,
    };
};
const addKeyword = (payload) => {
    return {
        type: ADD_KEYWORD,
        payload,
    };
};
const editKeyword = (payload) => {
    return {
        type: EDIT_KEYWORD,
        payload,
    };
};
const removeKeyword = (payload) => {
    return {
        type: REMOVE_KEYWORD,
        payload,
    };
};

export { setKeywordInput, addKeyword, editKeyword, removeKeyword };
