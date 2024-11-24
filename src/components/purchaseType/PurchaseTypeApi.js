import axios from 'axios';

const API_BASE_URL = '/estore/api/purchaseType';

// Получить список типов покупок с постраничным выводом
export const getPurchaseTypes = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить тип покупки по ID
export const getPurchaseTypeById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// Создать новый тип покупки
export const createPurchaseType = async (purchaseType) => {
    const response = await axios.post(API_BASE_URL, purchaseType);
    return response.data;
};

// Обновить тип покупки
export const updatePurchaseType = async (id, purchaseType) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, purchaseType);
    return response.data;
};

// Удалить тип покупки
export const deletePurchaseType = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// Загрузить типы покупок из CSV
export const uploadPurchaseTypeCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
