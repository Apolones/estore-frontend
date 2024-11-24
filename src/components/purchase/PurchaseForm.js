import React, {useEffect, useState} from 'react';
import {getElectroItems} from "../electroItem/ElectroItemApi";
import {getEmployees} from "../employee/EmployeeApi";
import {getShops} from "../shop/ShopApi";
import {getPurchaseTypes} from "../purchaseType/PurchaseTypeApi";
import {createPurchase} from "./PurchaseApi";
import {fetchAllPages} from "../utils/fetchAllPages";

const Form = () => {
    const [electroItems, setElectroItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [shops, setShops] = useState([]);
    const [purchaseTypes, setPurchaseTypes] = useState([]);
    const [formData, setFormData] = useState({
        electroItemId: '',
        employeeId: '',
        shopId: '',
        purchaseTypeId: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [electroResponse, employeeResponse, shopResponse, purchaseTypeResponse] = await Promise.all([
                    fetchAllPages(getElectroItems),
                    fetchAllPages(getEmployees),
                    fetchAllPages(getShops),
                    fetchAllPages(getPurchaseTypes),
                ]);

                setElectroItems(electroResponse || []);
                setEmployees(employeeResponse || []);
                setShops(shopResponse || []);
                setPurchaseTypes(purchaseTypeResponse || []);
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
            const response = await createPurchase(formData);

            setMessage('Покупка успешно сохранена!');
            console.log('Ответ сервера:', response.data);
        } catch (error) {
            console.error('Ошибка при сохранении покупки:', error);

            // Проверяем, если ошибка ответа от сервера
            if (error.response) {
                const errorData = error.response.data;
                if (errorData && errorData.message) {
                    alert(`Ошибка: ${errorData.message}`); // Сообщение об ошибке от сервера
                } else {
                    alert('Произошла ошибка при сохранении. Попробуйте позже.');  // Общая ошибка
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
            <h3>Добавление покупки</h3>
            <form onSubmit={handleSubmit}>
                {/* Выпадающий список товаров */}
                <label htmlFor="electroItemId">Товары</label>
                <select name="electroItemId" id="electroItemId" value={formData.electroItemId} onChange={handleChange}>
                    <option value="">Выберите товар</option>
                    {Array.isArray(electroItems) && electroItems.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {/* Выпадающий список сотрудников */}
                <label htmlFor="employeeId">Сотрудники</label>
                <select name="employeeId" id="employeeId" value={formData.employeeId} onChange={handleChange}>
                    <option value="">Выберите сотрудника</option>
                    {Array.isArray(employees) && employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>

                {/* Выпадающий список магазинов */}
                <label htmlFor="shopId">Магазины</label>
                <select name="shopId" id="shopId" value={formData.shopId} onChange={handleChange}>
                    <option value="">Выберите магазин</option>
                    {Array.isArray(shops) && shops.map(shop => (
                        <option key={shop.id} value={shop.id}>
                            {shop.name} ({shop.address})
                        </option>
                    ))}
                </select>

                {/* Выпадающий список способов оплаты */}
                <label htmlFor="purchaseTypeId">Тип оплаты</label>
                <select name="purchaseTypeId" id="purchaseTypeId" value={formData.purchaseTypeId}
                        onChange={handleChange}>
                    <option value="">Выберите способ оплаты</option>
                    {Array.isArray(purchaseTypes) && purchaseTypes.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>

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

export default Form;