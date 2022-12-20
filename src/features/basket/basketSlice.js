import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const basketAdapter = createEntityAdapter();

const basketSlice = createSlice({
  name: 'basket',
  initialState: basketAdapter.getInitialState(),
  reducers: {
    // TODO: handle adding the same product again
    productAdded: basketAdapter.addOne,
    productUpdated(basket, action) {
      basketAdapter.updateOne(basket, action.payload);
    },
    productRemoved(basket, action) {
      basketAdapter.removeOne(basket, action.payload);
    },
    basketUpdated(basket, action) {
      const updates = basket.ids.map(id => ({ id, changes: action.payload }));
      basketAdapter.updateMany(basket, updates);
    },
    basketCleaned: basketAdapter.removeAll,
  },
});

// prettier-ignore
export const {
  selectAll: selectAllProducts,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectById: selectProductById
} = basketAdapter.getSelectors(state => state.basket);

// prettier-ignore
export const selectTotalPrice = createSelector(
  selectAllProducts,
  products => {
    let total = 0;
    products.forEach(product => {
      if (product.selected) {
        total += product.price * product.quantity;
      }
    });

    return total;
  }
);

export const selectTotalQuantity = createSelector(
  selectAllProducts,
  products => {
    let total = 0;
    products.forEach(({ quantity }) => {
      total += quantity;
    });

    return total;
  }
);

export const {
  productAdded,
  productUpdated,
  productRemoved,
  basketUpdated,
  basketCleaned,
} = basketSlice.actions;
export default basketSlice.reducer;
