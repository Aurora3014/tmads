import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch = async (action) => {
    if (typeof action === 'function') {
      return action(dispatch, state);
    }
    return dispatch(action);
  };

  return (
    <StoreContext.Provider value={[state, asyncDispatch]}>
      {children}
    </StoreContext.Provider>
  );
};