import { useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import { DataType } from "../../../types/dataType";
import Vector, { vectorItem } from "../../../utils/vector";
import CustomInput from "../../ui/CInput";
import { evn } from "../../../utils/evaluator";

function VectorNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const [vector, setVector] = useState<Vector>(new Vector([0, 0, 0]));

  useEffect(() => {
    updateNodeData(props.id, {
      obj: {
        type: "instance",
        f: () => vector,
        vector: vector.toArray(),
      },
    });
  }, [vector]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg vector">
      <div className="header p-2 px-4">
        <h3 className="text-sm font-semibold text">Vector Node</h3>
      </div>
      <div className="p-4 flex flex-col items-center">
        {/* <input
          type="number"
          placeholder="X"
          className="input input-bordered w-32 h-6"
          onInput={(e) => {
            const x = Number(e.currentTarget.value);
            setVector(
              new Vector([
                { obj: { type: "instance", f: () => x } },
                {obj: vector.y},
                {obj: vector.z}
              ])
            );
          }}
        /> */}
        <div className="flex flex-col items-center gap-1">
          
        <CustomInput
          label="X"
          className="w-32"
          onInput={(e) => {
            const y = e.currentTarget.value;
            setVector(
              new Vector([
                {obj: vector.x},
                { obj: { type: "instance", f: () => evn(y) } },
                {obj: vector.z}])
            );
          }}
        />
        <CustomInput
          label="Y"
          className="w-32"
          onInput={(e) => {
            const y = e.currentTarget.value;
            setVector(
              new Vector([
                {obj: vector.x},
                { obj: { type: "instance", f: () => evn(y) } },
                {obj: vector.z}])
            );
          }}
        />
        <CustomInput
          label="Z"
          className="w-32"
          onInput={(e) => {
            const z = e.currentTarget.value;
            setVector(
              new Vector([
                {obj: vector.x},
                {obj: vector.y},
                { obj: { type: "instance", f: () => evn(z) } }])
            );
          }}
        />  
        </div>
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ top: "70%", border: "none", width: 10, height: 10 }}
        />
      </div>
    </div>
  );
}

export default VectorNode;
