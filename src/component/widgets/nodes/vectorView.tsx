import { useEffect, useState } from 'react';
import { Handle, Node, Position, useNodeConnections, useNodesData } from '@xyflow/react';
import Vector from '../../../utils/vector';

const render3DVector = (x: number, y: number, z: number) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100px',
                height: '100px',
                transform: `perspective(500px) rotateX(${z * 10}deg) rotateY(${y * 10}deg)`,
                border: '1px solid lightgray',
                background: 'rgba(255, 255, 255, 0.5)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: '2px',
                    height: '100px',
                    backgroundColor: 'blue',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotateZ(${x * 10}deg)`,
                }}
            />
        </div>
    );
};


type CustomDataType = Node<{
    obj: {
        type: string;
        f: () => Vector;
    };
}>;

function VectorViewNode() {
    const connections = useNodeConnections({ handleType: 'target' });
    const nodeData = useNodesData<CustomDataType>(connections?.[0]?.source);
    const [vector, setVector] = useState<{
        x: number;
        y: number;
        z: number;
    }>({ x: 0, y: 0, z: 0 });



    useEffect(() => {
        const v  = nodeData?.data.obj.f()
        if(v){
            const x = v.x.f();
            const y = v.y.f();
            const z = v.z.f();
            console.log(x, y, z);
            setVector({ x,y,z });
        }
    }, [nodeData]);

    


    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-700 p-2 px-4">
                <h3 className="text-sm font-semibold text-white">Vector View</h3>
            </div>
            <div className="p-4">
                {/* Vector display */}
                <div className="flex justify-center items-center">
                    {render3DVector(vector.x, vector.y, vector.z)}
                </div>
                <Handle
                    type="target"
                    position={Position.Left}
                    id="b"
                    style={{
                        top: '70%',
                        border: 'none',
                        width: 10,
                        height: 10
                    }}
                />
            </div>
        </div>
    );
}

export default VectorViewNode;
