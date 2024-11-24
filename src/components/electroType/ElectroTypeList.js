import React, { useEffect, useState } from "react";
import { getElectroTypes } from "./ElectroTypeApi"; // Функция для получения данных с API

const ElectroTypeList = () => {
    const [electroTypes, setElectroTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchElectroTypes = async () => {
            try {
                const data = await getElectroTypes(currentPage); // Запрос данных на текущей странице
                setElectroTypes(data.content); // Доступ к данным внутри content
                setTotalPages(data.totalPages); // Обновляем количество страниц
            } catch (err) {
                console.error("Ошибка загрузки типов электроники:", err);
                setError("Не удалось загрузить список типов электроники.");
            } finally {
                setLoading(false);
            }
        };

        fetchElectroTypes();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage); // Обновляем текущую страницу
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (electroTypes.length === 0) return <p>Нет типов электроники для отображения.</p>;

    return (
        <div>
            <h2>Список типов электроники</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                </tr>
                </thead>
                <tbody>
                {electroTypes.map((electroType) => (
                    <tr key={electroType.id}>
                        <td>{electroType.id}</td>
                        <td>{electroType.name}</td>
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

export default ElectroTypeList;
