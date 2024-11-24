import React from 'react';
import List from './ElectroItemList';
import CsvUpload from "../CsvUpload";
import Form from "./ElectroItemForm";


const ElectroItemPage = () => {
    return (
        <div>
            <List />
            <Form/>
            <CsvUpload />
        </div>
    );
};

export default ElectroItemPage;