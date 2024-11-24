import React, { useEffect, useState } from "react";
import { getPositionTypes } from "./PositionTypeApi";

const PositionTypeList = () => {
    const [positionTypes, setPositionTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPositionTypes = async () => {
            try {
                const data = await getPositionTypes(currentPage);
                setPositionTypes(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Ошибка загрузки должностей:", err);
                setError("Не удалось загрузить список должностей.");
            } finally {
                setLoading(false);
            }
        };

        fetchPositionTypes();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (positionTypes.length === 0) return <p>Нет должностей для отображения.</p>;

    return (
        <div>
            <h2>Список должностей</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Наименование должности</th>
                </tr>
                </thead>
                <tbody>
                {positionTypes.map((position) => (
                    <tr key={position.id}>
                        <td>{position.id}</td>
                        <td>{position.name}</td>
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

export default PositionTypeList;
