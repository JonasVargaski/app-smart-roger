import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  background: ${props => (props.disabled ? '#c7c5c5' : '#7560ec')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
