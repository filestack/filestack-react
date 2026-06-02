import { useEffect, useState } from 'react';

const APIKEY = 'YOUR_APIKEY';

export default function Index() {
  const [pickers, setPickers] = useState(null);
  const [isPickerDropPaneVisible, setIsPickerDropPaneVisible] = useState(false);
  const [isPickerInlineVisible, setIsPickerInlineVisible] = useState(false);
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);

  useEffect(() => {
    import('filestack-react').then((mod) => {
      setPickers({
        PickerDropPane: mod.PickerDropPane,
        PickerInline: mod.PickerInline,
        PickerOverlay: mod.PickerOverlay
      });
    });
  }, []);

  const { PickerDropPane, PickerInline, PickerOverlay } = pickers || {};

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
        {pickers && isPickerDropPaneVisible && (
          <PickerDropPane apikey={APIKEY}>
            <div style={{ height: '800px' }} />
          </PickerDropPane>
        )}
        {pickers && isPickerInlineVisible && <PickerInline apikey={APIKEY} />}
        {pickers && isPickerOverlayVisible && <PickerOverlay apikey={APIKEY} />}
      </div>
    </div>
  );
}
