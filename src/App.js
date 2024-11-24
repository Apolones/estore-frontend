import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from "./components/HomePage";
import PurchasePage from "./components/purchase/PurchasePage";
import ElectroEmployeePage from "./components/electroEmployee/ElectroEmployeePage";
import ElectroItemPage from "./components/electroItem/ElectroItemPage";
import ElectroShopPage from "./components/electroShop/ElectroShopPage";
import ElectroTypePage from "./components/electroType/ElectroTypePage";
import EmployeePage from "./components/employee/EmployeePage";
import PositionTypePage from "./components/positionType/PositionTypePage";
import PurchaseTypePage from "./components/purchaseType/PurchaseTypePage";
import ShopPage from "./components/shop/ShopPage";

const App = () => {
    return (
        <Router>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/purchase" element={<PurchasePage />} />
                    <Route path="/electroemployee" element={<ElectroEmployeePage />} />
                    <Route path="/electroitem" element={<ElectroItemPage />} />
                    <Route path="/electroshop" element={<ElectroShopPage />} />
                    <Route path="/electrotype" element={<ElectroTypePage />} />
                    <Route path="/employee" element={<EmployeePage />} />
                    <Route path="/positiontype" element={<PositionTypePage />} />
                    <Route path="/purchasetype" element={<PurchaseTypePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
