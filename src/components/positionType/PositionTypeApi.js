import axios from 'axios';

const API_BASE_URL = '/estore/api/positiontype';

// Получить должности с постраничным выводом
export const getPositionTypes = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить должность по ID
export const getPositionTypeById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// Создать новую должность
export const createPositionType = async (positionType) => {
    const response = await axios.post(API_BASE_URL, positionType);
    return response.data;
};

// Обновить данные должности
export const updatePositionType = async (id, positionType) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, positionType);
    return response.data;
};

// Удалить должность
export const deletePositionType = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// Загрузить должности из csv
export const uploadPositionTypeCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
