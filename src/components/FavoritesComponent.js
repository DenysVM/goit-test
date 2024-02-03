import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import carsAPI from '../api/carsAPI';
import Card from '..//components/common/Card';
import '../styles/FavoritesPage.css';

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
        <div className="favorites-container">
            <div className="favorites-cards">
                {favoriteCars.map((car) => (
                    <Card key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
}

export default FavoritesComponent;
