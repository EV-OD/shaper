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
import { Mesh } from "three";
import Vector from "../../../utils/vector";
import { DataType } from "../../../types/dataType";

type MeshCustomType = Node<{
  obj: {
    type: string;
    f: () => Mesh;
  };
}>;

type CustomVectorType = Node<{
  obj: {
    type: string;
    f: () => Vector;
  };
}>;

function TranslateMeshNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();

  // Get mesh data from the incoming connections
  const meshConnections = useNodeConnections({
    handleType: "target",
    handleId: "mesh",
  });
  const meshData = useNodesData<MeshCustomType>(meshConnections?.[0]?.source);

  // Get vector data from the incoming connections
  const vectorConnections = useNodeConnections({
    handleType: "target",
    handleId: "vec",
  });
  const vectorData = useNodesData<CustomVectorType>(
    vectorConnections?.[0]?.source,
  );

  useEffect(() => {
    if (meshData?.data && vectorData?.data) {
      const mesh = meshData?.data?.obj.f();
      if (mesh) {
        const cloned = mesh?.clone();
        const vec = vectorData?.data?.obj.f();
        console.log(vec);
        if (cloned && vec) {
          // Translate the cloned mesh
          cloned.position.set(vec.x.f() ?? 0, vec.y.f() ?? 0, vec.z.f() ?? 0);

          console.log("Translated Mesh:", cloned);
          updateNodeData(props.id, {
            obj: {
              type: "instance",
              f: () => cloned,
            },
          });
        }
      }
    }
  }, [meshData, vectorData]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">TranslateMeshNode</h3>
      </div>
      <div className="">
        <div className="relative py-1">
          <Handle
            type="target"
            position={Position.Left}
            id="mesh"
            style={{
              border: "none",
              width: 10,
              height: 10,
              left: 0,
            }}
          />
          <label className="label px-5">Mesh</label>
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
            id="meshOut"
            style={{
              border: "none",
              width: 10,
              height: 10,
              right: 0,
            }}
          />
          <label className="label px-5">Translated Mesh</label>
        </div>
      </div>
    </div>
  );
}

export default TranslateMeshNode;
