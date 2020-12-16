import React, { useState } from 'react';

import { PickerDropPane, PickerInline, PickerOverlay } from 'filestack-react';

const App = () => {
  const [isPickerDropPaneVisible, setIsPickerDropPaneVisible] = useState(false);
  const [isPickerInlineVisible, setIsPickerInlineVisible] = useState(false);
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() =>
            isPickerDropPaneVisible
              ? setIsPickerDropPaneVisible(false)
              : setIsPickerDropPaneVisible(true)
          }
        >
          Picker Drop Pane
        </button>
        <button
          onClick={() =>
            isPickerInlineVisible
              ? setIsPickerInlineVisible(false)
              : setIsPickerInlineVisible(true)
          }
        >
          Picker Inline
        </button>
        <button
          onClick={() =>
            isPickerOverlayVisible
              ? setIsPickerOverlayVisible(false)
              : setIsPickerOverlayVisible(true)
          }
        >
          Picker Overlay
        </button>
      </div>
      <div>
        {isPickerDropPaneVisible && <PickerDropPane apikey='YOUR_APIKEY'><div style={{height: '800px'}}/></PickerDropPane>}
        {isPickerInlineVisible && <PickerInline apikey='YOUR_APIKEY'/>}
        {isPickerOverlayVisible && <PickerOverlay apikey='YOUR_APIKEY'/>}
      </div>
    </div>
  );
};

export default App;
