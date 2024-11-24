import axios from 'axios';

const API_BASE_URL = '/estore/api/shop';

// Получить список всех магазинов с постраничным выводом
export const getShops = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить магазин по ID
export const getShopById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// Создать новый магазин
export const createShop = async (shop) => {
    const response = await axios.post(API_BASE_URL, shop);
    return response.data;
};

// Обновить данные магазина
export const updateShop = async (id, shop) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, shop);
    return response.data;
};

// Удалить магазин
export const deleteShop = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// Получить информацию о сумме денежных средств, полученной магазином через оплату "Наличные"
export const getShopsByPurchaseType = async (id, purchaseType = "Наличные") => {
    const response = await axios.get(`${API_BASE_URL}/by-purchase-type/${id}`, {
        params: { purchaseType },
    });
    return response.data;
};

// Загрузить магазины из CSV
export const uploadShopsCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
