import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import '../../../styles/Modal.css';
import { useEscapeKey, useClickOutside } from '../../../utils/keyboardUtils';
import { useLockBodyScroll } from '../../../utils/useLockBodyScroll';
import '..//..//..//styles/Modal.css'

function Modal({ isOpen, car, onClose }) {
    const modalRef = useRef();

    useEscapeKey(onClose);
    useClickOutside(modalRef, onClose);
    useLockBodyScroll(isOpen);

    if (!isOpen || !car) return null;

    return ReactDOM.createPortal(
        <div className="modal-backdrop">
            <div className="modal-content" ref={modalRef}>
                <button className="modal-close-button" onClick={onClose}>✖</button>
                <img className="modal-car-image" src={car.img} alt={`${car.make} ${car.model}`} />
                <p className="car-modal-car-make">
                    <span>
                        {car.make} <span style={{ color: '#3470FF' }}>{car.model}</span>, {car.year}
                    </span>
                </p>
                <div className="car-details">
                    <div className="car-detail">{car.address.split(',')[1].trim()}</div>
                    <div className="car-detail">{car.address.split(',')[2].trim()}</div>
                    <div className="car-detail">Id: {car.id}</div>
                    <div className="car-detail">Year: {car.year}</div>
                    <div className="car-detail">Type: {car.type}</div>
                    <div className="car-detail">Fuel Consumption: {car.fuelConsumption}</div>
                    <div className="car-detail">Engine Size: {car.engineSize}</div>
                </div>
                <div className="modal-car-description">{car.description}</div>
                <div className="car-accessories">Accessories and functionalities:
                    <div className="accessories">
                        {car.accessories.map((item, index) => (
                            <React.Fragment key={index}>
                                {item}
                                {index !== car.accessories.length - 1 && <span className="accessories-separator"> | </span>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="functionalities">
                        {car.functionalities.map((item, index) => (
                            <React.Fragment key={index}>
                                {item}
                                {index !== car.functionalities.length - 1 && <span className="functionalities-separator"> | </span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="modal-car-title">Rental Conditions:</div>
                <div className="modal-car-conditions">
                    {car.rentalConditions.split('\n').map((condition, index) => (
                        <div key={index} className="rental-condition">
                            {condition}
                        </div>
                    ))}
                    <div className="rental-condition">Mileage: <span style={{ color: '#3470FF' }}>{car.mileage.toLocaleString()}</span></div>
                    <div className="rental-condition">Price: <span style={{ color: '#3470FF' }}>{car.rentalPrice}</span></div>
                </div>
                <div className="rental-button">
                    <a href="tel:+380730000000" className="rental-link">
                        Rental car
                    </a>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default Modal;
