export const initialState = {
  basket: [],
};

// selectors
export const getBasketTotal = basket => {
  return basket.reduce((amount, p) => p.price + amount, 0);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    case 'REMOVE_FROM_BASKET':
      let newBasket = [...state.basket];
      newBasket.splice(action.payload.index, 1);

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
