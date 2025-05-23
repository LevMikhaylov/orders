import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomerManager from './CustomerManager';
import Main from './Main';
import OrdersManager from './OrderManager';
const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
    };

    const addProduct = async () => {
        await axios.post('/api/products', newProduct);
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
    };

    return (
        <div>
            <nav>
                <Link to={'/'} element={<Main></Main>}>Home</Link>
                <Link to={'/api/orders'} element={<OrdersManager></OrdersManager>}>OrdersManagement</Link>
                <Link to={'/customers'} element={<CustomerManager></CustomerManager>}>CustomersManagement</Link>
            </nav>
            <h2>Управление товарами</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                </Table>
                <button onClick={()=>addProduct()}>Добавить</button>
                <button onClick={()=>deleteProduct()}>Удалить</button>
                </div>
    )
};
export default ProductManagement