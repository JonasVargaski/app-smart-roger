import styled from 'styled-components/native';
import TInput from '../../../components/Input';

export const Container = styled.View`
  flex-direction:row;
  align-items:center;
  justify-content:space-around;
  width:100%;
  margin-top:8px;
`;

export const Input = styled(TInput)`
  height: 40px;
  padding: 0 3px;
`;

export const Button = styled.TouchableOpacity`
  margin-left: 5px;
`;

