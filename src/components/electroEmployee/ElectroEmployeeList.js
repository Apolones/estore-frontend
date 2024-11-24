import React, { useEffect, useState } from "react";
import { getElectroEmployees } from "./ElectroEmployeeApi"; // Функция для получения данных

const ElectroEmployeeList = () => {
    const [electroEmployees, setElectroEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchElectroEmployees = async () => {
            try {
                const data = await getElectroEmployees(currentPage);
                setElectroEmployees(data.content); // Доступ к данным внутри content
                setTotalPages(data.totalPages); // Обновляем количество страниц
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError("Не удалось загрузить список сотрудников.");
            } finally {
                setLoading(false);
            }
        };

        fetchElectroEmployees();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage); // Обновляем текущую страницу
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (electroEmployees.length === 0) return <p>Нет сотрудников для отображения.</p>;

    return (
        <div>
            <h2>Список сотрудников и типов электроники</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Сотрудник</th>
                    <th>Тип электроники</th>
                    <th>Электроника ID</th>
                </tr>
                </thead>
                <tbody>
                {electroEmployees.map((electroEmployee) => (
                    <tr key={electroEmployee.id}>
                        <td>{electroEmployee.employee.lastName} {electroEmployee.employee.firstName}</td>
                        <td>{electroEmployee.electroType.name}</td>
                        <td>{electroEmployee.electroType.id}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Пагинация */}
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Предыдущая
                </button>
                <span> Страница {currentPage + 1} из {totalPages} </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Следующая
                </button>
            </div>
        </div>
    );
};

export default ElectroEmployeeList;
