import React, { useRef, useState, useEffect } from 'react';
import { Keyboard, AsyncStorage } from 'react-native';
import api from '../../services/api';

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

  const [adress, setAdress] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function loadStorage() {
      const data = await AsyncStorage.getItem('login');

      if (data) {
        const { adress } = JSON.parse(data);
        setAdress(adress);
      }
    }
    loadStorage();
  }, [])

  async function handleSubmit() {
    const data = { adress, password };
    await AsyncStorage.setItem('login', JSON.stringify(data))
    // const { data } = await api.get('')
    Keyboard.dismiss();
    navigation.navigate('Dashboard')
  }


  return (
    <Background>
      <Container>
        <Title>Login do Usuário</Title>
        <Form>
          <Input
            icon="public"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Endereço Servidor"
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

          <SubmitButton onPress={handleSubmit}>
            <TextButton>Acessar</TextButton>
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
