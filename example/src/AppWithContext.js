import React, { useState } from 'react';

import {
  FilestackProvider,
  PickerDropPane,
  PickerInline,
  PickerOverlay
} from 'filestack-react';

const GLOBAL_APIKEY = 'YOUR_APIKEY';
const LOCAL_APIKEY = 'YOUR_APIKEY';

const AppWithContext = () => {
  const [isPickerDropPaneVisible, setIsPickerDropPaneVisible] = useState(false);
  const [isPickerInlineVisible, setIsPickerInlineVisible] = useState(false);
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);

  return (
    <FilestackProvider
      apikey={GLOBAL_APIKEY}
      pickerOptions={{ maxFiles: 3 }}
      onUploadDone={(res) => console.log('provider onUploadDone', res)}
      onError={(err) => console.log('provider onError', err)}
    >
      <div>
        <div>
          <button
            onClick={() =>
              setIsPickerDropPaneVisible(!isPickerDropPaneVisible)
            }
          >
            Picker Drop Pane (provider apikey)
          </button>
          <button
            onClick={() => setIsPickerInlineVisible(!isPickerInlineVisible)}
          >
            Picker Inline (provider apikey)
          </button>
          <button
            onClick={() => setIsPickerOverlayVisible(!isPickerOverlayVisible)}
          >
            Picker Overlay (local apikey overrides provider)
          </button>
        </div>
        <div>
          {isPickerDropPaneVisible && (
            <PickerDropPane>
              <div style={{ height: '800px' }} />
            </PickerDropPane>
          )}
          {isPickerInlineVisible && <PickerInline />}
          {isPickerOverlayVisible && <PickerOverlay apikey={LOCAL_APIKEY} />}
        </div>
      </div>
    </FilestackProvider>
  );
};

export default AppWithContext;
