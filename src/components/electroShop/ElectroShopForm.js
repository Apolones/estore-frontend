import React, {useEffect, useState} from 'react';
import {createElectroShop} from './ElectroShopApi';
import {getElectroItems} from "../electroItem/ElectroItemApi";
import {getShops} from "../shop/ShopApi";
import {fetchAllPages} from "../utils/fetchAllPages";

const ElectroShopForm = () => {
    const [electroItems, setElectroItems] = useState([]);
    const [shops, setShops] = useState([]);
    const [formData, setFormData] = useState({
        shopId: '',
        electroItemId: '',
        count: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Загрузка данных для выпадающих списков
        const fetchData = async () => {
            try {
                const [electroItemsResponse, shopsResponse] = await Promise.all([
                    fetchAllPages(getElectroItems),
                        fetchAllPages(getShops),
                ]);

                setElectroItems(electroItemsResponse || []);
                setShops(shopsResponse || []);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchData();
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
            // Используем createElectroShop для отправки данных на сервер
            const response = await createElectroShop(formData);

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
            <h3>Добавление товара в магазин</h3>
            <form onSubmit={handleSubmit}>
                {/* Выпадающий список магазинов */}
                <label htmlFor="shopId">Магазин</label>
                <select name="shopId" id="shopId" value={formData.shopId} onChange={handleChange}>
                    <option value="">Выберите магазин</option>
                    {Array.isArray(shops) && shops.map(shop => (
                        <option key={shop.id} value={shop.id}>
                            {shop.name} {/* отображаем имя магазина */}
                        </option>
                    ))}
                </select>

                {/* Выпадающий список товаров */}
                <label htmlFor="electroItemId">Товар</label>
                <select name="electroItemId" id="electroItemId" value={formData.electroItemId} onChange={handleChange}>
                    <option value="">Выберите товар</option>
                    {Array.isArray(electroItems) && electroItems.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name} {/* отображаем имя товара */}
                        </option>
                    ))}
                </select>

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

export default ElectroShopForm;
