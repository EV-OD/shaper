import { useEffect, useMemo, useState } from "react";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";
import { DataType } from "../../../types/dataType";
import { MeshBasicMaterial } from "three";
import CustomInput from "../../ui/CInput";

function ToMeshNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const [color, setColor] = useState("#ffffff");

  const geo1Connections = useNodeConnections({
    handleType: "target",
    handleId: "geo1",
  });

  const geoData = useNodesData(geo1Connections?.[0]?.source);

  useEffect(() => {
    if (geoData && geoData.data && geoData.data.obj) {
      const mesh = new Mesh(
        geoData?.data.obj.f(),
        new MeshStandardMaterial({ color: color }),
      );

      updateNodeData(props.id, {
        obj: {
          type: "instance",
          f: () => mesh,
        },
      });
    }
  }, [geoData, color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">ToMeshNode</h3>
      </div>
      <div>
        <div className="relative py-1">
          <Handle
            type="target"
            position={Position.Left}
            id="geo1"
            style={{ border: "none", width: 10, height: 10, left: 0 }}
          />
          <label className="label px-5">Geometry</label>
        </div>
        <div className="p-3">
          <CustomInput
            type="color"
            label="Color"
            value={color}
            onChange={handleColorChange}
          />
        </div>
        <div className="relative py-1">
          <Handle
            type="source"
            position={Position.Right}
            id="geoOut"
            style={{ border: "none", width: 10, height: 10, right: 0 }}
          />
          <label className="label px-5">Mesh</label>
        </div>
      </div>
    </div>
  );
}

export default ToMeshNode;
