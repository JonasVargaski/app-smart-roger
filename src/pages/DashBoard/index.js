import React, { useState } from 'react';
import {AsyncStorage} from 'react-native';
import axios from 'axios';


import Background from '../../components/Background';
import { Container, Action, Switch, Button } from './styles';

export default function DashBoard() {
  const [relays, setRelays] = useState([
    {
      id: 'rl1',
      name: 'Rele 1',
      value:false,
      type:'retention'
    },
    {
      id: 'rl2',
      name: 'Rele 2',
      value:false,
      type:'retention'
    },
    {
      id: 'rl3',
      name: 'Rele 3',
      value:false,
      type:'retention'
    },
    {
      id: 'rl4',
      name: 'Rele 4',
      value:false,
      type:'retention'
    },
    {
      id: 'rl5',
      name: 'Rele 5',
      value:false,
      type:'retention'
    },
    {
      id: 'rl6',
      name: 'Rele 6',
      value:false,
      type:'retention'
    },
    {
      id: 'rl7',
      name: 'Rele 7',
      value: false,
      type:'retention'
    },
    {
      id: 'rl8',
      name: 'Rele 8',
      value: false,
      type:'pulse'
    },
  ])
  
    function handleSwitch({ name }){
      setRelays([...relays.map(rl => ({...rl, value: rl.name === name ? !rl.value : rl.value }))]);
    }

    async function sendToServer(){
      const data = relays.map(r=> {return `${r.id}-${r.value ? 'ON' : 'OFF'}-${r.type === 'pulse' ? 'P': 'R'}`}).join('#')
      const { adress } = JSON.parse(await AsyncStorage.getItem('login'));
      // const response = await axios.get(`${adress}?${data}`);
      console.log( data);
    }

  return (
    <Background>
      <Container >
        {relays.map(relay => (
         <Action key={relay.id}>
            <Switch isOn={relay.value} label={relay.name} onToggle={()=> handleSwitch(relay)}/>
         </Action>
        ))}

        <Button onPress={sendToServer}>
          Enviar
        </Button>
      </Container>
    </Background >
  );
}
