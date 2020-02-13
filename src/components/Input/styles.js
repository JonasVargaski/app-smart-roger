import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: #fff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 40, 100, 0.12);

  ${props =>
    props.disabled &&
    css`
      background-color: #f6f6f6;
      border: 1px solid #ccc;
    `}
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.35)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #495057;
`;
