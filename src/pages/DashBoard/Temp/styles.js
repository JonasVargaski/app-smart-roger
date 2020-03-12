import styled from 'styled-components/native';
import TInput from '../../../components/Input';

export const Container = styled.View`
  width: 100%;
  background: #fdfdfd;
  height: 90px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 8px auto 0 auto;
  elevation: 2;
  flex-direction: row;
  align-items: center;
  padding: 3px;
  position: relative;
`;

export const BoxTemp = styled.View`
  align-items: flex-start;
  margin-left: 35px;
`;

export const Label = styled.Text`
  font-size:17px;
  font-weight:bold;
  color:#777;
`;

export const TempC = styled.Text`
  font-size:28px;
  line-height: 30px;
  font-weight:bold;
  color:#555
`;

export const Input = styled(TInput)`
  height: 35px;
  width: 75px;
  padding: 0 3px;
`;

export const RefreshButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 9px; 
`;

export const Config = styled.View`
  position: absolute;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  right: 4px;
  bottom: 5px; 
`;
