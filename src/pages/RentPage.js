import React, {useState, useEffect, useCallback} from 'react';
import Cookies from "js-cookie";
import moment from "moment";
import {app} from "../config/firebase";
import 'firebase/firestore';
import 'firebase/auth';
import Swal from 'sweetalert2';

export default function RentPage() {
    const [timeRange, setTimeRange] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const fillTimeRangeWithIntervals = useCallback((from = "8:00", until = "20:00") => {
            const today = moment().format('DD/MM/YYYY');

            app.firestore().collection('time_ranges')
                .limit(1).get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            const { current_date, list } = doc.data();
                            if (current_date === today) {
                                setTimeRange(list);
                            } else {
                                addTimeRange(from, until);
                                app.firestore().collection('time_ranges')
                                    .limit(1).get().then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        const { list } = doc.data();
                                        setTimeRange(list);
                                    })
                                });
                            }
                        });
                    } else {
                        addTimeRange(from, until);
                        app.firestore().collection('time_ranges')
                            .limit(1).get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                const { list } = doc.data();
                                setTimeRange(list);
                            })
                        });
                    }

                }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        },
        [],
    );

    const isSelectedByUser = (userList, user) => {
        return userList.find(item => item === user.email);
    }

    const addTimeRange = (from, until) => {
        let timeRange = [];

        let startTime = parseInt(from.split(':')[0]);
        const endTime = parseInt(until.split(':')[0]);
        const interval = (endTime - startTime) * 2;

        for (let i = 0; i <= interval; i++) {
            const current = startTime.toString();
            const value = {
                time: i % 2 === 0 ? current.concat(":00") : current.concat(":30"),
                availability: true,
                riders: 8,
                selectedBy: []
            };
            timeRange.push(value)
            if (i % 2 !== 0) {
                startTime += 1;
            }
        }

        app.firestore().collection('time_ranges').add({
            current_date: moment().format('DD/MM/YYYY'),
            list: timeRange
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    const reserveBike = async (time) => {
        const user = await app.auth().currentUser;
        const today = moment().format('DD/MM/YYYY');
        app.firestore().collection('time_ranges')
            .where('current_date', '==', today).limit(1).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { list } = doc.data();
                    const updatedRange = list.map((item) => {
                        if (item.time === time) {
                            const isSelected = isSelectedByUser(item.selectedBy, user);
                            if (isSelected) {
                                item.selectedBy = item.selectedBy.filter((item) => item !== user.email);
                                item.riders += 1;
                            }
                            else {
                                if (item.riders > 0) {
                                    item.selectedBy.push(user.email);
                                    item.riders -= 1;
                                } else if (item.riders === 0 && !item.availability) {
                                    setShowAlert(true);
                                }
                            }
                            item.availability = item.riders !== 0;
                        }
                        return item;
                    });

                    setTimeRange(updatedRange);

                    app.firestore().collection('time_ranges')
                        .doc(doc.id).update({
                        "list": updatedRange
                    })
                        .then(() => {
                            console.log("Document updated successfully!");
                        })
                        .catch((error) => {
                            console.error("Error updating document: ", error);
                        });
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }

    const isSelectedBy = (item) => {
        const user = Cookies.get('user');
        const founded = item.selectedBy.find(item => item === user)
        if (founded) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        fillTimeRangeWithIntervals();
    }, []);

    if (showAlert) {
        return (
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This hour is not available right now. Please try later again!',
            })
        );
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
                            return  <div key={index} onClick={(e) => reserveBike(e.target.innerHTML)}
                                         className={"p-2 font-bold  m-1 cursor-pointer hover:shadow-md transition-shadow "
                                         + (item.availability ? ' bg-white text-black ' : ' bg-red-500 text-white ')
                                         + (isSelectedBy(item) ? ' bg-green-500 text-white ' : ' bg-white text-black ')}>
                                { item.time }
                            </div>
                        })
                    }
                </div>
            </article>
        </section>
    );
}