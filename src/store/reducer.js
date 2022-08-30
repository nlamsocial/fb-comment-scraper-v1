import { SET_KEYWORD_INPUT, ADD_KEYWORD, EDIT_KEYWORD, REMOVE_KEYWORD } from './constant';

const initState = {
    keyword: '',
    keywords: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_KEYWORD_INPUT:
            return {
                ...state,
                keyword: action.payload,
            };
        case ADD_KEYWORD:
            return {
                ...state,
                keywords: [...state.keywords, action.payload],
            };
        case REMOVE_KEYWORD:
            const newStateKeywords = [...state.keywords];
            newStateKeywords.splice(action.payload, 1);
            return {
                ...state,
                keywords: newStateKeywords,
            };
        default:
            throw new Error('Invalid action');
    }
};

export default reducer;
export { initState };
