import React from 'react';
import List from './PositionTypeList';
import CsvUpload from "../CsvUpload";
import Form from "./PositionTypeForm";


const PositionTypePage = () => {
    return (
        <div>
            <List />
            <Form/>
            <CsvUpload />
        </div>
    );
};

export default PositionTypePage;