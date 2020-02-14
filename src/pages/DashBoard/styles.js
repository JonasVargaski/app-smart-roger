import styled from 'styled-components/native';
import StyledButton from '../../components/Button';

export const Container = styled.SafeAreaView`
  flex:1;
  padding:20px 18px;
  align-items:center;
`;

export const Text = styled.Text`
  color:#444;
  font-weight:bold;
  font-size:21px;
  margin-right:12px;
`;

export const Action = styled.View`
  margin-top:21px;
  flex-direction:row;
  align-items:center;
`
export const Button = styled(StyledButton)`
  padding: 0 20px;
  font-size:25px;
  font-weight:bold;
  margin-left:10px;
`;


