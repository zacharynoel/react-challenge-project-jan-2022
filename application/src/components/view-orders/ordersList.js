import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteOrder } from '../../redux/actions/orderActions';

const mapActionsToProps = dispatch => ({
    commenceDeleteOrder(order) {
        dispatch(deleteOrder(order._id));
    }
})

const OrdersList = (props) => {
    let history = useHistory();

    const { orders } = props;
    if (!props || !props.orders || !props.orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

    const promptEditForm = (order) => {
        history.push({
            pathname: '/order',
            state: { order }
        });
    }

    const deleteOrder = (order) => {
       props.commenceDeleteOrder(order);
    }

    return orders.map(order => {
        const createdDate = new Date(order.createdAt);
        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    <h2>{order.order_item}</h2>
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                    <p>Quantity: {order.quantity}</p>
                </div>
                <div className="col-md-4 view-order-right-col">
                    <button className="btn btn-success" onClick={() => promptEditForm(order)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteOrder(order)}>Delete</button>
                </div>
            </div>
        );
    });
}

export default connect(null, mapActionsToProps)(OrdersList);