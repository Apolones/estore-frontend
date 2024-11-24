import React, { useState, useEffect } from 'react';
import { getPositionTypes } from "../positionType/PositionTypeApi";
import {getBestEmployeesByItemSold} from "./EmployeeApi";
import {fetchAllPages} from "../utils/fetchAllPages";

const BestEmployeesPageByItemSold = () => {
    const [positions, setPositions] = useState([]); // Список должностей
    const [selectedPosition, setSelectedPosition] = useState(''); // Выбранная должность
    const [bestEmployees, setBestEmployees] = useState([]); // Список лучших сотрудников
    const [years, setYears] = useState(1); // Количество лет
    const [loading, setLoading] = useState(false); // Статус загрузки

    // Загрузка списка должностей при монтировании компонента
    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await fetchAllPages(getPositionTypes);
                setPositions(response || []);
            } catch (error) {
                console.error('Ошибка при загрузке должностей:', error);
            }
        };

        fetchPositions();
    }, []);

    // Функция для обработки изменения должности и загрузки лучших сотрудников
    const handlePositionChange = async (e) => {
        const positionId = e.target.value;
        setSelectedPosition(positionId);

        if (positionId) {
            setLoading(true);
            try {
                const employees = await getBestEmployeesByItemSold(positionId, years);
                setBestEmployees(employees || []);
            } catch (error) {
                console.error('Ошибка при получении сотрудников:', error);
                setBestEmployees([]);
            } finally {
                setLoading(false);
            }
        }
    };

    // Функция для обработки изменения количества лет
    const handleYearsChange = (e) => {
        setYears(e.target.value);
    };

    return (
        <div>
            <h2>Лучшие сотрудники по количеству проданных товаров</h2>
            <div>
                {/* Выпадающий список для выбора должности */}
                <label htmlFor="positionId">Выберите должность:</label>
                <select id="positionId" value={selectedPosition} onChange={handlePositionChange}>
                    <option value="">--Выберите должность--</option>
                    {positions.map(position => (
                        <option key={position.id} value={position.id}>
                            {position.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Поле для выбора количества лет */}
            <div>
                <label htmlFor="years">Выберите количество лет:</label>
                <input
                    type="number"
                    id="years"
                    value={years}
                    onChange={handleYearsChange}
                    min="1"
                />
            </div>

            {/* Вывод данных */}
            {loading && <p>Загрузка...</p>}

            {bestEmployees.length > 0 && (
                <div>
                    <h3>Лучшие сотрудники:</h3>
                    <ul>
                        {bestEmployees.map((employee) => (
                            <li key={employee.employeeId}>
                                {employee.firstName} {employee.lastName} - {employee.itemsSold} товаров, {employee.totalSales} руб.
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {bestEmployees.length === 0 && !loading && selectedPosition && (
                <p>Нет данных для выбранной должности.</p>
            )}
        </div>
    );
};

export default BestEmployeesPageByItemSold;
