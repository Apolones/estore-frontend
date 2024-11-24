import axios from 'axios';

const API_BASE_URL = '/estore/api/electrotype';

// Получить список типов электроники с постраничным выводом
export const getElectroTypes = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить тип электроники по ID
export const getElectroTypeById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// Создать новый тип электроники
export const createElectroType = async (electroType) => {
    const response = await axios.post(API_BASE_URL, electroType);
    return response.data;
};

// Обновить данные типа электроники
export const updateElectroType = async (id, electroType) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, electroType);
    return response.data;
};

// Удалить тип электроники
export const deleteElectroType = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// Загрузить типы электроники из csv
export const uploadElectroTypeCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
