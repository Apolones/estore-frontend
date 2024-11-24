import React, { useState } from 'react';
import List from './EmployeeList';
import CsvUpload from "../CsvUpload";
import Form from "./EmployeeForm";
import BestEmployeesPageByItemSold from "./BestEmployeesByItemSold";
import BestEmployeesByTotalSales from "./BestEmployeesByTotalSales";
import BestJuniorConsultantBySmartWatchesPage from "./BestJuniorConsultantBySmartWatches";

const EmployeePage = () => {
    const [selectedPage, setSelectedPage] = useState('');

    const handlePageChange = (e) => {
        setSelectedPage(e.target.value);
    };

    const renderPage = () => {
        switch (selectedPage) {
            case 'page1':
                return <BestEmployeesPageByItemSold />;
            case 'page2':
                return <BestEmployeesByTotalSales />;
            case 'page3':
                return <BestJuniorConsultantBySmartWatchesPage />;
            default:
                return null;
        }
    };

    return (
        <div>
            <List />
            <Form />
            <div>
                <h3>Запрос дополнительной информации</h3>
                <label htmlFor="pageSelect">Выберите страницу</label>
                <select id="pageSelect" value={selectedPage} onChange={handlePageChange}>
                    <option value="">--Выберите--</option>
                    <option value="page1">Лучшие сотрудники по количеству проданных товаров</option>
                    <option value="page2">Лучшие сотрудники по сумме проданных товаров</option>
                    <option value="page3">Лучший младший продавец-консультант, продавшей больше всех умных часов</option>
                </select>
            </div>

            <div>
                {renderPage()}
            </div>
            <CsvUpload />
        </div>
    );
};

export default EmployeePage;
