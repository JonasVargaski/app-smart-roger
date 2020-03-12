import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome'

import { Container, BoxTemp, Label, TempC, RefreshButton, Input, Config } from './styles';

export default function Temp({ temp, tempAdj, onRefresh, onChange }) {
  return (
    <Container>
      <Icon style={{ marginLeft: 10 }} name="thermometer-half" size={50} color="#E53935" />

      <BoxTemp>
        <Label>Temp. </Label>
        <TempC>{String(temp)} °C</TempC>
      </BoxTemp>

      <Config>
        <Label>Ajuste: </Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          returnKeyType="next"
          placeholder="Ajuste"
          value={String(tempAdj)}
          maxLength={4}
          onChangeText={value => onChange(value)}
        />
      </Config>

      <RefreshButton onPress={onRefresh}>
        <Icon name="refresh" size={27} color="#1AA1DB" />
      </RefreshButton>
    </Container>
  );
}
