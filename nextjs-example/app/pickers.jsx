'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const APIKEY = 'YOUR_APIKEY';

const PickerDropPane = dynamic(
  () => import('filestack-react').then((m) => m.PickerDropPane),
  { ssr: false }
);
const PickerInline = dynamic(
  () => import('filestack-react').then((m) => m.PickerInline),
  { ssr: false }
);
const PickerOverlay = dynamic(
  () => import('filestack-react').then((m) => m.PickerOverlay),
  { ssr: false }
);

export default function Pickers() {
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
}
