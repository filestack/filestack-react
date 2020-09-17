import React from 'react';
import './App.css';
import ReactFilestack from 'filestack-react';

function App() {
  return (
    <div className="App">
      <div id="inline"></div>
      <ReactFilestack
        component={Button}
        apikey="api_key"
        actionOptions={{
          maxFiles: 10,
          imageMax: [3600, 3600],
          accept: ['image/jpeg'],
          transformations: {
            force: true,
          },
        }}
        onSuccess={(res) => console.log(res)}
      />
    </div>
  );
}

export default App;
