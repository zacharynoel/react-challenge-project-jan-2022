import React, { useState, useEffect } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);

    let time = 5;
    let countdown = 0;

    const onTimeChange = (event) => {
        if (!isNaN(event.target.value)) {
            time = event.target.value;
        }
    }

    const startLiveReload = () => {
        fetch(`${SERVER_IP}/api/live-mode`, {
            method: 'POST',
            body: JSON.stringify({
                time
            }),
        })
        .then(response => response.json())

        if (!time) {
            // if time is not set, default to 5
            time = 5;
        }

        // set the countdown to time before starting
        countdown = time;
        document.getElementById("countdown").innerHTML = 'Countdown: ' + countdown;

        const commenceRefresh = setInterval(() => {
            // fetch orders
            fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setOrders(response.orders);
                } else {
                    console.log('Error getting orders');
                }
            });

            // keep track in console each request
            console.log('Fetched orders')

            // decrement our countdown
            countdown -= 1;
            document.getElementById("countdown").innerHTML = 'Countdown: ' + countdown;
        }, 1000);

        setTimeout(() => {
            // stop refreshing
            clearInterval(commenceRefresh);
        }, time * 1000)
    }

    return (
        <Template>
            <div>
                <input className="live-reload-duration" type="text" id="duration" placeholder="Duration in seconds" onChange={e => onTimeChange(e)}></input>
                <label className="live-reload-countdown" id="countdown">Countdown: {countdown}</label>
            </div>
            <button className="start-live-reload-btn" onClick={() => startLiveReload()}>Start Live Reload</button>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                />
            </div>
        </Template>
    );
}