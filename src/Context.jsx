import { createContext, useReducer, useContext, useEffect } from 'react';
import { reducer } from './reducer';
import { CLEAR_CART, REMOVE, INCREASE, DECREASE, DISPLAY_ITEMS, LOADING } from './actions';
import cartItems from './data';
import { getTotals } from './utils';
const url = 'https://www.course-api.com/react-useReducer-cart-project';
const AppContext = createContext(); //1.creaate a context
const initialState = {
  loading: false,
  cart: new Map()
  //if you want to map the cart data then use this fn inside the map cartItems.map(item=>[item.id][item]) and the map will give the key value pair and here we are getting the data form the url and updating the initial state from the reducer
};

//2.context provider
export const Approvider = ({ children }) => {
  //3.instead of too much state use inbuilt react context api
  const [state, dispatch] = useReducer(reducer, initialState); //dispatch is like set state in the use state, reducer will updata, state will get the initial value from the initialstate

  const { totalAmount, totalCost } = getTotals(state.cart); //form utils so that we can provide it to all state

  //dispatch  call backs send to the reducer and invoked from the child components
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const remove = id => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const increase = id => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decrease = id => {
    dispatch({ type: DECREASE, payload: { id } });
  };
  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url); //fecth return promise
    const cartdata = await response.json(); //json return propmise
    console.log(cartdata);
    dispatch({ type: DISPLAY_ITEMS, payload: { cartdata } });
  };

  useEffect(() => {
    //initially mount when rendered
    fetchData();
  }, []);
  //app provider return the value to the children from main
  return <AppContext.Provider value={{ ...state, clearCart, remove, increase, decrease, totalAmount, totalCost, getTotals }}>{children}</AppContext.Provider>;
};

//selfinvoke the global in context itself or again you should import the usecontext and angain invoke it in each single component
export const useGlobalcontext = () => useContext(AppContext);
