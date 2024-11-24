import React from 'react';
import List from './PurchaseTypeList';
import CsvUpload from "../CsvUpload";
import Form from "./PurchaseTypeForm";


const PurchaseTypePage = () => {
    return (
        <div>
            <List />
            <Form/>
            <CsvUpload />
        </div>
    );
};

export default PurchaseTypePage;