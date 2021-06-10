import React from 'react';
import Motorcycle from '../static/images/Motorcycle.png'
import Rider from '../static/images/Motorcycle Rider.H03.2k-min.png'
import {NavLink} from "react-router-dom";
import Layout from "../layout/Layout";

export default function HomePage() {
    return (
        <Layout>
            <section className="h-screen bg-gray-800 text-white p-10 flex flex-col md:flex-row justify-center items-center">
                <div className="md:w-1/2 md:pl-6 md:pr-4">
                    <h1 data-testId="header" className="text-6xl md:text-7xl font-bold pt-0 pb-8">Rent your <span className="text-red-500">Ride</span></h1>
                    <p className="text-justify mb-10">
                        Get the journey of your life, get a bike, get your ride. We're the best motorcycle providers of the entire country.
                    </p>
                    <NavLink to="/rent" className=" p-4 bg-green-600 rounded-md text-white uppercase font-bold hover:bg-green-800 transition-all delay-200 duration-200">
                        Hire a Rider
                    </NavLink>
                </div>
                <div className="hidden md:flex md:w-1/2">
                    <img className="object-contain w-full" src={Motorcycle} alt="Motorcycle" />
                </div>
            </section>
            <section className="h-screen bg-white p-10 flex flex-col md:flex-row justify-center items-center">
                <div className="hidden md:flex md:w-1/2">
                    <img className="object-contain w-full" src={Rider} alt="Rider" />
                </div>
                <div className="md:w-1/2 md:pl-6 md:pr-4">
                    <h2 className="text-6xl md:text-7xl pt-0 pb-8 font-bold">Our Riders</h2>
                    <p className="text-justify">
                        We have 8 riders every 30 minutes! You'll be able to hire as much as you can. Also we provide some
                        different routes that you can use in your trip. We hope that you really enjoy our services!
                    </p>
                </div>
            </section>
        </Layout>
    );
}