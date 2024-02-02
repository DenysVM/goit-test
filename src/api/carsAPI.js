import axios from 'axios';

const BASE_URL = 'https://65ba3268b4d53c06655246fc.mockapi.io/api/cars';

const carsAPI = {
    fetchCars: () => {
        return axios.get(`${BASE_URL}`)
            .then(response => response.data);
    },

};

export default carsAPI;