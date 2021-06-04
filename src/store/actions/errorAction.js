export const cleanError = () => {
    return function(dispatch) {
        dispatch({
            type: 'UPDATE_ERROR',
            error: null
        })
    }
}