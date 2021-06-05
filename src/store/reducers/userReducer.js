export const userReducer = (state = {
    user: '',
}, action) => {
    if(action.type === 'LOGIN') {
        state = {
            ...state,
            token: action.token
        }
    }
    if (action.type === 'LOGOUT') {
        state = {
            ...state,
            token: null
        }
    }

    return state;
}

