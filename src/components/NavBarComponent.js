import React, {useRef, Fragment, useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { MenuAlt1Icon, XCircleIcon } from "@heroicons/react/outline";
import {useDispatch} from "react-redux";
import { logout } from '../store/actions/authAction';
import { app } from '../config/firebase';
import 'firebase/auth';

export default function NavBarComponent() {

    const [user, setUser] = useState('');
    const navMenu = useRef(null)

    const [redirect, setRedirect] = useState(false);
    
    const dispatch = useDispatch();
    const logoutAction = () => dispatch(logout());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const logged = await app.auth().currentUser
        setUser(logged);
    }, [])

    const showMenu = () => {
        navMenu.current.style.left = '0'
    }

    const hideMenu = () => {
        navMenu.current.style.left = '-100%'
    }

    const logoutUser = async () => {
        await logoutAction();
        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to="/"/>
    }

    return (
        <header className="h-12 md:h-16 p-5 md:p-10 text-white fixed top-0 left-0 w-full flex justify-between items-center bg-gray-800">
            <div className="uppercase text-2xl font-bold">
                <h4>RentU<span className="text-red-500">Ride</span></h4>
            </div>

            <MenuAlt1Icon className="h-10 w-10 cursor-pointer md:hidden" id="menu-icon" onClick={showMenu}/>

            <nav className="hidden md:flex">
                <ul className="flex flex-row translate-y-0 space-x-6 items-center justify-end pr-3">
                    <li className="uppercase hover:text-green-500 transition ease-out duration-200 delay-200 text-1xl font-bold">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="uppercase hover:text-green-500 transition ease-out duration-200 delay-200 text-1xl font-bold">
                        <Link to="/rent">Rent</Link>
                    </li>
                    {
                        !user ? <>
                                <li className="uppercase hover:text-green-500 transition ease-out duration-200 delay-200 text-1xl font-bold">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="uppercase bg-green-500 hover:bg-green-700 cursor-pointer p-3 rounded-lg transition ease-out duration-200 delay-200 text-1xl font-bold">
                                    <Link to="/register">Register</Link>
                                </li>
                            </> :
                            <li onClick={logoutUser} className="uppercase hover:text-green-500  cursor-pointer transition ease-out duration-200 delay-200 text-1xl font-bold">
                               Logout
                            </li>
                    }

                </ul>
            </nav>

            <nav className="md:hidden fixed top-0 -left-full bg-gray-800 w-full h-screen z-10 pt-6 pb-6 transition-all duration-500" ref={navMenu}>
                <XCircleIcon className="h-10 w-10 absolute right-8 cursor-pointer" onClick={hideMenu}/>
                <div className="flex flex-col justify-center text-2xl font-bold uppercase text-center items-center h-full">
                    <ul>
                        <li className="mt-6 mb-10 hover:text-green-500 transition-all ease-out duration-200 delay-300" onClick={hideMenu}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="mt-6 mb-10 hover:text-green-500 transition-all ease-out duration-200 delay-300" onClick={hideMenu}>
                            <Link to="/rent">Rent</Link>
                        </li>
                        {
                            !user ? <>
                                    <li className="mt-6 mb-10 hover:text-green-500 transition-all ease-out duration-200 delay-300" onClick={hideMenu}>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li className="mt-6 mb-10 hover:bg-green-700 bg-green-500 p-3 rounded-lg transition-all ease-out duration-200 delay-300" onClick={hideMenu}>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </> :
                                <li onClick={logoutUser} className="mt-6 cursor-pointer mb-10 hover:text-green-500 transition-all ease-out duration-200 delay-300">
                                    Logout
                                </li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
}