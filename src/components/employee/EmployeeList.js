import React, { useEffect, useState } from "react";
import { getEmployees } from "./EmployeeApi";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees(currentPage);
                setEmployees(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Ошибка загрузки сотрудников:", err);
                setError("Не удалось загрузить список сотрудников.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (employees.length === 0) return <p>Нет сотрудников для отображения.</p>;

    return (
        <div>
            <h2>Список сотрудников</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Дата рождения</th>
                    <th>Должность</th>
                    <th>Магазин</th>
                    <th>Пол</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.patronymic}</td>
                        <td>{new Date(employee.birthDate).toLocaleDateString()}</td>
                        <td>{employee.position?.name}</td>
                        <td>{employee.shop?.name}</td>
                        <td>{employee.gender ? "Мужской" : "Женский"}</td>
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

export default EmployeeList;
