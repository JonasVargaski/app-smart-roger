import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Label } from './styles';

export default function Loader({ style, label, ...rest }) {
  return (
    <Container style={style}>
      <ActivityIndicator {...rest} color="#7560ec" />
      {label?.length && <Label>{label}</Label>}
    </Container>
  );
}

Loader.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
};

Loader.defaultProps = {
  style: {},
  label: null,
};
