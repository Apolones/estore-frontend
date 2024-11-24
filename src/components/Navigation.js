import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <div>
        <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/purchase">Список покупок</Link></li>
            <li><Link to="/electroemployee">Сотрудник - тип электроники</Link></li>
            <li><Link to="/electroitem">Электроника</Link></li>
            <li><Link to="/electroshop">Количество товара в магазине</Link></li>
            <li><Link to="/electrotype">Список типов электроники</Link></li>
            <li><Link to="/employee">Список сотрудников</Link></li>
            <li><Link to="/positiontype">Список должностей</Link></li>
            <li><Link to="/purchasetype">Список типов оплаты</Link></li>
            <li><Link to="/shop">Список магазинов</Link></li>
        </ul>
    </div>
);

export default Navigation;
