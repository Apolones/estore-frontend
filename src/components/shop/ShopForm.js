import React, {useState} from 'react';
import {createShop} from './ShopApi';

const ShopForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

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
            const response = await createShop(formData);

            setMessage('Магазин успешно сохранен!');
            console.log('Ответ сервера:', response.data);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);

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
            <h3>Добавление магазина</h3>
            <form onSubmit={handleSubmit}>
                {/* Поле для наименования магазина */}
                <label htmlFor="name">Наименование магазина</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Поле для адреса магазина */}
                <label htmlFor="address">Адрес магазина</label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                ></textarea>

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

export default ShopForm;
