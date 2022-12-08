export const initialState = {
  basket: [],
  user: null,
};

// selectors
export const getBasketTotal = basket => {
  let total = 0;
  basket.forEach(b => {
    if (b.selected) {
      total += b.price * b.quantity;
    }
  });

  return total;
};

export const periods = [
  {
    value: 30,
    name: 'day',
    label: 'last 30 days',
  },
  {
    value: 3,
    name: 'month',
    label: 'last 3 months',
  },
  ...[new Date().getFullYear(), 0, 0].map((_, i, arr) => ({
    value: arr[0] - i,
    name: 'year',
    label: String(arr[0] - i),
  })),
  {
    value: '',
    name: 'archive',
    label: 'Archived orders',
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET': {
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    }

    case 'UPDATE_BASKET': {
      return {
        ...state,
        basket: state.basket.map(p => ({ ...p, ...action.payload })),
      };
    }

    case 'UPDATE_BASKET_PRODUCT': {
      const newBasket = [...state.basket];
      const index = newBasket.findIndex(p => p.id === action.payload.id);
      newBasket[index] = { ...newBasket[index], ...action.payload.changes };

      return {
        ...state,
        basket: newBasket,
      };
    }

    case 'EMPTY_BASKET': {
      return {
        ...state,
        basket: [],
      };
    }

    case 'REMOVE_FROM_BASKET': {
      let newBasket = [...state.basket];
      newBasket.splice(action.payload.index, 1);

      return {
        ...state,
        basket: newBasket,
      };
    }

    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
