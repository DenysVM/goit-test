import React, { useEffect, useState } from 'react';
import Card from './common/Card';
import FiltersComponent from './filters/FiltersComponent';
import carsAPI from '../api/carsAPI';
import '../styles/CatalogComponent.css';

function CatalogComponent() {
    const [allCars, setAllCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        make: '',
        price: '',
        mileageFrom: '',
        mileageTo: ''
    });
    const [hasMore, setHasMore] = useState(true);
    const [makes, setMakes] = useState([]);
    const [priceOptions, setPriceOptions] = useState([]);

    useEffect(() => {
        carsAPI.fetchCars(currentPage).then((data) => {
            const newCars = currentPage === 1 ? data : [...allCars, ...data];
            setAllCars(newCars);

            if (currentPage === 1 || Object.values(filters).every(value => !value)) {
                setFilteredCars(newCars);
            }

            setHasMore(data.length === 12);
            updateFilters(newCars);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const updateFilters = (cars) => {
        const uniqueMakes = [...new Set(cars.map(car => car.make))].sort();
        setMakes(uniqueMakes);

        const maxPrice = Math.max(...cars.map(car => parseFloat(car.rentalPrice.substring(1))));
        const options = Array.from({ length: Math.ceil(maxPrice / 10) }, (_, i) => (i + 1) * 10);
        setPriceOptions(options);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    const handleSearch = () => {
        let newFilteredCars = allCars.filter(car => {
            const price = parseFloat(car.rentalPrice.substring(1));
            const mileage = parseInt(car.mileage, 10);
            return (!filters.make || car.make === filters.make) &&
                (!filters.price || price <= filters.price) &&
                (!filters.mileageFrom || mileage >= filters.mileageFrom) &&
                (!filters.mileageTo || mileage <= filters.mileageTo);
        });
        setFilteredCars(newFilteredCars);
    };

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
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
                    {filteredCars.map(car => (
                        <Card key={car.id} car={car} />
                    ))}
                </div>
                {hasMore && (
                    <button className="load-more-button" onClick={loadMore}>
                        Load more
                    </button>
                )}
            </div>
        </div>
    );
}

export default CatalogComponent;
