const initialState = [];

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            console.log('Adding to favorites:', action.payload);
            return [...state, action.payload];
        case 'REMOVE_FROM_FAVORITES':
            return state.filter((carId) => carId !== action.payload);
        default:
            return state;
    }
};

export default favoritesReducer;
