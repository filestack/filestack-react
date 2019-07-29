import React, { Component } from 'react';
import ReactFilestack from './../../dist/filestack-react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '',
      example: null
    };
  }

  updateInputValue(evt) {
    this.setState({
      apiKey: evt.target.value
    });
  }

  renderComponentInstances() {
    return <div className="examples">
      <div className="example example1">
        <div className="label">#1 - Show picker directly after component is mounted</div>
          <ReactFilestack
          apikey={this.state.apiKey}
          componentDisplayMode={{
            type: 'immediate'
          }}/>
      </div>

      <div className="example example2">
        <div className="label">#2 - Open picker using a button</div>
        <ReactFilestack
          apikey={this.state.apiKey}
          componentDisplayMode={{
              type: 'button',
              customText: 'Click here to open picker',
              customClass: 'some-custom-class'
          }}
          onSuccess={this.yourCallbackFunction}
        />
      </div>

      <div className="example example3">
        <div className="label">#3 - Open picker using a custom element</div>
        <ReactFilestack
          apikey={this.state.apiKey}
          customRender={({ onPick }) => (
            <div>
              <strong>Find an avatar</strong>
              <button onClick={onPick}>Pick</button>
            </div>
          )}
          onSuccess={this.yourCallbackFunction}
        />
      </div>

      <div className="example example4">
        <div className="label">#4 - Open picker in inline mode</div>
        <ReactFilestack
          apikey={this.state.apiKey}
          componentDisplayMode={{
              type: 'button',
              customText: 'Click here to open picker',
              customClass: 'some-custom-class'
          }}
          actionOptions={{
            displayMode: "inline",
            container: "testContainer"
          }}
          onSuccess={this.yourCallbackFunction}
        />
      </div>

      <div className="example example5">
        <div className="label">#5 - Open picker dropPane mode</div>
        <ReactFilestack
          apikey={this.state.apiKey}
          componentDisplayMode={{
              type: 'button',
              customText: 'Click here to open picker',
              customClass: 'some-custom-class'
          }}
          actionOptions={{
            displayMode: "dropPane",
            container: "testContainer"
          }}
          onSuccess={this.yourCallbackFunction}
        />
      </div>
    </div>
  };

  render() {
    return (
      <div className="App">
        <h1>
          react-filestack demo app
        </h1>
        <input placeholder="Filestack api key" name="apiKey" value={this.state.apiKey} onChange={evt => this.updateInputValue(evt)}/>
        <div className="main">
          {this.state.apiKey.length && this.renderComponentInstances()}
          <div id="testContainer" ref={this.testContainer}></div>
        </div>
      </div>
    );
  }
}

export default App;
