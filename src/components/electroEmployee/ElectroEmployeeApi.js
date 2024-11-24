import axios from 'axios';

const API_BASE_URL = '/estore/api/electroemployee';

// Получить список связей сотрудников и типов электроники с постраничным выводом
export const getElectroEmployees = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response.data;
};

// Получить связь сотрудника и типа электроники по составному ключу
export const getElectroEmployeeById = async (employeeId, electroTypeId) => {
    const response = await axios.get(`${API_BASE_URL}/${employeeId}/${electroTypeId}`);
    return response.data;
};

// Создать новую связь
export const createElectroEmployee = async (electroEmployeeDTO) => {
    const response = await axios.post(API_BASE_URL, electroEmployeeDTO);
    return response.data;
};

// Удалить связь по составному ключу
export const deleteElectroEmployee = async (employeeId, electroTypeId) => {
    await axios.delete(`${API_BASE_URL}/${employeeId}/${electroTypeId}`);
};

// Загрузить связи из csv
export const uploadElectroEmployeeCsv = (file, encoding = 'Windows-1251') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encoding', encoding);

    return axios.post(`${API_BASE_URL}/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
