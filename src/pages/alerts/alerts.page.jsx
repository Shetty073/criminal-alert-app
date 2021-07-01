import React, { useState, useEffect } from 'react';
import { firestore } from "../../firebase";
import { MyListLoader } from '../../components/loaders/listloader.component';
import Alert from '../../components/alert/alert.component';
import EmptyResponse from '../../components/emptyresponse/emptyresponse.component';


function Alerts() {
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [alertslist, setAlertsList] = useState([]);

    useEffect(() => {
        const alertsDb = firestore.collection('alerts').orderBy('uploadedon', 'desc');
        const unsubscribe = alertsDb.onSnapshot( snapshot => {
            if (snapshot.size) {
                // we have something
                setLoading(false);
                const updatedAlerts = snapshot.docs.map(updatedAlert => updatedAlert.data());
                setAlertsList(updatedAlerts);
            } else {
                // it's empty
                setLoading(false);
                setEmpty(true);
            }
        });

        return unsubscribe;
    }, []);

    const alerts = alertslist.map((alert, index) => {
        return (<Alert key={index} alert={alert} />);
    });

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h5 className="mt-3">Alerts</h5>
            <hr />

            <div className="mt-3">

                {loading ? <MyListLoader /> : <>
                
                    {empty ? <EmptyResponse /> : alerts}

                </>}

            </div>

        </main>
    );
}

export default Alerts;
