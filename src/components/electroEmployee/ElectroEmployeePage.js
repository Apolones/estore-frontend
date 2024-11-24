import React from 'react';
import List from './ElectroEmployeeList';
import CsvUpload from "../CsvUpload";
import Form from "./ElectroEmployeeForm";


const ElectroEmployeePage = () => {
    return (
        <div>
            <List />
            <Form/>
            <CsvUpload />
        </div>
    );
};

export default ElectroEmployeePage;