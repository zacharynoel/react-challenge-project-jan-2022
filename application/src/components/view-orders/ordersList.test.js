import React from 'react';
import { render, screen } from '@testing-library/react';

import OrdersList from './ordersList';

describe('Orders List', () => {
    test('renders with no prop', () => {
        render(
            <OrdersList
            />
        )
        const emptyDiv = document.getElementsByClassName('empty-orders');
        const arr = Array.from(emptyDiv);
        expect(arr.length).toBe(1);
    });

    test('renders one order', () => {
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
    });

    test('renders multiple orders', () => {
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1
            },
            {
                order_item: "Drink",
                quantity: "888",
                _id: 2
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
        expect(screen.getByText('Drink')).toBeInTheDocument();
        expect(screen.getByText(/^.*888.*$/gm)).toBeInTheDocument();

    });

    test('renders correct time format for multiple orders', () => {
        const orders = [
            {
                createdAt: "2022-06-26T00:03:29.037Z",
                order_item: "Food",
                quantity: "777",
                _id: 1,
            },
            {
                createdAt: "2022-06-26T00:06:06.313Z",
                order_item: "Drink",
                quantity: "888",
                _id: 2
            },
            {
                createdAt: "2022-06-26T03:11:06.808Z",
                order_item: "Dessert",
                quantity: "999",
                _id: 3
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText(/17:03:29/)).toBeInTheDocument();
        expect(screen.getByText(/17:06:06/)).toBeInTheDocument();
        expect(screen.getByText(/20:11:06/)).toBeInTheDocument();
    })
})