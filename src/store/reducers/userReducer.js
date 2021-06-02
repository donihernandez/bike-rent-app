export const userReducer = (state = {
    user: '',
    token: null
}, action) => {
    if(action.type === 'LOGIN') {
        state = {
            ...state,
            user: action.user,
            token: action.token
        }
    }
    if (action.type === 'LOGOUT') {
        state = {
            ...state,
            user: '',
            token: null
        }
    }

    return state;
}

