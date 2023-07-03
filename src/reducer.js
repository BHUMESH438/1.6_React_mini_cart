import { CLEAR_CART, REMOVE, INCREASE, DECREASE, DISPLAY_ITEMS, LOADING } from './actions';
export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    //setting up a new map beacause value is passed by referncethe map will provide an obj of key and value pair
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    newCart.delete(itemId);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }
  // passing map inside the map will give the same result
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.cartdata.map(item => [item.id, item]));
    return { ...state, loading: false, cart: newCart };
  }
  throw new Error(`no atching action type ${action.type}`);
};
