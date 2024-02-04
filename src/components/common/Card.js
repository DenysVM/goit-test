import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../actions/favoritesActions';
import Modal from '../common/Modal/Modal';
import useModal from '../../hooks/useModal';
import '../../styles/Card.css';
import active from './assets/active.svg';
import normal from './assets/normal.svg';



function Card({ car }) {
    const { isModalOpen, open, close } = useModal();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const isFavorite = favorites.includes(car.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(car.id));
        } else {
            dispatch(addToFavorites(car.id));
        }
    };

    return (
        <div className="card">
            <div className="card-image-container">
                <img className="card-image" src={car.img} alt={`${car.make} ${car.model}, ${car.year}`} />
                <div className={`favorite-icon ${isFavorite ? 'favorite' : ''}`} onClick={toggleFavorite}>
                    {isFavorite ? <img src={active} alt="Filled Heart" /> : <img src={normal} alt="Outline Heart" />}
                </div>
            </div>
            <div className="card-details">
                <p className="car">
                    <span>
                        {car.make} <span style={{ color: '#3470FF' }}>{car.model}</span>, {car.year}
                    </span>
                    <span className="price">{car.rentalPrice}</span>
                </p>
                <p className="card-content">
                    <span>{car.address.split(',')[1].trim()}</span> | <span>{car.address.split(',')[2].trim()}</span> | <span>{car.rentalCompany}</span> | <span>{car.type}</span> | <span>{car.make}</span> | <span>{car.mileage}</span> | <span>{car.functionalities[0]}</span>
                </p>
            </div>
            <button className="learn-more-button" onClick={open}>Learn more</button>
            <Modal isOpen={isModalOpen} car={car} onClose={close} />
        </div>
    );
}

export default Card;
