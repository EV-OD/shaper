import { useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';
import Vector from '../../../utils/vector';

function RandomVector(props: NodeProps<DataType>) {
    const { updateNodeData } = useReactFlow();

    useEffect(() => {
        const d = {
            obj: {
                type: 'instance',
                f: () => new Vector([
                    { obj: { type: 'instance', f: () => {return Math.random() * 100} } },
                    { obj: { type: 'instance', f: () => {return Math.random() * 100} } },
                    { obj: { type: 'instance', f: () => {return Math.random() * 100} } }
                ]),
                vector: new Vector([
                    { obj: { type: 'instance', f: () => {return Math.random() * 100} } },
                    { obj: { type: 'instance', f: () => {return Math.random() * 100} } },
                    { obj: { type: 'instance', f: () => {return Math.random() * 100} } }
                ]).toArray()
            }
        }

        console.log(d);

        updateNodeData(props.id, d);
    }, [props.id]);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-700 p-2 px-4">
                <h3 className="text-sm font-semibold text-white">Random Vector</h3>
            </div>
            <div className="p-4">
                <p className="text-sm text-gray-600">Generates a random vector</p>
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

export default RandomVector;