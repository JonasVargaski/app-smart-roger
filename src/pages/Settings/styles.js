import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

export const FloatButton = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background: #2DC200;
  align-items: center;
  justify-content: center;
  position:absolute;
  right: 24px;
  bottom: 17px;
  elevation: 6;
`;
