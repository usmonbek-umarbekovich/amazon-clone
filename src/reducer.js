export const initialState = {
  basket: [],
};

// selectors
export const getBasketTotal = basket => {
  return basket.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
