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
import useGeo from "../../../globalStores/geoViewer";
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

function InstancePositionNode(props: NodeProps<DataType>) {
    const {updateNodeData} = useReactFlow()
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
    if(geoData?.data && vectorData?.data){
      const geo = geoData?.data?.obj.f();
      if(geo){
          const cloned = geo?.clone();
          const vec = vectorData?.data?.obj.f();
          if(cloned && vec){
            const vertices = cloned.attributes.position.array;
            for (let i = 0; i < vertices.length; i += 3) {
                vertices[i] += vec.x.f();
                vertices[i + 1] += vec.y.f();
                vertices[i + 2] += vec.z.f();
            }
            cloned.attributes.position.needsUpdate = true;
            cloned.computeVertexNormals();
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
    <div className="border border-gray-300 rounded-lg bg-white">
      <div className="bg-slate-700 p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text-white">InstancePositionNode</h3>
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
          <label className="label px-5">Offset</label>
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

export default InstancePositionNode;
