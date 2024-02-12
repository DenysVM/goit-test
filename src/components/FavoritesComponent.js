import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import carsAPI from '../api/carsAPI';
import Card from '../components/common/Card';
import '../styles/CatalogComponent.css';

function FavoritesComponent() {
    const favoriteIds = useSelector((state) => state.favorites);
    const [favoriteCars, setFavoriteCars] = useState([]);

    useEffect(() => {
        const fetchFavoriteCars = async () => {
            try {
                if (favoriteIds.length > 0) {
                    const cars = await carsAPI.fetchCarsByIds(favoriteIds);
                    setFavoriteCars(cars);
                } else {
                    setFavoriteCars([]);
                }
            } catch (error) {
                console.error('Ошибка при получении данных об избранных автомобилях', error);
            }
        };

        fetchFavoriteCars();
    }, [favoriteIds]);

    return (
        <div className="catalog-container">
            <div className="catalog">
                {favoriteCars.length > 0 ? (
                    <ul className="cards-grid">
                        {favoriteCars.map((car) => (
                            <li key={car.id}>
                                <Card car={car} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="placeholder-container">
                        <p>У вашому списку обраних авто немає.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FavoritesComponent;
