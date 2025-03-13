import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import CustomerManager from "./CustomerManager";
import OrdersManager from "./OrderManager";
import ProductManager from "./ProductManager.jsx";
function Main(){
    const [customerCount, setCustomerCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchStatistics = async () => {
            const customersResponse = await axios.get('/api/customers');
            const ordersResponse = await axios.get('/api/orders');
            setCustomerCount(customersResponse.data.length);
            setOrderCount(ordersResponse.data.length);
            const total = ordersResponse.data.reduce((acc, order) => acc + order.totalAmount, 0);
            setTotalAmount(total);
        };

        fetchStatistics();
    }, []);

    return(
        <div>
        <nav>
        <Link to={'/customers'} element={<CustomerManager></CustomerManager>}CustomerManagement></Link>
        <Link to={'/api/orders'} element={<OrdersManager></OrdersManager>}OrdersManagement></Link>
        <Link to={'/api/products'} element={<ProductManager></ProductManager>}>ProductManager</Link>
        </nav>
        <h1>Статистика</h1>
        <p>Количество клиентов: {customerCount}</p>
        <p>Количество заказов: {orderCount}</p>
        <p>Общая сумма всех заказов: {totalAmount}</p>
        </div>
    );
}
export default Main;