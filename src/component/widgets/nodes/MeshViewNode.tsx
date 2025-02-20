import { useEffect } from "react";
import {
  Handle,
  Node,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { Mesh } from "three";
import { useMesh } from "../../../globalStores/geoViewer"; // Importing the mesh store

type CustomMeshDataType = Node<{
  obj: {
    type: string;
    f: () => Mesh;
  };
}>;

function MeshViewNode() {
  const connections = useNodeConnections({ handleType: "target" });
  const nodeData = useNodesData<CustomMeshDataType>(connections?.[0]?.source);

  const setMesh = useMesh((state) => state.setMesh);
  const clearMesh = useMesh((state) => state.clearMesh);

  useEffect(() => {
    const mesh = nodeData?.data?.obj.f();
    if (mesh) {
      setMesh(mesh); // Set mesh in the store
    } else {
      clearMesh(); // Clear mesh from the store
    }
  }, [nodeData, setMesh, clearMesh]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4">
        <h3 className="text-sm font-semibold text">MeshViewNode</h3>
      </div>
      <div className="p-4">
        <Handle
          type="target"
          position={Position.Left}
          id="meshHandle"
          style={{
            top: "70%",
            border: "none",
            width: 10,
            height: 10,
          }}
        />
      </div>
    </div>
  );
}

export default MeshViewNode;
