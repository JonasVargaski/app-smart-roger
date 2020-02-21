import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons'
import Background from '../../components/Background';

import useAppContext from '../../store';

import { Container, FloatButton } from './styles';
import Item from './Item';

export default function Settings() {
  const {
    store: { relays },
    dispatch,
  } = useAppContext();

  return (
    <Background>
      <Container >
        {
          relays.map(rl => (
            <Item
              key={rl.id}
              item={rl}
              onChange={item => dispatch({ type: 'CHANGE_RELAY', payload: item })}
              onDelete={item => dispatch({ type: 'REMOVE_RELAY', payload: item.id })}
            />
          ))
        }
      </Container>
      <FloatButton onPress={() => dispatch({ type: "ADD_RELAY" })}>
        <Icon name="add" size={40} color="#fff" />
      </FloatButton>
    </Background>
  );
}
