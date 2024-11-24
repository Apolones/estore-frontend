import React from 'react';
import List from './ElectroTypeList';
import CsvUpload from "../CsvUpload";
import Form from "./ElectroTypeForm";


const ElectroTypePage = () => {
    return (
        <div>
            <List />
            <Form/>
            <CsvUpload />
        </div>
    );
};

export default ElectroTypePage;