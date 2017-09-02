import React from 'react';
import { render } from 'react-dom';
import { client } from '../../src';
import Container from './components/Container';

const apikey = 'Acu94EFL1STGYvkM6a8usz';

render (
  <Container apikey={apikey} />,
  document.getElementById('app'),
);

// Directly call Filestack client
const log = result => console.log(JSON.stringify(result));
const filestack = client.init(apikey);
filestack.metadata('FGs2lXrQRziCX06TBvC1', { height: true, width: true }).then(log);
