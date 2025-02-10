import { useEffect } from "react";
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

function TranslateGeoNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const geoConnections = useNodeConnections({
    handleType: "target",
    handleId: "geo",
  });
  const geoData = useNodesData<GeoCustomType>(geoConnections?.[0]?.source);

  const vectorConnections = useNodeConnections({
    handleType: "target",
    handleId: "vec",
  });
  const vectorData = useNodesData<CustomVectorType>(vectorConnections?.[0]?.source);

  useEffect(() => {
    if (geoData?.data && vectorData?.data) {
      const geo = geoData?.data?.obj.f();
      if (geo) {
        const cloned = geo?.clone();
        const vec = vectorData?.data?.obj.f();
        if (cloned && vec) {
          cloned.translate(vec.x.f() ?? 0, vec.y.f() ?? 0, vec.z.f() ?? 0);
          console.log("Cloned:", cloned);
          updateNodeData(props.id, {
            obj: {
              type: "instance",
              f: () => cloned,
            },
          });
        }
      }
    }
  }, [geoData, vectorData]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">TranslateGeoNode</h3>
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
            type="target"
            position={Position.Left}
            id="vec"
            style={{
              border: "none",
              width: 10,
              height: 10,
              left: 0,
            }}
          />
          <label className="label px-5">Translate</label>
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

export default TranslateGeoNode;