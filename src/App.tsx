import { useState } from 'react';
import SplitPane,{Pane} from 'split-pane-react';
import './App.css'
import 'split-pane-react/esm/themes/default.css';


function App ()  {
  const [sizes, setSizes] = useState<(number | string)[]>([
      100,
      'auto',
  ]);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

  return (
      <div style={{ height: "100vh" }}>
          <SplitPane
              sizes={sizes}
              onChange={(sizes) => setSizes(sizes)}
              sashRender={()=> null}
              split='horizontal'
          >
            <Pane minSize={200} >
              <div style={{ ...layoutCSS, background: '#d5d7d9' }}>
                  ViewPort
              </div>
              </Pane>

              <Pane>
              <div style={{ ...layoutCSS, background: '#a1a5a9' }}>
                  Node Editor
              </div>
              </Pane>
          </SplitPane>
      </div>
  );
}

export default App
