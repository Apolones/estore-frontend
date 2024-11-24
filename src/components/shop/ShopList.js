import React, { useEffect, useState } from "react";
import { getShops } from "./ShopApi";

const ShopList = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const data = await getShops(currentPage);
                setShops(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Ошибка загрузки магазинов:", err);
                setError("Не удалось загрузить список магазинов.");
            } finally {
                setLoading(false);
            }
        };

        fetchShops();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (shops.length === 0) return <p>Нет магазинов для отображения.</p>;

    return (
        <div>
            <h2>Список магазинов</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Наименование магазина</th>
                    <th>Адрес</th>
                </tr>
                </thead>
                <tbody>
                {shops.map((shop) => (
                    <tr key={shop.id}>
                        <td>{shop.id}</td>
                        <td>{shop.name}</td>
                        <td>{shop.address}</td>
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

export default ShopList;
