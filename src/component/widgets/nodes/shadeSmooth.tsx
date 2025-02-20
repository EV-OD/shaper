import { useEffect, useMemo } from "react";
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
import { BufferGeometry } from "three";
import Vector from "../../../utils/vector";
import { DataType } from "../../../types/dataType";

type GeoCustomType = Node<{
  obj: {
    type: string;
    f: () => BufferGeometry;
  };
}>;

type CustomVectorType = Node<{
  obj: {
    type: string;
    f: () => Vector;
  };
}>;

function ShadeSmoothNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const geoConnections = useNodeConnections({
    handleType: "target",
    handleId: "geo",
  });
  const geoData = useNodesData<GeoCustomType>(geoConnections?.[0]?.source);

  const geometry = useMemo(() => {
    const geo = geoData?.data?.obj.f();
    let geo1;
    if (geo) {
      geo.attributes.position.needsUpdate = true;
      geo.computeBoundingSphere();
      geo1 = BufferGeometryUtils.mergeVertices(geo);
      geo1.computeVertexNormals();
      updateNodeData(props.id, {
        obj: {
          type: "instance",
          f: () => geo1,
        },
      });
    }

    return geo1;
  }, [geoData]);

  useEffect(() => {}, [geoData]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">ShadeSmoothNode</h3>
      </div>
      <div className="">
        <div className="relative py-1">
          <Handle
            type="target"
            position={Position.Left}
            id="geo"
            style={{
              border: "none",
              width: 10,
              height: 10,
              left: 0,
            }}
          />
          <label className="label px-5">Geometry</label>
        </div>
        <div className="relative py-1">
          <Handle
            type="source"
            position={Position.Right}
            id="geoOut"
            style={{
              border: "none",
              width: 10,
              height: 10,
              right: 0,
            }}
          />
          <label className="label px-5">Geometry</label>
        </div>
      </div>
    </div>
  );
}

export default ShadeSmoothNode;
