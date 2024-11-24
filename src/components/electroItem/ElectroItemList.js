import React, { useEffect, useState } from "react";
import { getElectroItems } from "./ElectroItemApi"; // Функция для получения данных

const ElectroItemList = () => {
    const [electroItems, setElectroItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchElectroItems = async () => {
            try {
                const data = await getElectroItems(currentPage);
                setElectroItems(data.content); // Доступ к данным внутри content
                setTotalPages(data.totalPages); // Обновляем количество страниц
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError("Не удалось загрузить список товаров.");
            } finally {
                setLoading(false);
            }
        };

        fetchElectroItems();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage); // Обновляем текущую страницу
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (electroItems.length === 0) return <p>Нет товаров для отображения.</p>;

    return (
        <div>
            <h2>Список электроники</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Тип товара</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Описание</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {electroItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.etype?.name}</td>
                        <td>{item.price} ₽</td>
                        <td>{item.count}</td>
                        <td>{item.description}</td>
                        <td>{item.archive ? "Архивный" : "В продаже"}</td>
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

export default ElectroItemList;
