import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Template } from '../../components';
import { addOrder, editOrder } from '../../redux/actions/orderActions';
import './orderForm.css';

const mapActionsToProps = dispatch => ({
    commenceAddOrder(order_item, quantity, ordered_by) {
        dispatch(addOrder(order_item, quantity, ordered_by));
    },
    commenceEditOrder(id, order_item, quantity, ordered_by) {
        dispatch(editOrder(id, order_item, quantity, ordered_by));
    }
})

const OrderForm = (props) => {
    const [orderItem, setOrderItem] = useState("");
    const [quantity, setQuantity] = useState("1");

    const menuItemChosen = (event) => setOrderItem(event.target.value);
    const menuQuantityChosen = (event) => setQuantity(event.target.value);

    const auth = useSelector((state) => state.auth);

    /**
     * If we have state passed in from clicking the 'Edit' button on the
     * view-orders page, then we are using this form to edit rather than create
     */
    const editingOrder = props.location.state;
    const orderButtonText = () => {
        return editingOrder ? 'Edit Order!' : 'Order It!';
    }
    const orderHeader = () => {
        return editingOrder ? 'Editing my order...' : 'I\'d like to order...';
    }

    const orderAction = () => {
        if(editingOrder) {
            // _id and ordered_by are not edited, those remain the same
            const ordered_by = props.location.state.order.ordered_by;
            const id = props.location.state.order._id;
            props.commenceEditOrder(id, orderItem, quantity, ordered_by);
        } else {
            const ordered_by = auth.email || 'Unknown!';
            props.commenceAddOrder(orderItem, quantity, ordered_by);
        }
    }

    return (
        <Template>
            <div className="form-wrapper">
                <form>
                    <label className="form-label">{orderHeader()}</label><br />
                    <select 
                        value={orderItem} 
                        onChange={(event) => menuItemChosen(event)}
                        className="menu-select"
                    >
                        <option value="" defaultValue disabled hidden>Lunch menu</option>
                        <option value="Soup of the Day">Soup of the Day</option>
                        <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                        <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                        <option value="Chili Con Carne">Chili Con Carne</option>
                    </select><br />
                    <label className="qty-label">Qty:</label>
                    <select value={quantity} onChange={(event) => menuQuantityChosen(event)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <button type="button" className="order-btn" onClick={() => orderAction()}>{orderButtonText()}</button>
                </form>
            </div>
        </Template>
    )
}

export default connect(null, mapActionsToProps)(OrderForm);