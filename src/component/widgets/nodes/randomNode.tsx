import { useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';



function RandomNode(props: NodeProps<DataType>) {
    const { updateNodeData } = useReactFlow();
    useEffect(() => {
        updateNodeData(props.id, {
            obj: {
                type: 'instance',
                f: () => Math.floor(Math.random() * 4)
            }
        });
        console.log(props);

    }, [props.id]);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-700 p-2 px-4">
            <h3 className="text-sm font-semibold text-white">Random Node</h3>
            </div>
            <div className="p-4">
            <p className="text-sm text-gray-600">
                Instance Mode
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

export default RandomNode;
