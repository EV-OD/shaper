import { useEffect, useState } from "react";
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import { DataType } from "../../../types/dataType";
import CustomInput from "../../ui/CInput";
import { evn } from "../../../utils/evaluator";

function ClampNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);
  const valueC = useNodeConnections({
    handleType: "target",
    handleId: "value",
  });

  const valueData = useNodesData(valueC?.[0]?.source);

  useEffect(() => {
    if (valueData) {
      updateNodeData(props.id, {
        obj: {
          type: "instance",
          f: (args) => {
            const value = valueData.data?.obj?.f(args);
            const clampedValue = Math.min(Math.max(value, minValue), maxValue);
            return clampedValue;
          },
        },
      });
    }
  }, [minValue, maxValue, props.id]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg ">
      <div className="header p-2 px-4">
        <h3 className="text-sm font-semibold text">Clamp</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">
          <CustomInput
            label="Min"
            className="w-32"
            onInput={(e) => setMinValue(evn(e.target.value))}
          />
        </p>
        <p className="text-sm text-gray-600">
          <CustomInput
            label="Max"
            className="w-32"
            onInput={(e) => setMaxValue(evn(e.target.value))}
          />
        </p>
        <Handle
          type="target"
          position={Position.Left}
          id="value"
          style={{ top: "30%", border: "none", width: 10, height: 10 }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="clampedValue"
          style={{ top: "50%", border: "none", width: 10, height: 10 }}
        />
      </div>
    </div>
  );
}

export default ClampNode;
