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
import { BufferGeometry, Mesh } from "three";
import { DataType } from "../../../types/dataType";
import { ArgsVectorType } from "../../../types/ArgsObjTYpe";
import { Group } from "three";
import { GrX } from "react-icons/gr";

type GeoCustomType = Node<{
  obj: {
    type: string;
    f: (any) => BufferGeometry;
  };
}>;

type CustomVectorType = Node<{
  obj: {
    type: string;
    f: (any) => Mesh;
  };
}>;

function NoGeoInstancePositionNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const geoConnections = useNodeConnections({
    handleType: "target",
    handleId: "geo",
  });
  const geoData = useNodesData<GeoCustomType>(geoConnections?.[0]?.source);

  const meshConnections = useNodeConnections({
    handleType: "target",
    handleId: "mesh",
  });
  const meshData = useNodesData<CustomVectorType>(meshConnections?.[0]?.source);

  useEffect(() => {
    const group = new Group();
    if (geoData?.data && meshData?.data) {
      const geo = geoData?.data?.obj.f();
      if (geo) {
        const cloned = geo?.clone();
        if (cloned && meshData?.data) {
          const vertices = cloned.attributes.position.array;
          for (
            let i = 0;
            i < vertices.length;
            i += (Math.floor(Math.random() * (3 - 0 + 1)) + 0) * 3
          ) {
            const vectorArgument: ArgsVectorType = {
              x: {
                f: () => vertices[i],
              },
              y: {
                f: () => vertices[i + 1],
              },
              z: {
                f: () => vertices[i + 2],
              },
            };
            const argObj = {
              vector: vectorArgument,
            };
            const mesh = meshData.data.obj.f(argObj);
            const clonedMesh = mesh?.clone();
            if (mesh && clonedMesh) {
              clonedMesh.position.set(
                vertices[i] + clonedMesh.position.x,
                vertices[i + 1] + clonedMesh.position.y,
                vertices[i + 2] + clonedMesh.position.z
              );
              group.add(clonedMesh);
            }
          }

          updateNodeData(props.id, {
            obj: {
              type: "instance",
              f: () => group,
            },
          });
        }
      }
    }
  }, [geoData, meshData]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">
          NoGeoInstancePositionNode
        </h3>
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
            type="source"
            position={Position.Right}
            id="group"
            style={{
              border: "none",
              width: 10,
              height: 10,
              right: 0,
            }}
          />
          <label className="label px-5">Mesh</label>
        </div>
      </div>
    </div>
  );
}

export default NoGeoInstancePositionNode;
