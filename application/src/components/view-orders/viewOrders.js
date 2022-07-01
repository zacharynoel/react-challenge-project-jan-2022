import React, { useState, useEffect } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);

    const RELOAD_LIMIT = 12;
    let interval = 5;
    let countdown = 0;

    const onIntervalChange = (event) => {
        if (!isNaN(event.target.value)) {
            interval = event.target.value;
        }
    }

    const fetchOrders = async () => {
        // fetch orders
        await fetch(`${SERVER_IP}/api/current-orders`)
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                setOrders(response.orders);
            } else {
                console.log('Error getting orders');
            }
        }).catch(() => {
            console.log('Error fetching orders');
        });

        // keep track in console each request
        console.log('Fetched orders')
    }
    
    const startLiveReload = async () => {
        await fetch(`${SERVER_IP}/api/live-mode`, {
            method: 'POST',
            body: JSON.stringify({
                time: interval
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch(() => {
            console.log('Error starting live reload mode');
        });

        if (!interval) {
            // if interval is not set, default to 5
            interval = 5;
        }

        // set the countdown to time before starting
        countdown = interval * RELOAD_LIMIT;
        document.getElementById("countdown").innerHTML = 'Countdown: ' + countdown;

        const commenceRefresh = setInterval(async () => {
            fetchOrders();
        }, interval * 1000);

        const commenceCountdown = setInterval(() => {
            // decrement our countdown
            countdown -= 1;
            document.getElementById("countdown").innerHTML = 'Countdown: ' + countdown;
        }, 1000)

        setTimeout(() => {
            // stop refreshing
            clearInterval(commenceRefresh);

            // stop the countdown
            clearInterval(commenceCountdown);
        }, interval * RELOAD_LIMIT * 1000)
    }

    return (
        <Template>
            <div>
                <input className="live-reload-input" type="text" id="duration" placeholder="Interval in seconds" onChange={e => onIntervalChange(e)}></input>
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