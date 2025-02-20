import { useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import { DataType } from "../../../types/dataType";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { BufferGeometry } from "three";

function ModelNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const loader = new GLTFLoader();
        loader.parse(reader.result as ArrayBuffer, "", (gltf) => {
          const geo = gltf.scene;
          if (geo) {
            updateNodeData(props.id, {
              obj: {
                type: "geometry",
                f: () => geo,
              },
            });
          }
        });
      };
    }
  }, [file, props.id]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg ">
      <div className="header p-2 px-4">
        <h3 className="text-sm font-semibold text">Model Node</h3>
      </div>
      <div className="p-4">
        <input
          type="file"
          accept=".glb"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border rounded p-2"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="geoOut"
          style={{ top: "50%", border: "none", width: 10, height: 10 }}
        />
      </div>
    </div>
  );
}

export default ModelNode;
