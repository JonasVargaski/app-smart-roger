import styled from 'styled-components/native';
import { Platform } from 'react-native';

import TInput from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.select({
    ios: 'padding',
    android: null,
  }),
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
`;

export const Title = styled.Text`
  font-size:25px;
  font-weight:bold;
  color:#666;
  text-align:center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const Input = styled(TInput)`
  margin-bottom: 13px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`;
