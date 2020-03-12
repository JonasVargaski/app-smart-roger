import React, { useRef, useState, useEffect } from 'react';
import { Keyboard, Alert } from 'react-native';
import axios from 'axios';

import Background from '../../components/Background';
import {
  Container,
  Title,
  Form,
  Input,
  SubmitButton,
  TextButton,
} from './styles';

import useAppContext from '../../store';

export default function SignIn({ navigation }) {
  const { store, dispatch } = useAppContext();

  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setAddress(store.address);
    setPassword(store.password);
  }, [store.address])

  async function handleSubmit() {
    Keyboard.dismiss();
    dispatch({ type: 'SET_SERVER_INFO', payload: { address, password } })
    try {
      setLoading(true);

      const { data } = await axios.post(address, { password });
      if (data.pins) {
        dispatch({ type: 'CHANGE_SYNC_DATA', payload: data.pins });
        navigation.navigate('Dashboard');
      }

    } catch ({ message }) {
      Alert.alert('Erro ao estabelecer conexão com o servidor!', message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <Title>Autenticação</Title>
        <Form>
          <Input
            icon="public"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Endereço do Servidor"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={address}
            onChangeText={setAddress}
          />

          <Input
            icon="lock-outline"
            autoCorrect={false}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Senha de Acesso"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            <TextButton>Acessar</TextButton>
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
