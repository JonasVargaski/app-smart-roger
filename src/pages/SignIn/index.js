import React, { useRef, useState, useEffect } from 'react';
import { Keyboard, AsyncStorage, Alert } from 'react-native';
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

export default function SignIn({ navigation }) {
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [adress, setAdress] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function loadStorage() {
      const data = await AsyncStorage.getItem('login');

      if (data) {
        const { adress, password } = JSON.parse(data);
        setAdress(adress);
        setPassword(password);
      }
    }
    loadStorage();
  }, [])

  async function handleSubmit() {
    Keyboard.dismiss();
    const data = { adress, password };
    await AsyncStorage.setItem('login', JSON.stringify(data))

    try {
      setLoading(true)

      // await axios.post(adress, { password });
      navigation.navigate('Dashboard');

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
            value={adress}
            onChangeText={setAdress}
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
