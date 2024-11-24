import axios from 'axios';

const API_BASE_URL = '/estore/api/electroshop';

// Получить список связей электротоваров и магазинов с постраничным выводом
export const getElectroShops = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить связь электротовара и магазина по составному ключу
export const getElectroShopById = async (electroItemId, shopId) => {
    const response = await axios.get(`${API_BASE_URL}/${electroItemId}/${shopId}`);
    return response.data;
};

// Создать новую связь
export const createElectroShop = async (electroShop) => {
    const response = await axios.post(API_BASE_URL, electroShop);
    return response.data;
};

// Обновить связи
export const updateElectroShop = async (id, electroShop) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, electroShop);
    return response.data;
};

// Удалить связь по составному ключу
export const deleteElectroShop = async (electroItemId, shopId) => {
    await axios.delete(`${API_BASE_URL}/${electroItemId}/${shopId}`);
};

// Проверить наличие товара в магазине
export const checkItemAvailability = async (shopId, itemId) => {
    const response = await axios.get(`${API_BASE_URL}/availability?shopId=${shopId}&itemId=${itemId}`);
    return response.data;
};

// Загрузить связи из csv
export const uploadElectroShopCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
