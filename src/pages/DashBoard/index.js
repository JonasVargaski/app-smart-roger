import React from 'react';


import Background from '../../components/Background';
import { Container, Actions, Button } from './styles';

export default function DashBoard() {
  return (
    <Background>
      <Container >
        <Actions>
          <Button>Rele 01</Button>
        </Actions>
        <Actions>
          <Button>Rele 02</Button>
        </Actions>
        <Actions>
          <Button>Rele 03</Button>
        </Actions>
        <Actions>
          <Button>Rele 04</Button>
        </Actions>
        <Actions>
          <Button>Rele 05</Button>
        </Actions>
        <Actions>
          <Button>Rele 06</Button>
        </Actions>
        <Actions>
          <Button>Rele 07</Button>
        </Actions>
        <Actions>
          <Button>Rele 08</Button>
        </Actions>
      </Container>
    </Background >
  );
}
