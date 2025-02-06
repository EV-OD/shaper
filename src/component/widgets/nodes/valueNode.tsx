import { useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';



function ValueNode(props: NodeProps<DataType>) {
    const { updateNodeData } = useReactFlow();
    useEffect(() => {
        updateNodeData(props.id, {
            obj: {
                type: 'instance',
                f: () => 0
            }
        });
        console.log(props);

    }, [props.id]);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-700 p-2 px-4">
            <h3 className="text-sm font-semibold text-white">Value</h3>
            </div>
            <div className="p-4">
            <p className="text-sm text-gray-600">
                <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                onInput={(e)=>{
                    console.log(e.currentTarget);
                    const value = parseInt(e.currentTarget.value)
                    updateNodeData(props.id, {
                        obj: {
                            type: 'instance',
                            f: () => value
                        }
                    });
                }}
                />
            </p>
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={{ top: '70%',
                    border: 'none',
                    width: 10,
                    height: 10
                 }}
            />
            </div>
        </div>
    );
}

export default ValueNode;
