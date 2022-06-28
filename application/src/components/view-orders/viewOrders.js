import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Template } from '../../components';
import { currentOrders } from '../../redux/actions/orderActions';
import OrdersList from './ordersList';
import './viewOrders.css';

const mapActionsToProps = dispatch => ({
    retrieveCurrentOrders() {
        dispatch(currentOrders());
    }
})

const ViewOrders = (props) => {
    const { orders } = useSelector((state) => state.orders)

    useEffect(() => {
       props.retrieveCurrentOrders();
    }, [props])

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                />
            </div>
        </Template>
    );
}

export default connect(null, mapActionsToProps)(ViewOrders);