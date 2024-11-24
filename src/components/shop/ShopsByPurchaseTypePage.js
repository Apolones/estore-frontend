import React, { useState, useEffect } from 'react';
import { getShopsByPurchaseType } from './ShopApi';
import { getShops } from './ShopApi';
import {fetchAllPages} from "../utils/fetchAllPages";

const ShopsByPurchaseTypePage = () => {
    const [shops, setShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState('');
    const [purchaseData, setPurchaseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Загрузка списка магазинов при монтировании компонента
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await fetchAllPages(getShops);
                setShops(response || []);
            } catch (error) {
                console.error('Ошибка при загрузке магазинов:', error);
            }
        };

        fetchShops();
    }, []);

    // Функция для обработки изменения выбранного магазина
    const handleShopChange = async (e) => {
        const shopId = e.target.value;
        setSelectedShop(shopId);

        if (shopId) {
            setLoading(true);
            setError(null);

            try {
                const data = await getShopsByPurchaseType(shopId, "Наличные");

                if (data && data.length > 0) {
                    setPurchaseData(data[0]);
                } else {
                    setPurchaseData(null);
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setError('Произошла ошибка при получении данных.');
                setPurchaseData(null);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <h2>Информация о сумме, полученной магазином через оплату "Наличные"</h2>

            {/* Выпадающий список для выбора магазина */}
            <div>
                <label htmlFor="shopId">Выберите магазин:</label>
                <select id="shopId" value={selectedShop} onChange={handleShopChange}>
                    <option value="">--Выберите магазин--</option>
                    {shops.map(shop => (
                        <option key={shop.id} value={shop.id}>
                            {shop.name} ({shop.address})
                        </option>
                    ))}
                </select>
            </div>

            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Вывод данных о сумме */}
            {purchaseData && (
                <div>
                    <h3>Данные о сумме:</h3>
                    <p>Сумма денежных средств (Наличные): {purchaseData.totalSales} рублей</p>
                </div>
            )}

            {/* Если данных нет */}
            {purchaseData === null && !loading && !error && (
                <p>Нет данных для выбранного магазина.</p>
            )}
        </div>
    );
};

export default ShopsByPurchaseTypePage;
