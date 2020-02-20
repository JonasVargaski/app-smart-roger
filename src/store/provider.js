import React, { useReducer } from 'react';
import AppContext from './context';

const INITIAL_STATE = {
  relays: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_TEXT': {
      const text = action.payload.trim().replace(' ', '_');
      return { ...state, beers: [], searchText: text, page: 1 };
    }
    case 'ADD_BEERS': {
      const beers = action.payload;
      return { ...state, beers: [...state.beers, ...beers] };
    }
    case 'INCREMENT_PAGE': {
      return { ...state, page: state.page + 1 };
    }
    default:
      throw new Error();
  }
}

export default function Provider({ children }) {
  const [store, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
