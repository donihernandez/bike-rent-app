import {app} from '../../config/firebase';
import 'firebase/firestore';
import 'firebase/auth';
import moment from 'moment';

export const fillTimeRangeWithIntervals = (from = "8:00", until = "20:00") => {
    return function(dispatch) {
        const today = moment().format('DD/MM/YYYY');

        app.firestore().collection('time_ranges')
            .limit(1).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const { current_date, list } = doc.data();
                        if (current_date === today) {
                            dispatch({
                                type: 'FILL',
                                current_date,
                                list
                            })
                        } else {
                            addTimeRange(from, until);
                            app.firestore().collection('time_ranges')
                                .limit(1).get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    const { current_date, list } = doc.data();
                                    dispatch({
                                        type: 'FILL',
                                        current_date,
                                        list
                                    })
                                })
                            });
                        }
                    });
                } else {
                    addTimeRange(from, until);
                    app.firestore().collection('time_ranges')
                        .limit(1).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const { current_date, list } = doc.data();
                            dispatch({
                                type: 'FILL',
                                current_date,
                                list
                            })
                        })
                    });
                }

            }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
}

export const reserveBike = (time, user) => {
    return function(dispatch) {
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
                                item.selectedBy = item.selectedBy.filter((item) => {
                                    if (item !== user.email) {
                                        return item;
                                    }
                                });
                                item.riders += 1;
                            } else {
                                if (item.riders > 0) {
                                    item.selectedBy.push(user.email);
                                    item.riders -= 1;
                                }
                            }
                            item.availability = item.riders !== 0;
                            return item;
                        }
                     });

                    dispatch({
                        type: 'UPDATE',
                        list: updatedRange
                    });

                    app.firestore().collection('time_ranges')
                        .doc(doc.id).update({
                            list: updatedRange
                    })
                        .then((docRef) => {
                        console.log("Document updated: ", docRef.id);
                    })
                        .catch((error) => {
                        console.error("Error updating document: ", error);
                    });;

                })
            }).catch((error) => {
            console.log("Error getting documents: ", error);
        })
    }
}

const isSelectedByUser = (userList, user) => {
    return userList.find(item => {
        if (item === user.email) {
            return true;
        }
    });
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