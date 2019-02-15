import React, { Component } from 'react';
import ReactFilestack from './../../../src/index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      apiKey: evt.target.value
    });
  }

  render() {
    const display = this.state.apiKey.length ? {display: 'block'} : {display: 'none'};
    return (
      <div className="App">
        <h1>
          react-filestack demo app
        </h1>
        <input placeholder="Filestack api key" name="apiKey" value={this.state.apiKey} onChange={evt => this.updateInputValue(evt)}/>
        <div className="examples" style={display}>
          <hr></hr>
          <div className="example1">
            <div className="label">Button - overlay mode</div>
            <ReactFilestack
              apikey={this.state.apiKey}
              buttonText="Pick file"
              buttonClass="example1Btn"
              onSuccess={this.yourCallbackFunction}
            />
          </div>
          <hr></hr>
          <div className="example2">
            <div className="label">Custom link - overlay mode</div>
            <ReactFilestack
              apikey={this.state.apiKey}
              buttonText="Click"
              buttonClass="example2Btn"
              onSuccess={this.yourCallbackFunction}
              link
            />
          </div>
          <hr></hr>
          <div className="example3">
            <div className="label">Button - dropPane mode</div>
            <ReactFilestack
              apikey={this.state.apiKey}
              buttonText="Pick file"
              buttonClass="example3Btn"
              onSuccess={this.yourCallbackFunction}
              options={{
                displayMode: 'dropPane',
                container: 'testContainer3'
              }}
            />
          </div>
          <div id="testContainer3"></div>
          <hr></hr>
          <div className="example4">
            <div className="label">Button - inline mode</div>
            <ReactFilestack
              apikey={this.state.apiKey}
              buttonText="Pick file"
              buttonClass="example4Btn"
              onSuccess={this.yourCallbackFunction}
              options={{
                displayMode: 'inline',
                container: 'testContainer4'
              }}
            />
          </div>
          <div id="testContainer4"></div>
        </div>
      </div>
    );
  }
}

export default App;
