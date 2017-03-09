import React from 'react';
import ReactDOM from 'react-dom';
import ReactFilestack from './ReactFilestack';
import styles from './demo.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootNode = document.createElement('div');
  document.body.appendChild(rootNode);
  const apikey = 'Acu94EFL1STGYvkM6a8usz';
  const onSuccess = (result) => {
    console.log('result', result);
  };
  const onError = (error) => {
    console.error('error', error);
  };
  const basicOptions = {
    accept: 'image/*',
    fromSources: ['facebook', 'gmail', 'github'],
    maxSize: 1024 * 1024,
    maxFiles: 3,
  };
  ReactDOM.render(
    <div>
      <form>
        <div>Basic button without options</div>
        <ReactFilestack apikey={apikey} onSuccess={onSuccess} onError={onError} />
      </form>
      <hr />
      <form>
        <div>Custom link(You can put className on the link to style)</div>
        <ReactFilestack apikey={apikey} link onSuccess={onSuccess} onError={onError} />
      </form>
      <hr />
      <form>
        <div>Custom button with custom options and custom styles</div>
        <ReactFilestack apikey={apikey} buttonText="I'm customized" buttonClass={styles.customButton} onSuccess={onSuccess} onError={onError} />
      </form>
      <hr />
      <form>
        <div>Button with some options</div>
        <ReactFilestack apikey={apikey} options={basicOptions} onSuccess={onSuccess} onError={onError} />
      </form>
      <hr />
    </div>,
    rootNode,
  );
});
