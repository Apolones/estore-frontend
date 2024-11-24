import React from 'react';
import List from './PurchaseList';
import Form from './PurchaseForm';
import CsvUpload from "../CsvUpload";


const PurchasePage = () => {
    return (
        <div>
            <List />
            <Form />
            <CsvUpload />
        </div>
    );
};

export default PurchasePage;