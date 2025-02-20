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
import { DataType } from "../../../types/dataType";

type GeoCustomType = Node<{
  obj: {
    type: string;
    f: () => BufferGeometry;
  };
}>;

function JoinGeoNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const geo1Connections = useNodeConnections({
    handleType: "target",
    handleId: "geo1",
  });

  const geoDatas = useNodesData<GeoCustomType>(
    geo1Connections.map((connection) => connection.source),
  );

  const geometry = useMemo(() => {
    if (!geoDatas || geoDatas.length === 0) return null;
    let mergedGeo = geoDatas[0].data.obj.f();

    if (geoDatas) {
      for (let i = 1; i < geoDatas.length; i++) {
        const geo = geoDatas[i].data.obj.f();
        geo.computeBoundingSphere();
        mergedGeo = BufferGeometryUtils.mergeGeometries([mergedGeo, geo]);
      }
      mergedGeo?.computeVertexNormals();

      updateNodeData(props.id, {
        obj: {
          type: "instance",
          f: () => mergedGeo,
        },
      });
    }
    return mergedGeo;
  }, [geoDatas]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg geo">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">JoinGeoNode</h3>
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
        <div className="relative py-1">
          <Handle
            type="source"
            position={Position.Right}
            id="geoOut"
            style={{ border: "none", width: 10, height: 10, right: 0 }}
          />
          <label className="label px-5">Joined Geometry</label>
        </div>
      </div>
    </div>
  );
}

export default JoinGeoNode;
