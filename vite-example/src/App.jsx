import { useState } from 'react';

import { PickerDropPane, PickerInline, PickerOverlay } from 'filestack-react';

const APIKEY = 'YOUR_APIKEY';

const App = () => {
  const [isPickerDropPaneVisible, setIsPickerDropPaneVisible] = useState(false);
  const [isPickerInlineVisible, setIsPickerInlineVisible] = useState(false);
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setIsPickerDropPaneVisible((v) => !v)}>
          Picker Drop Pane
        </button>
        <button onClick={() => setIsPickerInlineVisible((v) => !v)}>
          Picker Inline
        </button>
        <button onClick={() => setIsPickerOverlayVisible((v) => !v)}>
          Picker Overlay
        </button>
      </div>
      <div>
        {isPickerDropPaneVisible && (
          <PickerDropPane apikey={APIKEY}>
            <div style={{ height: '800px' }} />
          </PickerDropPane>
        )}
        {isPickerInlineVisible && <PickerInline apikey={APIKEY} />}
        {isPickerOverlayVisible && <PickerOverlay apikey={APIKEY} />}
      </div>
    </div>
  );
};

export default App;
