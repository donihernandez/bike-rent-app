import React from 'react';
import { Link } from "react-router-dom";

export default function NavBarComponent() {
    return (
        <header className="p-6">
            <nav>
                <ul className="flex justify-end">
                    <li className="p-5 uppercase text-1xl font-bold">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="p-5 uppercase text-1xl font-bold">
                        <Link to="/rent">Rent</Link>
                    </li>
                    <li className="p-5 uppercase text-1xl font-bold">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="p-5 uppercase text-1xl font-bold">
                        <Link to="/login">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}