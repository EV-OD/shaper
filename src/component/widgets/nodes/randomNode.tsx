import { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import { DataType } from "../../../types/dataType";
import CustomInput from "../../ui/CInput";
import { evn } from "../../../utils/evaluator";

function RandomNode(props: NodeProps<DataType>) {
    const { updateNodeData } = useReactFlow();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(4);

    useEffect(() => {
        updateNodeData(props.id, {
            obj: {
                type: "instance",
                // Generates a random number between min and max (inclusive)
                f: () => Math.floor(Math.random() * (max - min + 1)) + min,
            },
        });
    }, [min, max, props.id, updateNodeData]);

    return (
        <div className="border border-none rounded-lg cnode rounded-t-lg">
            <div className="header p-2 px-4">
                <h3 className="text-sm font-semibold text">Random Node</h3>
            </div>
            <div className="p-4">
                <div className="custom-input space-y-2">
                    <div>
                        <label className="text-sm text-white mr-2">Min:</label>
                        <CustomInput
                            label="Min Value"
                            className="w-32"
                            value={min}
                            onInput={(e) => setMin(evn(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-white mr-2">Max:</label>
                        <CustomInput
                            label="Max Value"
                            className="w-32"
                            value={max}
                            onInput={(e) => setMax(evn(e.target.value))}
                        />
                    </div>
                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                    id="b"
                    style={{ top: "70%", border: "none", width: 10, height: 10 }}
                />
            </div>
        </div>
    );
}

export default RandomNode;
