import styled from 'styled-components/native';
import StyledButton from '../../components/Button';

export const Container = styled.View`
  flex:1;
  padding:20px 15px;
`;

export const Actions = styled.View`
  margin-top:10px;
`;

export const Button = styled(StyledButton).attrs({
  backgroundColor: '#2a2a2a'
})`
`;
