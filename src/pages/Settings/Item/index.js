import React, { useState, useEffect, memo } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons'

import { Container, Input, Button } from './styles';

function Item({ item, onDelete, onChange }) {
  const [description, setDescription] = useState(item.description || '');
  const [pin, setPin] = useState(item.pin || '');
  const [time, setTime] = useState(item.time || '');

  useEffect(() => {
    onChange({ ...item, description, pin, time });
  }, [description, pin, time])

  return (
    <Container>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        returnKeyType="next"
        placeholder="Nome"
        maxLength={20}
        value={description}
        onChangeText={setDescription}
        style={{ width: '48%' }}
      />
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="numeric"
        returnKeyType="next"
        placeholder="Pino"
        value={pin}
        maxLength={2}
        onChangeText={setPin}
        style={{ width: '20%' }}
      />
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="numeric"
        returnKeyType="next"
        placeholder="Tempo"
        value={time}
        maxLength={4}
        style={{ width: '20%' }}
        onChangeText={setTime}
      />
      <Button onPress={() => onDelete(item)}>
        <Icon name="close" size={28} color="#f00" />
      </Button>
    </Container>
  );
}

export default memo(Item);
