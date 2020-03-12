import React, { useReducer, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import AppContext from './context';
import uniqueID from '../util/uniqueID';

const INITIAL_STATE = {
  address: '',
  password: '',
  relays: [],
  temp: 0,
  tempAdj: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'PERSIST_HAYDRATE': {
      const data = action.payload;
      return { ...state, ...data };
    }
    case 'SET_SERVER_INFO': {
      const { address, password } = action.payload;
      return { ...state, address, password };
    }
    case 'SET_TEMPADJ': {
      const tempAdj = action.payload;
      return { ...state, tempAdj };
    }
    case 'ADD_RELAY': {
      return { ...state, relays: [...state.relays, { id: uniqueID(), pin: '', description: '', time: '', active: false }] };
    }
    case 'REMOVE_RELAY': {
      const id = action.payload;
      return { ...state, relays: state.relays.filter(r => r.id !== id) };
    }
    case 'CHANGE_RELAY': {
      const relay = action.payload;
      const index = state.relays.findIndex(r => r.id == relay.id);
      const newRelays = state.relays;
      newRelays.splice(index, 1, relay)
      return { ...state, relays: newRelays };
    }
    case 'CHANGE_SYNC_DATA': {
      const pins = action.payload;
      return {
        ...state, relays: state.relays.map(r => {
          if (typeof pins[`d${r.pin}`] == 'number') {
            r.active = pins[`d${r.pin}`] == 1;
          }
          return r;
        }),
        temp: pins.temp || 0,
        tempAdj: pins.tempAdj || 0
      };
    }

    default:
      throw new Error();
  }
}

export default function Provider({ children }) {
  const [store, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    async function load() {
      const data = await AsyncStorage.getItem('storage:app');
      if (data) {
        dispatch({ type: 'PERSIST_HAYDRATE', payload: JSON.parse(data) })
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function save() {
      await AsyncStorage.setItem('storage:app', JSON.stringify(store));
    }
    setTimeout(() => {
      save();
    }, 250);
  }, [store]);


  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
