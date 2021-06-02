import { app } from '../../config/firebase';
import 'firebase/auth';
import Cookies from 'js-cookie';

export const login = (email, password) => {
    return async function (dispatch) {
        app.auth().signInWithEmailAndPassword(email, password).then(async (res) => {
            const { user } = res;
            const token = await user.getIdToken()
            const expirationTime = new Date(new Date().getTime() + 180 * 60 * 1000);

            Cookies.set('token', token, expirationTime)

            dispatch({
                type: 'LOGIN',
                user,
                token
            })

        }).catch(function(error) {
            // Some error occurred, you can inspect the code: error.code
            console.log(error)
            // Common errors could be invalid email and invalid or expired OTPs.

        });
    }
}

export const logout = () => {
    return function (dispatch) {
        Cookies.remove('token');
        dispatch({
            type: 'LOGOUt',
        })
    }
}
