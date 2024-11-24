import React from 'react';
import List from './ShopList';
import CsvUpload from "../CsvUpload";
import Form from "./ShopForm";
import ShopsByPurchaseTypePage from "./ShopsByPurchaseTypePage";

const ShopPage = () => {
    return (
        <div>
            <List />
            <Form/>
            <ShopsByPurchaseTypePage/>
            <CsvUpload />
        </div>
    );
};

export default ShopPage;