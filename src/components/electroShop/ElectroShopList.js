import React, { useEffect, useState } from "react";
import { getElectroShops } from "./ElectroShopApi";  // Ваш API запрос для ElectroShop

const ElectroShopList = () => {
    const [electroShops, setElectroShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchElectroShops = async () => {
            try {
                const data = await getElectroShops(currentPage); // Ваш запрос
                setElectroShops(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError("Не удалось загрузить список магазинов с электроникой.");
            } finally {
                setLoading(false);
            }
        };

        fetchElectroShops();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (electroShops.length === 0) return <p>Нет магазинов с электроникой для отображения.</p>;

    return (
        <div>
            <h2>Список магазинов с электроникой</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Магазин</th>
                    <th>Электротовар</th>
                    <th>Оставшееся количество</th>
                </tr>
                </thead>
                <tbody>
                {electroShops.map((electroShop) => (
                    <tr key={electroShop.id.shopId + "_" + electroShop.id.electroItemId}>
                        <td>{electroShop.shop?.name}</td>
                        <td>{electroShop.electroItem?.name}</td>
                        <td>{electroShop.count}</td>
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

export default ElectroShopList;
