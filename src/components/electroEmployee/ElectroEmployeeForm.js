import React, {useEffect, useState} from 'react';
import {createElectroEmployee} from './ElectroEmployeeApi';
import {getEmployees} from "../employee/EmployeeApi";
import {getElectroTypes} from "../electroType/ElectroTypeApi";
import {fetchAllPages} from "../utils/fetchAllPages";

const ElectroEmployeeForm = () => {
    const [employees, setEmployees] = useState([]);
    const [electroTypes, setElectroTypes] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: '',
        electroTypeId: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Загрузка данных для выпадающих списков
        const fetchData = async () => {
            try {
                const [employeeResponse, electroTypeResponse] = await Promise.all([
                    fetchAllPages(getEmployees),
                    fetchAllPages(getElectroTypes)
                ]);

                setEmployees(employeeResponse || []);
                setElectroTypes(electroTypeResponse || []);
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
            // Используем createElectroEmployee для отправки данных на сервер
            const response = await createElectroEmployee({
                employeeId: formData.employeeId,
                electroTypeId: formData.electroTypeId
            });

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
            <h3>Добавление новый связи электротовар-сотрудник</h3>
            <form onSubmit={handleSubmit}>
                {/* Выпадающий список сотрудников */}
                <label htmlFor="employeeId">Сотрудники</label>
                <select name="employeeId" id="employeeId" value={formData.employeeId} onChange={handleChange}>
                    <option value="">Выберите сотрудника</option>
                    {Array.isArray(employees) && employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName} {/* отображаем имя сотрудника */}
                        </option>
                    ))}
                </select>

                {/* Выпадающий список типов электроники */}
                <label htmlFor="electroTypeId">Тип электроники</label>
                <select name="electroTypeId" id="electroTypeId" value={formData.electroTypeId} onChange={handleChange}>
                    <option value="">Выберите тип электроники</option>
                    {Array.isArray(electroTypes) && electroTypes.map(electroType => (
                        <option key={electroType.id} value={electroType.id}>
                            {electroType.name} {/* отображаем имя типа электроники */}
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

export default ElectroEmployeeForm;
