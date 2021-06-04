import React, {useState} from 'react';
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ArrowLeftIcon} from "@heroicons/react/outline";
import {login} from "../store/actions/authAction";
import {cleanError} from "../store/actions/errorAction";
import Swal from 'sweetalert2'

export default function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [ redirect, setRedirect ] = useState(false);
    const error = useSelector(state => state.errorReducer.error);

    const dispatch = useDispatch();
    const loginUser = (email, password) => dispatch(login(email, password));
    const clean = () => dispatch(cleanError());

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(email, password);

        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })

            clean();
        } else {
           clean();
           setRedirect(true);
        }
    }

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <section className="bg-gray-800 text-gray-700 h-screen flex flex-col justify-center items-center">
                <Link to="/" className="text-white flex justify-center items-center pb-3"> <ArrowLeftIcon className="h-4 w-4 mr-2"/> Back To Home</Link>
                <article className="bg-white p-8 container text-center md:text-left rounded-lg md:w-1/2 mx-5">
                    <h1 className="md:text-5xl text-4xl text-center uppercase pb-4 font-bold">Login</h1>
                    <form className="flex flex-col mt-5 font-bold md:text-2xl text-xl" onSubmit={handleSubmit}>
                        <div className="flex flex-col p-4">
                            <label>Email</label>
                            <input type="text" className="border-solid border-gray-700 border-2 text-base rounded-lg p-1 mt-3 focus:rounded-lg focus:border-gray-700"
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex flex-col p-4">
                            <label>Password</label>
                            <input type="password" className="border-solid border-gray-700 border-2 text-base rounded-lg p-1 mt-3 focus:rounded-lg focus:border-gray-700"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <Link to="/register" className="font-medium text-base text-center py-4 hover:text-green-500">I don't have an account. Create account</Link>

                        <button className="self-center p-2 px-5 bg-green-500 md:w-1/3 rounded-md text-white uppercase font-bold hover:bg-green-800" type="submit">Login</button>
                    </form>
                </article>
            </section>
        </div>
    );
}