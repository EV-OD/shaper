import { useState } from 'react';
import SplitPane,{Pane} from 'split-pane-react';
import './App.css'
import 'split-pane-react/esm/themes/default.css';
import NodeEditor from './component/section/NodeEditor';
import ViewPort from './component/section/ViewPort';


function App ()  {
  const [sizes, setSizes] = useState<(number | string)[]>([
      "20%",
      'auto',
  ]);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
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
            <Pane minSize={"20%"} >
              <div style={{ ...layoutCSS, background: '#d5d7d9' }}>\
                <ViewPort/>
              </div>
            </Pane>

              <div style={{ ...layoutCSS }}>
                  <NodeEditor/>
              </div>
          </SplitPane>
      </div>
  );
}

export default App
