import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CsvUpload = () => {
    const location = useLocation();
    const currentPage = location.pathname.split("/")[1];

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    // Максимальный размер файла 8 МБ
    const MAX_FILE_SIZE = 8 * 1024 * 1024;

    // Функция для определения API на основе текущей страницы
    const getApiEndpoint = () => {

        switch (currentPage) {
            case 'purchase':
                return '/estore/api/purchase/csv';
            case 'electroemployee':
                return '/estore/api/electroemployee/csv';
            case 'electroitem':
                return '/estore/api/electroitem/csv';
            case 'electroshop':
                return '/estore/api/electroshop/csv';
            case 'electrotype':
                return '/estore/api/electrotype/csv';
            case 'employee':
                return '/estore/api/employee/csv';
            case 'positiontype':
                return '/estore/api/positiontype/csv';
            case 'purchasetype':
                return '/estore/api/purchasetype/csv';
            default:
                return '/api/upload/default';
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            // Проверка размера файла
            if (selectedFile.size > MAX_FILE_SIZE) {
                setError("Файл слишком большой. Максимальный размер файла: 5 MB.");
                setFile(null);
                return;
            }

            // Проверка расширения файла
            const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
            if (fileExtension !== "csv") {
                setError("Пожалуйста, выберите файл с расширением .csv.");
                setFile(null);
                return;
            }

            setFile(selectedFile);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Пожалуйста, выберите файл для загрузки.");
            return;
        }

        const apiEndpoint = getApiEndpoint();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Ошибка при загрузке файла.");
            }

            const textResponse = await response.text();

            setSuccess(textResponse);
            setError(null);
        } catch (err) {
            setError(`Ошибка при загрузке файла: ${err.message}`);
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Загрузить файл CSV</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}
                <button type="submit" disabled={!file}>
                    Загрузить
                </button>
            </form>
        </div>
    );
};

export default CsvUpload;
