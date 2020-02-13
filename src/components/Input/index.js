import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './styles';

// eslint-disable-next-line react/prop-types
function Input({ style, icon, disabled, ...rest }, ref) {
  return (
    <Container disabled={disabled} style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(0, 0, 0, 0.32)" />}
      <TInput editable={!disabled} {...rest} ref={ref} />
    </Container>
  );
}
export default forwardRef(Input);
