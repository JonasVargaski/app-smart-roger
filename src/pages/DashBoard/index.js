import React from 'react';
import { AsyncStorage, ToastAndroid, Vibration, Alert } from 'react-native';
import axios from 'axios';

import Background from '../../components/Background';
import { Container, Action, Text, Button } from './styles';

export default function DashBoard() {
  const relays = [
    {
      pin: 2,
      name: 'Rele 1',
      type: 'R'
    },
    {
      pin: 3,
      name: 'Rele 2',
      type: 'R'
    },
    {
      pin: 4,
      name: 'Rele 3',
      type: 'R'
    },
    {
      pin: 5,
      name: 'Rele 4',
      type: 'R'
    },
    {
      pin: 6,
      name: 'Rele 5',
      type: 'R'
    },
    {
      pin: 7,
      name: 'Rele 6',
      type: 'R'
    },
    {
      pin: 8,
      name: 'Rele 7',
      type: 'R'
    },
    {
      pin: 9,
      name: 'Rele 8',
      type: 'P'
    },
  ]

  async function sendToServer({ pin, type }, action) {
    Vibration.vibrate(90);

    try {
      const { adress, password } = JSON.parse(await AsyncStorage.getItem('login'));

      await axios.post(adress, { password, pin, action, type });

      ToastAndroid.showWithGravityAndOffset(
        'Sinal Enviado!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        120,
      );

      setTimeout(() => {
        Vibration.vibrate([100, 100, 100, 100]);
      }, 200);

    } catch ({ message }) {
      Alert.alert(
        'Erro ao enviar soliticação!',
        message,
      );
      Vibration.vibrate(650);
    }
  }

  return (
    <Background>
      <Container >
        {relays.map(relay => (
          <Action key={relay.pin}>
            <Text>{relay.name}</Text>
            <Button onPress={() => sendToServer(relay, 1)}>
              Ligar
           </Button>
            <Button style={{ backgroundColor: '#333' }} onPress={() => sendToServer(relay, 0)}>
              Desligar
           </Button>
          </Action>
        ))}
      </Container>
    </Background >
  );
}
