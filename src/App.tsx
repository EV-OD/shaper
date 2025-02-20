import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "./App.css";
import "split-pane-react/esm/themes/default.css";
import NodeEditor from "./component/section/NodeEditor";
import ViewPort from "./component/section/ViewPort";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./DndContext";

import { Canvas } from "@react-three/fiber";

function App() {
  const [sizes, setSizes] = useState<(number | string)[]>(["50%", "auto"]);

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  };

  return (
    <div style={{ height: "100vh" }}>
      <SplitPane
        sizes={sizes}
        onChange={(sizes) => setSizes(sizes)}
        sashRender={() => null}
        split="horizontal"
      >
        <Pane minSize={"50%"}>
          <div style={{ ...layoutCSS, background: "#d5d7d9" }}>
            <div className="absolute inset-0 h-screen">
              <Canvas shadows>
                <ViewPort />
              </Canvas>
            </div>
          </div>
        </Pane>

        <div style={{ ...layoutCSS }}>
          <ReactFlowProvider>
            <DnDProvider>
              <NodeEditor />
            </DnDProvider>
          </ReactFlowProvider>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
