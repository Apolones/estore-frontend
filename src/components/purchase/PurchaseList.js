import React, { useEffect, useState } from "react";
import { getPurchases } from "./PurchaseApi";

const List = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortField, setSortField] = useState("purchaseDate");
    const [sortDirection, setSortDirection] = useState(true); // true = asc, false = desc

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const data = await getPurchases(currentPage, 10, sortField, sortDirection);
                setPurchases(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError("Не удалось загрузить список покупок.");
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, [currentPage, sortField, sortDirection]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSortChange = () => {
        setSortDirection(!sortDirection);
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (purchases.length === 0) return <p>Нет покупок для отображения.</p>;

    return (
        <div>
            <h2>Список покупок</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID покупки</th>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Описание</th>
                    <th>Категория</th>
                    <th>Сотрудник</th>
                    <th>Магазин</th>
                    <th onClick={handleSortChange} style={{ cursor: "pointer" }}>
                        Дата покупки {sortDirection ? "↑" : "↓"}
                    </th>
                    <th>Способ оплаты</th>
                </tr>
                </thead>
                <tbody>
                {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                        <td>{purchase.id}</td>
                        <td>{purchase.electroItem.name}</td>
                        <td>{purchase.electroItem.price} ₽</td>
                        <td>{purchase.electroItem.description}</td>
                        <td>{purchase.electroItem.etype.name}</td>
                        <td>
                            {purchase.employee.lastName} {purchase.employee.firstName} {purchase.employee.patronymic}
                        </td>
                        <td>{purchase.shop.name}, {purchase.shop.address}</td>
                        <td>{new Date(purchase.purchaseDate).toLocaleString()}</td>
                        <td>{purchase.purchaseType.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Пагинация */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                    Предыдущая
                </button>
                <span> Страница {currentPage + 1} из {totalPages} </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                    Следующая
                </button>
            </div>
        </div>
    );
};

export default List;
