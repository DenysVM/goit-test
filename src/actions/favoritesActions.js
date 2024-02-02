export const addToFavorites = (carId) => ({
    type: 'ADD_TO_FAVORITES',
    payload: carId,
});

export const removeFromFavorites = (carId) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: carId,
});
