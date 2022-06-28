import { CURRENT_ORDERS } from '../actions/types'

const INITIAL_STATE = { orders: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CURRENT_ORDERS:
            return { ...state, orders: action.payload.orders }
        default:
            return state;
    }
}