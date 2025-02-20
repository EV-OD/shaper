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
import { Mesh, Group, MeshStandardMaterial } from "three";
import { DataType } from "../../../types/dataType";

type MeshCustomType = Node<{
  obj: {
    type: string;
    f: () => Mesh;
  };
}>;

function GroupMeshNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const meshConnections = useNodeConnections({
    handleType: "target",
    handleId: "mesh",
  });

  const meshDatas = useNodesData<MeshCustomType>(
    meshConnections.map((connection) => connection.source),
  );

  useEffect(() => {
    if (!meshDatas || meshDatas.length === 0) return () => {};

    const group = new Group();

    // Add meshes to the group
    meshDatas.forEach((meshData) => {
      const mesh = meshData.data.obj.f();
      group.add(mesh);
    });

    // Optionally, you can perform transformations here on the group
    // For example, set a position, rotation, or scale if needed
    // group.position.set(0, 0, 0);

    updateNodeData(props.id, {
      obj: {
        type: "group",
        f: () => group,
      },
    });

    return () => {};
  }, [meshDatas]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">GroupMeshNode</h3>
      </div>
      <div>
        <div className="relative py-1">
          <Handle
            type="target"
            position={Position.Left}
            id="mesh"
            style={{ border: "none", width: 10, height: 10, left: 0 }}
          />
          <label className="label px-5">Mesh</label>
        </div>
        <div className="relative py-1">
          <Handle
            type="source"
            position={Position.Right}
            id="meshOut"
            style={{ border: "none", width: 10, height: 10, right: 0 }}
          />
          <label className="label px-5">Grouped Mesh</label>
        </div>
      </div>
    </div>
  );
}

export default GroupMeshNode;
