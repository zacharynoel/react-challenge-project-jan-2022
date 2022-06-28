import { SERVER_IP } from '../../private'
import { CURRENT_ORDERS } from './types';

const finishRetrievingOrders = (orders) => {
    return {
        type: CURRENT_ORDERS,
        payload: {
            orders
        }
    }
}

// actions below

export const addOrder = (order_item, quantity, ordered_by) => {
    return() => {
        fetch(`${SERVER_IP}/api/add-order`, {
            method: 'POST',
            body: JSON.stringify({
                order_item,
                quantity,
                ordered_by
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    };
}

export const editOrder = (id, order_item, quantity, ordered_by) => {
    return () => {
        fetch(`${SERVER_IP}/api/edit-order`, {
            method: 'POST',
            body: JSON.stringify({
                id,
                order_item,
                ordered_by,
                quantity
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
    };
}

export const deleteOrder = (id) => {
    return () => {
        fetch(`${SERVER_IP}/api/delete-order`, {
            method: 'POST',
            body: JSON.stringify({
                id
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
    };
}

export const currentOrders = () => {
    return (dispatch) => {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    dispatch(finishRetrievingOrders(response.orders));
                } else {
                    console.log('Error getting orders');
                }
            });
    }
}
