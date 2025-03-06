import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerManager from './CustomerManager';
import Main from './Main';
import ProductManagement from './ProductManager';
let OrdersManager = () => {
    let [orders, setOrders] = useState([]);
    let [newOrder, setNewOrder] = useState({ customerId: "", total: 0, status: "" });
    let [filterCustomerId, setFilterCustomerId] = useState("");
    let [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    let fetchOrders = async () => {
        let params = {};
        if (filterCustomerId) params.customerId = filterCustomerId;
        if (filterStatus) params.status = filterStatus;

        const response = await axios.get('/api/orders', { params });
        setOrders(response.data);
    };

    let handleAddOrder = async () => {
        await axios.post('/api/orders', newOrder);
        fetchOrders(); // Обновление списка после добавления
    };

    let handleDeleteOrder = async (orderId) => {
        await axios.delete(`/api/orders/${orderId}`);
        fetchOrders(); // Обновление списка после удаления
    };

    return (
        <div>
            <nav>
                <Link to={'/'} element={<Main></Main>}>Home</Link>
                <Link to={'/customers'} element={<CustomerManager></CustomerManager>}>CustomerManagement</Link>
                <Link to={'/api/products'} element={<ProductManagement></ProductManagement>}>ProductManager</Link>
            </nav>
            <h1>Управление заказами</h1>
            
            <h2>Фильтры</h2>
            <input type="text" placeholder="ID клиента" value={filterCustomerId} onChange={(e) => setFilterCustomerId(e.target.value)} />
            <input type="text" placeholder="Статус" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} />
            <button onClick={fetchOrders}>Применить фильтры</button>
            
            <table>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Клиент</th>
                        <th>Статус</th>
                        <th>Сумма</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customerId}</td>
                            <td>{order.status}</td>
                            <td>{order.total}</td>
                            <td>
                                <button onClick={() => handleDeleteOrder(order.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Добавить новый заказ</h2>
            <input type="text" placeholder="ID клиента" onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })} />
            <input type="number" placeholder="Сумма" onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })} />
            <input type="text" placeholder="Статус" onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })} />
            <button onClick={handleAddOrder}>Добавить заказ</button>
        </div>
    );
};

export default OrdersManager;