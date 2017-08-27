import React from 'react';
import ReactDOM from 'react-dom';
import ReactFilestack, { client } from '../../src';
import styles from './style.css';

const log = (result) => {
  console.log(JSON.stringify(result));
};

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
      <header>
        <img src="https://filestack.com/themes/filestack/assets/images/press-articles/color.svg" />
        <h1 className={styles['title']}>Filestack-React <small>Examples</small></h1>
        <hr />
      </header>
      <main>
        <form>
          <div>Basic button without options, onSuccess, onError</div>
          <ReactFilestack apikey={apikey} />
        </form>
        <form>
          <div>Custom link(You can add className on the link to style)</div>
          <ReactFilestack apikey={apikey} link onSuccess={onSuccess} onError={onError} />
        </form>

        <form>
          <div>Custom button with custom options and custom styles</div>
          <ReactFilestack apikey={apikey} buttonText="I'm customized" buttonClass={styles.customButton} onSuccess={onSuccess} onError={onError} />
        </form>

        <form>
          <div>Button with some options</div>
          <ReactFilestack apikey={apikey} options={basicOptions} onSuccess={onSuccess} onError={onError} />
        </form>

        <form>
          <div>Button with children</div>
          <ReactFilestack apikey={apikey} link options={basicOptions} onSuccess={onSuccess} onError={onError}>
            <strong>Display whatever you want</strong>
          </ReactFilestack>
        </form>

        <form>
          <div>Custom render</div>
          <ReactFilestack
            apikey={apikey}
            options={basicOptions}
            onSuccess={onSuccess}
            onError={onError}
            render={({ onPick }) => (
              <div>
                <strong>Find an avatar </strong>
                <button onClick={onPick}>Pick</button>
              </div>
            )}
          />
        </form>
      </main>
    </div>,
    rootNode,
  );
  // Directly call Filestack client
  const filestack = client.init(apikey);
  filestack.metadata('itIVgYY9SkacOHF1m6B8', { height: true, width: true }).then(log)
});
