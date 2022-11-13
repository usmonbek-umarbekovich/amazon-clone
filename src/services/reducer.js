export const initialState = {
  basket: [
    {
      id: '3254354345',
      title:
        'New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)',
      price: 598.99,
      inStock: 99,
      quantity: 1,
      selected: true,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg',
      highlights: {
        style: 'Wifi',
        size: '128GB',
        color: 'Silver',
      },
    },
    {
      id: '90829332',
      title:
        "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
      price: 1094,
      inStock: 8,
      quantity: 2,
      selected: true,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg',
      highlights: {
        size: '49-inch',
        style: 'Ultra Wide Dual',
        configuration: 'Curver',
      },
    },
    {
      id: '49538094',
      title:
        'Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl',
      price: 239,
      inStock: 99,
      quantity: 2,
      selected: true,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg',
      highlights: {
        color: 'Silver',
      },
    },
    {
      id: '12321341',
      title:
        'The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback',
      price: 11.99,
      inStock: 7,
      quantity: 1,
      selected: true,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
      highlights: {},
    },
    {
      id: '4903850',
      title:
        'SmartWatch Fitness Tracker for Men Women with Heart Rate Tracker, Step Counter, Notifications, Sleep Monitor by iTOUCH',
      price: 199.99,
      inStock: 99,
      quantity: 3,
      selected: true,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg',
      highlights: {
        size: '40mm',
        color: 'Black/Dark',
      },
    },
    {
      id: '23445930',
      title:
        'Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric',
      price: 98.99,
      inStock: 6,
      quantity: 1,
      selected: true,
      image:
        'https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$',
      highlights: {
        color: 'Silver',
      },
    },
  ],
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
