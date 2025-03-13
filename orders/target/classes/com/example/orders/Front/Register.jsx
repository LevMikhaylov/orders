import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
const Register = () => {
    const [user, setUser  ] = useState({
        name: '',
        surname: '',
        patr: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const navigate = useNavigate(); // Хук для навигации

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser ({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', user);
            alert(response.data);
            navigate('/'); // Перенаправление на главную страницу
        } catch (error) {
            alert('Ошибка при регистрации: ' + error.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Фамилия</label>
                    <input type="text" name="surname" className="form-control" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Отчество</label>
                    <input type="text" name="patr" className="form-control" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Телефон</label>
                    <input type="text" name="phoneNumber" className="form-control" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
            <p className="mt-3">
                Уже есть аккаунт? <Link to="/login" element={<Login></Login>}>Войти</Link>
            </p>
        </div>
    );
};

export default Register;