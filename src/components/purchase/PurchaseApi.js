import axios from 'axios';

const API_BASE_URL = '/estore/api/purchase';

export const getPurchases = async (page = 0, size = 10, sort = "id", asc = true) => {
    const sortDirection = asc ? "asc" : "desc";
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}&sort=${sort},${sortDirection}`);
    return response.data;
};

export const createPurchase = async (purchase) => {
    const response = await axios.post(API_BASE_URL, purchase);
    return response.data;
};

export const deletePurchase = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const updatePurchase = async (id, purchase) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, purchase);
    return response.data;
};

export const uploadCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
