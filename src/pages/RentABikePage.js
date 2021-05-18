import React, { useState, useEffect } from 'react';

export default function RentABikePage() {
    const [timeRange, setTimeRange] = useState([]);
    const [riders, setRiders] = useState(8);
    const [showAlert, setShowAlert] = useState(false);

    const fillTimeRangeWithIntervals = (from, until) => {
        let startTime = parseInt(from.split(':')[0]);
        const endTime = parseInt(until.split(':')[0]);
        const interval = (endTime - startTime) * 2;

        for (let i = 0; i <= interval; i++) {
            const current = startTime.toString();
            const value = {
                time: i%2 === 0 ? current.concat(":00") : current.concat(":30"),
                availability: true
            };
            setTimeRange(timeRange => [...timeRange, value])
            if (i%2 !== 0) {
                startTime += 1;
            }
        }
    }

    const reserveBike = (e) => {
        console.log(riders);
        if (riders === 0) {
            setShowAlert(true);
        } else {
            let updatedRange = [...timeRange];
            updatedRange = updatedRange.map((item) => {
                if (item.time === e.target.innerHTML) {
                    item.availability = !item.availability;
                    if (!item.availability) {
                        setRiders(riders - 1);
                    } else {
                        setRiders(riders + 1);
                    }
                }
                return item;
            });

            setTimeRange(updatedRange);
        }

    }

    useEffect(() => {
        if (timeRange.length === 0) {
            fillTimeRangeWithIntervals("8:00", "20:00");
        }
    }, [timeRange.length]);


    return (
        <article className="bg-white text-center rounded-2xl p-5 lg:w-1/3 w-1/2 m-4 flex flex-col justify-center items-center">
            <h1 className="font-extrabold text-gray-800 text-4xl pt-4 pb-4 uppercase">Rent a Bike</h1>
            <div className="grid grid-cols-3 lg:grid-cols-5">
                {
                    timeRange.map((item, index) => {
                        return <div onClick={(e) => reserveBike(e)} key={index}
                                    className={"p-2 font-bold text-white m-1 cursor-pointer hover:shadow-md transition-shadow "
                                    + (item.availability ? 'bg-green-500' : 'bg-red-500')}>
                            { item.time }
                        </div>
                    })
                }
            </div>

            {
                showAlert ? <div>

                    </div>
                    : ''
            }
        </article>
    );
}