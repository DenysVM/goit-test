import React, { useEffect, useState } from 'react';
import Card from './common/Card';
import FiltersComponent from './filters/FiltersComponent';
import carsAPI from '../api/carsAPI';
import '../styles/CatalogComponent.css';

function CatalogComponent() {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [visibleCars, setVisibleCars] = useState(12);
    const [filters, setFilters] = useState({
        make: '',
        price: '',
        mileageFrom: '',
        mileageTo: ''
    });
    const [priceOptions, setPriceOptions] = useState([]);

    useEffect(() => {
        carsAPI.fetchCars().then((data) => {
            setCars(data);
            setFilteredCars(data);
            setMakes([...new Set(data.map((car) => car.make))].sort());

            const maxPrice = Math.max(...data.map(car => parseFloat(car.rentalPrice.substring(1))));
            const options = Array.from({ length: Math.ceil(maxPrice / 10) }, (_, i) => (i + 1) * 10);
            setPriceOptions(options);
        });
    }, []);

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const handleSearch = () => {
        let newFilteredCars = cars.filter(car => {
            const price = parseFloat(car.rentalPrice.substring(1));
            const mileage = parseInt(car.mileage, 10);
            return (!filters.make || car.make === filters.make) &&
                (!filters.price || price <= filters.price) &&
                (!filters.mileageFrom || mileage >= filters.mileageFrom) &&
                (!filters.mileageTo || mileage <= filters.mileageTo);
        });

        setFilteredCars(newFilteredCars);
        setVisibleCars(12);
    };

    const loadMore = () => {
        setVisibleCars(visibleCars + 12);
    };

    return (
        <div className="catalog-container">
            <FiltersComponent
                makes={makes}
                priceRange={priceOptions}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
            />
            <div className="catalog">
                <div className="cards-grid">
                    {filteredCars.slice(0, visibleCars).map(car => (
                        <Card key={car.id} car={car} />
                    ))}
                </div>
                {visibleCars < filteredCars.length && (
                    <button className="load-more-button" onClick={loadMore}>
                        Load more
                    </button>
                )}
            </div>
        </div>
    );
}

export default CatalogComponent;
