import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Получаем всех пользователей
            const response = await axios.get('/export/users');
            const users = response.data;

            // Проверяем, есть ли пользователь с введенными данными
            const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
            if (user) {
                alert('Успешный вход');
                navigate('/'); // Перенаправление на главную страницу
            } else {
                alert('Неверный email или пароль');
            }
        } catch (error) {
            alert('Ошибка при входе: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
            <p className="mt-3">
                Нет аккаунта? <Link to="/register" element={<Register></Register>}>Зарегистрироваться</Link>
            </p>
        </div>
    );
};

export default Login;