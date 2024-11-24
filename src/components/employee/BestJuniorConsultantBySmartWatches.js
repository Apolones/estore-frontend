import React, { useState, useEffect } from 'react';
import { getBestJuniorConsultantBySmartWatches } from "./EmployeeApi";

const BestJuniorConsultantBySmartWatchesPage = () => {
    const [bestEmployee, setBestEmployee] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBestEmployee = async () => {
            setLoading(true);
            try {
                // Получаем лучшего младшего продавца-консультанта по умным часам
                const employee = await getBestJuniorConsultantBySmartWatches();
                setBestEmployee(employee || null);
            } catch (error) {
                console.error('Ошибка при получении данных о сотруднике:', error);
                setBestEmployee(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBestEmployee();
    }, []);

    return (
        <div>
            <h2>Лучший младший продавец-консультант по умным часам</h2>

            {/* Вывод данных */}
            {loading && <p>Загрузка...</p>}

            {bestEmployee && (
                <div>
                    <h3>Лучший сотрудник:</h3>
                    <p>{bestEmployee.firstName} {bestEmployee.lastName} - Продал {bestEmployee.itemsSold} умных часов</p>
                </div>
            )}

            {bestEmployee === null && !loading && (
                <p>Нет данных о лучшем сотруднике по умным часам.</p>
            )}
        </div>
    );
};

export default BestJuniorConsultantBySmartWatchesPage;
