import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fillTimeRangeWithIntervals, reserveBike} from "../store/actions/ridersAction";

export default function RentPage() {
    const [timeRange, setTimeRange] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const from = '8:00';
    const until = '20:00'
    const dispatch = useDispatch();
    const fillInterval = (from, until) => dispatch(fillTimeRangeWithIntervals(from, until));

    const list = useSelector(state => state.ridersReducer.list);
    const user = useSelector(state => state.userReducer.user);

    const rentBike = (time, user) => dispatch(rentBike(time, user))

    useEffect(async () => {
        await fillInterval(from, until);
        setTimeRange(list);
    }, [list]);

    const reserveBike = async (e, user) => {
       await rentBike(e.target.value, user);
    }

    const isSelected = (selectedByList) => {
        const founded = selectedByList.find(item => {
            if (item === user.email) {
                return item;
            }
        })

        return !!founded;
    }

    return (
        <section className="flex justify-center items-center flex-col p-5 bg-white h-screen">
            <div className="md:py-10 mt-8 mb-6 text-center">
                <h1 className="md:text-6xl text-5xl font-bold">Rent a <span className="text-red-500">Rider</span></h1>
            </div>
            <article className="bg-gray-800 text-center rounded-2xl p-5 container">
                <div className="grid grid-cols-3 lg:grid-cols-5">
                    {
                        timeRange.map((item, index) => {
                            return <div onClick={(e) => reserveBike(e)} key={index}
                                        className={"p-2 font-bold text-white m-1 cursor-pointer hover:shadow-md transition-shadow "
                                        + (item.availability ? 'bg-white text-black' : 'bg-red-500')
                                        + (isSelected(item.selectedBy) ? 'bg-green-500' : 'bg-white text-black')}>
                                { item.time }
                            </div>
                        })
                    }
                </div>
            </article>
        </section>
    );
}