import React, {useEffect, useState} from 'react';
import {createElectroItem} from './ElectroItemApi';
import {getElectroTypes} from "../electroType/ElectroTypeApi";
import {fetchAllPages} from "../utils/fetchAllPages";

const ElectroItemForm = () => {
    const [electroTypes, setElectroTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        eTypeId: '',
        price: '',
        count: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Загрузка данных для выпадающего списка типов электроники
        const fetchElectroTypes = async () => {
            try {
                const response = await fetchAllPages(getElectroTypes);
                ;
                setElectroTypes(response || []);
            } catch (error) {
                console.error('Ошибка загрузки типов электроники:', error);
            }
        };

        fetchElectroTypes();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            // Используем createElectroItem для отправки данных на сервер
            const response = await createElectroItem(formData);

            setMessage('Данные успешно сохранены!');
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
            <h3>Добавление электротовара</h3>
            <form onSubmit={handleSubmit}>
                {/* Поле для имени */}
                <label htmlFor="name">Название</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Выпадающий список типов электроники */}
                <label htmlFor="eTypeId">Тип электроники</label>
                <select
                    name="eTypeId"
                    id="eTypeId"
                    value={formData.eTypeId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите тип электроники</option>
                    {Array.isArray(electroTypes) && electroTypes.map(electroType => (
                        <option key={electroType.id} value={electroType.id}>
                            {electroType.name}
                        </option>
                    ))}
                </select>

                {/* Поле для цены */}
                <label htmlFor="price">Цена</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                {/* Поле для количества */}
                <label htmlFor="count">Количество</label>
                <input
                    type="number"
                    id="count"
                    name="count"
                    value={formData.count}
                    onChange={handleChange}
                    required
                />

                {/* Поле для описания */}
                <label htmlFor="description">Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

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

export default ElectroItemForm;
