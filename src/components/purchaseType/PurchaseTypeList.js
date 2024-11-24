import React, { useEffect, useState } from "react";
import { getPurchaseTypes } from "./PurchaseTypeApi";

const PurchaseTypeList = () => {
    const [purchaseTypes, setPurchaseTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPurchaseTypes = async () => {
            try {
                const data = await getPurchaseTypes(currentPage);
                setPurchaseTypes(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Ошибка загрузки типов оплаты:", err);
                setError("Не удалось загрузить список типов оплаты.");
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseTypes();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (purchaseTypes.length === 0) return <p>Нет типов оплаты для отображения.</p>;

    return (
        <div>
            <h2>Список типов оплаты</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Наименование типа оплаты</th>
                </tr>
                </thead>
                <tbody>
                {purchaseTypes.map((purchaseType) => (
                    <tr key={purchaseType.id}>
                        <td>{purchaseType.id}</td>
                        <td>{purchaseType.name}</td>
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

export default PurchaseTypeList;
