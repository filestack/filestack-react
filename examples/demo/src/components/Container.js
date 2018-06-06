import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFilestack from '../../../src';
import styles from '../style.css';

const onSuccess = result => {
  console.log('result', result);
};

const onError = error => {
  console.error('error', error);
};

const basicOptions = {
  accept: 'image/*',
  fromSources: ['facebook', 'gmail', 'github'],
  maxSize: 1024 * 1024,
  maxFiles: 3,
};

export default class Container extends Component {
  static propTypes = {
    apikey: PropTypes.string.isRequired,
  };

  render () {
    const { apikey } = this.props;
    return (
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
      </div>
    );
  }
}
