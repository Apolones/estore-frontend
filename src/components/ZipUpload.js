import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ZipUpload = () => {
    const location = useLocation();

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Максимальный размер файла 16 МБ
    const MAX_FILE_SIZE = 16 * 1024 * 1024;

    const getApiEndpoint = () => {
        return 'estore/api/upload/zip';
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
            if (fileExtension !== "zip") {
                setError("Пожалуйста, выберите файл с расширением .zip.");
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
            <h2>Загрузить файл ZIP</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="file"
                        accept=".zip"
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

export default ZipUpload;
