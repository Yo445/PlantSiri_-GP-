import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {
  remainingTime: localStorage.getItem('remainingTime') 
                  ? parseInt(localStorage.getItem('remainingTime')) 
                  : null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REMAINING_TIME':
      return { ...state, remainingTime: action.payload };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
