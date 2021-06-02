export const ridersReducer = (state = {
    list: [],
    current_date: ''
}, action) => {
    if (action.type === 'FILL') {
        state = {
            ...state,
            current_date: action.current_date,
            list: action.list
        }
    }
    if (action.type === 'UPDATE') {
        state = {
            ...state,
            list: action.list
        }
    }

    return state;
}