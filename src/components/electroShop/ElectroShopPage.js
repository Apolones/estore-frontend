import React from 'react';
import List from './ElectroShopList';
import CsvUpload from "../CsvUpload";
import Form from "./ElectroShopForm";


const ElectroShopPage = () => {
    return (
        <div>
            <List />
            <Form/>
            <CsvUpload />
        </div>
    );
};

export default ElectroShopPage;