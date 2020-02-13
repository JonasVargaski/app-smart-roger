import React, { useRef, useState } from 'react';
import { Keyboard } from 'react-native';
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    // const { data } = await api.get('')
    Keyboard.dismiss();
  }


  return (
    <Background>
      <Container>
        <Title>Automação Roger</Title>
        <Form>
          <Input
            icon="public"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Endereço Servidor"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
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
