import { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';
import Vector, { vectorItem } from '../../../utils/vector';

function VectorNode(props: NodeProps<DataType>) {
    const { updateNodeData } = useReactFlow();
    const [vector, setVector] = useState<Vector>(new Vector([0, 0, 0]));

    useEffect(() => {
        updateNodeData(props.id, {
            obj: {
                type: 'instance',
                f: () => vector,
                vector: vector.toArray()
            }
        });
    }, [vector]);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-700 p-2 px-4">
                <h3 className="text-sm font-semibold text-white">Vector Node</h3>
            </div>
            <div className="p-4 flex flex-col items-center">
                <input
                    type="number"
                    placeholder="X"
                    className="input input-bordered w-32 h-6"
                    onInput={(e) => {
                        const x = parseInt(e.currentTarget.value);
                        setVector(new Vector([{ obj: { type: 'instance', f: () => x } }, vector.y, vector.z]));
                    }}
                />
                <input
                    type="number"
                    placeholder="Y"
                    className="input input-bordered w-32 h-6"
                    onInput={(e) => {
                        const y = parseInt(e.currentTarget.value);
                        setVector(new Vector([vector.x, { obj: { type: 'instance', f: () => y } }, vector.z]));
                    }}
                />
                <input
                    type="number"
                    placeholder="Z"
                    className="input input-bordered w-32 h-6"
                    onInput={(e) => {
                        const z = parseInt(e.currentTarget.value);
                        setVector(new Vector([vector.x, vector.y, { obj: { type: 'instance', f: () => z } }]));
                    }}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id="output"
                    style={{ top: '70%', border: 'none', width: 10, height: 10 }}
                />
            </div>
        </div>
    );
}

export default VectorNode;