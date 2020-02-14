import React from 'react';
import { AsyncStorage, ToastAndroid, Vibration, Alert } from 'react-native';
import axios from 'axios';

import Background from '../../components/Background';
import { Container, Action, Text, Button } from './styles';

export default function DashBoard() {
  const relays = [
    {
      id: 1,
      name: 'Rele 1',
      type: 'R'
    },
    {
      id: 2,
      name: 'Rele 2',
      type: 'R'
    },
    {
      id: 3,
      name: 'Rele 3',
      type: 'R'
    },
    {
      id: 4,
      name: 'Rele 4',
      type: 'R'
    },
    {
      id: 5,
      name: 'Rele 5',
      type: 'R'
    },
    {
      id: 6,
      name: 'Rele 6',
      type: 'R'
    },
    {
      id: 7,
      name: 'Rele 7',
      type: 'R'
    },
    {
      id: 8,
      name: 'Rele 8',
      type: 'P'
    },
  ]

  async function sendToServer(relay, action) {
    Vibration.vibrate(90);

    try {
      const { adress } = JSON.parse(await AsyncStorage.getItem('login'));
      console.log(`${adress}?rl-${relay.id}-${relay.type}-${action}`);

      await axios.get(`${adress}?rl-${relay.id}-${relay.type}-${action}`);

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
          <Action key={relay.id}>
            <Text>{relay.name}</Text>
            <Button onPress={() => sendToServer(relay, 'ON')}>
              Ligar
           </Button>
            <Button style={{ backgroundColor: '#888' }} onPress={() => sendToServer(relay, 'OFF')}>
              Desligar
           </Button>
          </Action>
        ))}
      </Container>
    </Background >
  );
}
