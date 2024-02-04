import axios from 'axios';

const BASE_URL = 'https://65ba3268b4d53c06655246fc.mockapi.io/api/cars';

const carsAPI = {
    fetchCars: (page = 1, limit = 12) => {
        return axios.get(`${BASE_URL}?page=${page}&limit=${limit}`).then(response => response.data);
    },

    fetchCarsByIds: (carIds) => {
        const promises = carIds.map((carId) => axios.get(`${BASE_URL}/${carId}`));
        return Promise.all(promises).then((responses) =>
            responses.map((response) => response.data)
        );
    },

    fetchAllCars: () => {
        return axios.get(BASE_URL).then((response) => response.data);
    },
};

export default carsAPI;
