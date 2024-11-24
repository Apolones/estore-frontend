import axios from 'axios';

const API_BASE_URL = '/estore/api/electroItem';

// Получить список электротоваров с постраничным выводом
export const getElectroItems = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить электротовар по ID
export const getElectroItemById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// Создать новый электротовар
export const createElectroItem = async (electroItem) => {
    const response = await axios.post(API_BASE_URL, electroItem);
    return response.data;
};

// Обновить данные электротовара
export const updateElectroItem = async (id, electroItem) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, electroItem);
    return response.data;
};

// Удалить электротовар
export const deleteElectroItem = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// Загрузить электротовары из csv
export const uploadElectroItemCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
