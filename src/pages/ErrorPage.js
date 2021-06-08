import React from 'react';
import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (
        <section className="flex justify-center items-center h-screen">
            <h1 className="text-6xl font-bold font-Nunito">404</h1>
            <Link className="text-blue-600 font-bold cursor-pointer" to="/">Go Home</Link>
        </section>
    );
}