// Функция для загрузки всех страниц с пагинацией
export const fetchAllPages = async (fetchFunction, page = 0, size = 100, accumulatedData = []) => {
    try {
        const response = await fetchFunction(page, size);
        const newData = response.content || [];
        const updatedData = [...accumulatedData, ...newData];
        if (response.totalPages > page + 1) {
            return fetchAllPages(fetchFunction, page + 1, size, updatedData);
        }
        return updatedData;
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        throw error;
    }
};
