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

const transformOptions = {
  url: 'https://process.filestackapi.com/FGs2lXrQRziCX06TBvC1',
  crop: {
    dim: {
      x: 600,
      y: 900,
      width: 600,
      height: 600,
    },
  }
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
            <h2>1. StoreUrl</h2>
            <p>Click on the Button to store <i>https://filestack.com/themes/filestack/assets/images/press-articles/color.svg</i></p>
            <ReactFilestack
              apikey={apikey}
              buttonText="Click!"
              mode="storeUrl"
              options={{ url: 'https://filestack.com/themes/filestack/assets/images/press-articles/color.svg' }}
              onSuccess={response => document.getElementById('store-url-response').innerHTML = JSON.stringify(response)}
              onError={() => document.getElementById('store-url-response').innerHTML = 'Error!'}
            />
            <p id="store-url-response" />
          </form>

          <form>
            <h2>2. Transform</h2>
            <p>Click on the Button to transform <i>https://process.filestackapi.com/FGs2lXrQRziCX06TBvC1</i></p>
            <ReactFilestack
              apikey={apikey}
              buttonText="Click!"
              mode="transform"
              options={transformOptions}
              onSuccess={response => document.getElementById('transform-url').innerHTML = JSON.stringify(response)}
              onError={() => console.log('Error!')}
            />
            <p id="transform-url" />
          </form>

          <form>
            <h2>3. Retrieve</h2>
            <p>Click on the Button to retrieve the metadata of <i>https://process.filestackapi.com/FGs2lXrQRziCX06TBvC1</i></p>
            <ReactFilestack
              apikey={apikey}
              buttonText="Click!"
              mode="retrieve"
              options={{ handle: 'FGs2lXrQRziCX06TBvC1', metadata: true }}
              onSuccess={response => document.getElementById('retrieve-metadata').innerHTML = JSON.stringify(response)}
              onError={() => console.log('Error!')}
            />
            <p id="retrieve-metadata" />
          </form>
        </main>
      </div>
    );
  }
}
