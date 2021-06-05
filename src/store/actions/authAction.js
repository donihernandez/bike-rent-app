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
            Cookies.set('user', user.email, expirationTime)

            dispatch({
                type: 'LOGIN',
                token
            })

        }).catch(function(error) {
            dispatch({
                type: 'ERROR_ALARM',
                error
            })
        });
    }
}

export const logout = () => {
    return function (dispatch) {
        app.auth().signOut().then(() => {
            Cookies.remove('token');
            Cookies.remove('user');
            dispatch({
                type: 'LOGOUt',
            })
        }).catch((error) => {
            console.log(error)
        });
    }
}
