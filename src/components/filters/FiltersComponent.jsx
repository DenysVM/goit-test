import React from 'react';
import '../../styles/FiltersComponent.css'; 

function FiltersComponent({ makes = [], priceRange = [], onFilterChange, onSearch }) {
    return (
        <div className="filters">
            <div className="filter-group">
                <label htmlFor="car-make">Car brand</label>
                <select id="car-make" onChange={(e) => onFilterChange('make', e.target.value)} defaultValue="">
                    <option value="">Enter the text</option>
                    {makes.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="car-price">Price/ 1 hour</label>
                <select id="car-price" onChange={(e) => onFilterChange('price', e.target.value)} defaultValue="">
                    <option value="">To $</option>
                    {priceRange.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                    ))}
                </select>
            </div>
            <div className="filter-group mileage-group">
                <label htmlFor="mileage-from">Car mileage / km</label>
                <div className="mileage-inputs">
                    <input 
                        type="number" 
                        id="mileage-from"
                        className="input-mileage" 
                        placeholder="From" 
                        onChange={(e) => onFilterChange('mileageFrom', e.target.value)} 
                    />
                    <div className="divider"></div>
                    <input 
                        type="number" 
                        id="mileage-to"
                        className="input-mileage" 
                        placeholder="To" 
                        onChange={(e) => onFilterChange('mileageTo', e.target.value)} 
                    />
                </div>
            </div>
            <button className="search-button" onClick={onSearch}>Search</button>
        </div>
    );
}

export default FiltersComponent;