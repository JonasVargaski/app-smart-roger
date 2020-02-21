import React from 'react';
import { ToastAndroid, Vibration, Alert } from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/MaterialIcons'

import Background from '../../components/Background';
import { Container, Action, ActionContainer, Text, Status, Button, SettingsButton } from './styles';

import useAppContext from '../../store';

export default function Dashboard({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <SettingsButton onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings" size={25} color="#FFF" />
      </SettingsButton>
    ),
  });

  const {
    store: { relays, address, password },
    dispatch,
  } = useAppContext();

  async function sendToServer(relay, action) {
    Vibration.vibrate(90);
    try {

      const { data } = await axios.post(address, { password, pin: Number(relay.pin), time: Number(relay.time), action });

      if (!data.pins) {
        throw new Error("No data received from server");
      }

      dispatch({ type: 'CHANGE_STATUS_RELAYS', payload: data.pins });

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
            <Text>{relay.description}</Text>
            <ActionContainer>
              <Status active={relay.active} />
              <Button onPress={() => sendToServer(relay, 1)}>
                Ligar
               </Button>
              <Button style={{ backgroundColor: '#333' }} onPress={() => sendToServer(relay, 0)}>
                Desligar
              </Button>
            </ActionContainer>
          </Action>
        ))}
      </Container>
    </Background >
  );
}
