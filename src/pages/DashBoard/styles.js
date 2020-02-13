import styled from 'styled-components/native';
import StyledButton from '../../components/Button';
import ToggleSwitch from 'toggle-switch-react-native'

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
`

export const Switch = styled(ToggleSwitch).attrs({
  onColor:"#634fc9",
  offColor:"#999",
  labelStyle: { color: "#666", fontWeight: "bold" , fontSize: 23,  marginRight:27},
  size:"large",
})`
`;

export const Button = styled(StyledButton)`
padding: 0 35px;
margin-top:45px;
font-size:25px;
font-weight:bold;
`;


