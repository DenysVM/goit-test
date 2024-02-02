import React, { useEffect, useState } from 'react';
import Card from './common/Card';
import carsAPI from '../api/carsAPI';
import '../styles/CatalogComponent.css';

function CatalogComponent() {
    const [cars, setCars] = useState([]);
    const [visibleCars, setVisibleCars] = useState(12);

    useEffect(() => {
        carsAPI.fetchCars().then((data) => setCars(data));
    }, []);

    const loadMore = () => {
        setVisibleCars((prevVisibleCars) => prevVisibleCars + 12);
    };

    return (
        <div className="catalog">
            <div className="cards-grid">
                {cars.slice(0, visibleCars).map((car) => (
                    <Card key={car.id} car={car} />
                ))}
            </div>
            {visibleCars < cars.length && (
                <button className="load-more-button" onClick={loadMore}>
                    Load more
                </button>
            )}
        </div>
    );
}

export default CatalogComponent;
