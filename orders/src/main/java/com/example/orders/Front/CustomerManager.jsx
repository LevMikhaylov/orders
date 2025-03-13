import axios from "axios";
import React, { useEffect, useState } from "react";

let CustomerManager = () => {
    let [customers, setCustomers] = useState([]);
    let [newCustomer, setNewCustomer] = useState({ name: '' });

    useEffect(() => {
        fetchCustomers();
    }, []);

    let fetchCustomers = async () => {
        const response = await axios.get(`/customers/${id}`);
        setCustomers(response.data);
    };

    let handleAddCustomer = async () => {
        await axios.post("/customers", newCustomer);
        setNewCustomer({ name: '' });
        fetchCustomers(); // Обновляем список клиентов
    };

    let handleDeleteCustomer = async (id) => {
        await axios.delete(`/customers/${id}`);
        fetchCustomers(); // Обновляем список клиентов
    };

    return (
        <div>
            <nav>
            <Link to={'/'} element={<Main></Main>}>Home</Link>
            <Link to={'/api/orders'} element={<OrdersManager></OrdersManager>}>OrdersManagement</Link>
            <Link to={'/api/products'} element={<ProductManagement></ProductManagement>}>ProductManager</Link>
            </nav>
            <h1>Управление клиентами</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>
                                <button onClick={() => handleDeleteCustomer(customer.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Добавить клиента</h2>
            <input
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ name: e.target.value })}
            />
            <button onClick={handleAddCustomer}>Добавить</button>
        </div>
    );
};

export default CustomerManager;