import axios from 'axios';

const API_BASE_URL = '/estore/api/employee';

// Получить сотрудников с постраничным выводом
export const getEmployees = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить сотрудника по ID
export const getEmployeeById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// Создать нового сотрудника
export const createEmployee = async (employee) => {
    const response = await axios.post(API_BASE_URL, employee);
    return response.data;
};

// Обновить данные сотрудника
export const updateEmployee = async (id, employee) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, employee);
    return response.data;
};

// Удалить сотрудника
export const deleteEmployee = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// Получить лучших сотрудников по сумме проданных товаров
export const getBestEmployeesByTotalSales = async (positionId, years = 1) => {
    const response = await axios.get(`${API_BASE_URL}/totalsales/${positionId}`, { params: { years } });
    return response.data;
};

// Получить лучших сотрудников по количеству проданных товаров
export const getBestEmployeesByItemSold = async (positionId, years = 1) => {
    const response = await axios.get(`${API_BASE_URL}/itemssold/${positionId}`, { params: { years } });
    return response.data;
};

// Вывод лучшего младшего продавца-консультанта по умным часам
export const getBestJuniorConsultantBySmartWatches = async (employeePosition = "Младший продавец-консультант", electoItem = "Умные часы") => {
    const response = await axios.get(`${API_BASE_URL}/bestjuniorconsultantsmartwatches`, { params: { employeePosition, electoItem } });
    return response.data;
};

// Загрузить сотрудников из csv
export const uploadEmployeeCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
