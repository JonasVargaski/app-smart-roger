import styled from 'styled-components/native';
import StyledButton from '../../components/Button';

export const Container = styled.ScrollView`
  flex:1;
  padding:10px 14px;
`;

export const Text = styled.Text`
  color:#444;
  font-size:17px;
`;

export const Action = styled.View`
  width:100%;
  max-width:100%;
  margin-top:16px;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  `

export const ActionContainer = styled.View`
  flex-direction:row;
  align-items:center;
`

export const Button = styled(StyledButton)`
  padding: 0 17px;
  font-size: 25px;
  font-weight: bold;
  margin-left: 8px;
  height: 38px;
`;

export const Status = styled.View`
  width:20px;
  height:20px;
  border-radius:10px;
  border: 1px solid #c5c5c5;
  elevation: 6;
  background: ${props => props.active ? '#2DC200' : '#d3d3d3'};
  margin-right: 4px;
`;

export const SettingsButton = styled.TouchableOpacity`
  margin-right:15px;
`;


