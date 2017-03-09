import React from 'react';
import ReactDOM from 'react-dom';
import ReactFilestack from './ReactFilestack';
import styles from './demo.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootNode = document.createElement('div');
  document.body.appendChild(rootNode);
  const apikey = 'Acu94EFL1STGYvkM6a8usz';
  const callback = (result) => {
    console.log('result', result);
  };
  ReactDOM.render(
    <div>
      <form>
        <div>Basic button without options</div>
        <ReactFilestack apikey={apikey} onSuccess={callback} />
      </form>
      <hr />
      <form>
        <div>Custom link(You can put className on the link to style)</div>
        <ReactFilestack apikey={apikey} link onSuccess={callback} />
      </form>
      <hr />
      <form>
        <div>Custom button with custom options and custom styles</div>
        <ReactFilestack apikey={apikey} buttonText="I'm customized" buttonClass={styles.customButton} onSuccess={callback} />
      </form>
      <hr />
    </div>,
    rootNode,
  );
});
