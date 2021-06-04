export const errorReducer = (state = {
    error: null,
}, action) => {
    if (action.type === 'ERROR_ALARM') {
        state = {
            ...state,
            error: action.error
        }
    }

    return state;
}