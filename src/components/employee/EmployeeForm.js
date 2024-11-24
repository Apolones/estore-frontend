import React, { useState, useEffect } from 'react';
import { createEmployee } from './EmployeeApi';
import {getPositionTypes} from "../positionType/PositionTypeApi";
import {getShops} from "../shop/ShopApi";
import {fetchAllPages} from "../utils/fetchAllPages";

const EmployeeForm = () => {
    const [positions, setPositions] = useState([]);
    const [shops, setShops] = useState([]);
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        patronymic: '',
        birthDate: '',
        positionId: '',
        shopId: '',
        gender: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Загрузка данных для выпадающих списков
        const fetchData = async () => {
            try {
                const [positionsResponse, shopsResponse] = await Promise.all([
                    fetchAllPages(getPositionTypes),
                    fetchAllPages(getShops)
                ]);

                setPositions(positionsResponse || []);
                setShops(shopsResponse || []);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'radio') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value === "true" ? true : value === "false" ? false : prevData[name]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            // Используем createEmployee для отправки данных на сервер
            const response = await createEmployee(formData);

            setMessage('Данные сотрудника успешно сохранены!');
            console.log('Ответ сервера:', response.data);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);

            // Проверяем, если ошибка ответа от сервера
            if (error.response) {
                const errorData = error.response.data;
                if (errorData && errorData.message) {
                    alert(`Ошибка: ${errorData.message}`);
                } else {
                    alert('Произошла ошибка при сохранении. Попробуйте позже.');
                }
            } else {
                alert('Произошла ошибка при соединении. Попробуйте позже.');
            }

            setMessage('Произошла ошибка при сохранении.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h3>Добавление сотрудника</h3>
        <form onSubmit={handleSubmit}>
            {/* Поля для данных сотрудника */}
            <label htmlFor="lastName">Фамилия</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />

            <label htmlFor="firstName">Имя</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />

            <label htmlFor="patronymic">Отчество</label>
            <input
                type="text"
                id="patronymic"
                name="patronymic"
                value={formData.patronymic}
                onChange={handleChange}
            />

            <label htmlFor="birthDate">Дата рождения</label>
            <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
            />

            {/* Выпадающий список должности */}
            <label htmlFor="positionId">Должность</label>
            <select
                name="positionId"
                id="positionId"
                value={formData.positionId}
                onChange={handleChange}
                required
            >
                <option value="">Выберите должность</option>
                {positions.map(position => (
                    <option key={position.id} value={position.id}>
                        {position.name}
                    </option>
                ))}
            </select>

            {/* Выпадающий список магазинов */}
            <label htmlFor="shopId">Магазин</label>
            <select
                name="shopId"
                id="shopId"
                value={formData.shopId}
                onChange={handleChange}
                required
            >
                <option value="">Выберите магазин</option>
                {shops.map(shop => (
                    <option key={shop.id} value={shop.id}>
                        {shop.name}
                    </option>
                ))}
            </select>

            {/* Выбор пола */}
            <label htmlFor="gender">Пол</label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="true"
                        checked={formData.gender === true}
                        onChange={handleChange}
                    /> Мужчина
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="false"
                        checked={formData.gender === false}
                        onChange={handleChange}
                    /> Женщина
                </label>

            {/* Кнопка отправки */}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </button>

            {/* Сообщение об успехе/ошибке */}
            {message && <p>{message}</p>}
        </form>
        </div>
    );
};

export default EmployeeForm;
