import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import { app } from '../config/firebase';
import 'firebase/auth';
import {useDispatch} from "react-redux";
import { login } from "../store/actions/authAction";

export default function RegisterPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let history = useHistory();
    const dispatch = useDispatch();
    const loginUser = (email, password) => dispatch(login(email, password));

    const handleSubmit = (e) => {
        e.preventDefault();
        app.auth().createUserWithEmailAndPassword(email, password).then((res) => {
            loginUser(email, password);
            return history.goBack();
        }).catch(function(error) {
            // Some error occurred, you can inspect the code: error.code
            console.log(error)
            // Common errors could be invalid email and invalid or expired OTPs.

        });
    }

    return (
        <section className="bg-gray-800 text-gray-700 h-screen flex justify-center items-center">
            <article className="bg-white p-8 container text-center md:text-left rounded-lg md:w-1/2 mx-5">
                <h1 className="md:text-5xl text-4xl text-center uppercase pb-4 font-bold">Register</h1>
                <form className="flex flex-col mt-5 font-bold md:text-2xl text-xl" onSubmit={handleSubmit}>
                    <div className="flex flex-col p-4">
                        <label>Email</label>
                        <input type="text" className="text-base border-solid border-gray-700 border-2 rounded-lg p-1 mt-3 focus:rounded-lg focus:border-gray-700"
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col p-4">
                        <label>Password</label>
                        <input type="password" className="text-base border-solid border-gray-700 border-2 rounded-lg p-1 mt-3 focus:rounded-lg focus:border-gray-700"
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <Link to="/login" className="font-medium text-base text-center py-4 hover:text-green-500">I already have an account</Link>

                    <button className="self-center p-2 px-5 bg-green-500 rounded-md text-white uppercase font-bold hover:bg-green-800" type="submit">Register</button>
                </form>
            </article>
        </section>
    );
}