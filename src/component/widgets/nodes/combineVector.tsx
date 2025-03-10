import { useEffect, useState } from 'react';
import { Handle, Position, useNodeConnections, useNodesData, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Vector, vectorItem } from '../../../utils/vector';
import { DataType } from '../../../types/dataType';
import LimitHandle from '../handle/LimitHandle';

function CustomHandle({
    id,
    label,
    onChange,
    connectionCount
}: {
    id: string;
    label: string;
    onChange: (value: any) => void;
    connectionCount?: number;
}) {
    const connections = useNodeConnections({ handleType: 'target', handleId: id });
    const nodesData = useNodesData(connections?.[0]?.source);

    useEffect(() => {
        onChange(nodesData?.data ? nodesData.data : {
            obj: {
                type: "instance",
                f: (any) => 0
            }
        });
    }, [nodesData]);

    return (
        <div className='relative py-1'>
            <LimitHandle
                type="target"
                connectionCount={connectionCount}
                position={Position.Left}
                id={id}
                style={{
                    border: 'none',
                    width: 10,
                    height: 10,
                    left: 0
                }}
            />
            <label htmlFor={label} className="label px-5">
                {label}
            </label>
        </div>
    );
}

function CombineVectorNode(props: NodeProps<DataType>) {
    const { updateNodeData } = useReactFlow();

    // Initialize state for X, Y, Z
    const [x, setX] = useState<vectorItem>({
        obj: {
            type: "instance",
            f: (any) => 0
        }
    });
    const [y, setY] = useState<vectorItem>({
        obj: {
            type: "instance",
            f: (any) => 0
        }
    });
    const [z, setZ] = useState<vectorItem>({
        obj: {
            type: "instance",
            f: (any) => 0
        }
    });

    // Create a function to update the node data
    const combineAndUpdate = () => {
        const combinedVector = new Vector([x, y, z]);
        updateNodeData(props.id, {
            obj: {
                type: "instance",
                f: (args) => {
                    console.log(args)
                    return combinedVector
                },
                vector: [x,y,z]
            }
        });
    };

    // Update the node data only when one of the vector components changes
    useEffect(() => {
        combineAndUpdate();
    }, [x, y, z]);  // Only trigger combineAndUpdate when x, y, or z change

    return (
        <div className="border border-none rounded-lg cnode rounded-t-lg vector ">
            <div className="header p-2 px-4 rounded-t-lg">
                <h3 className="text-sm font-semibold text">Combine Vector Node</h3>
            </div>
            <div className='py-3'>
                {/* Input Handles */}
                <CustomHandle id="input1" connectionCount={1} label="X" onChange={(v) => setX(v)} />
                <CustomHandle id="input2" connectionCount={1} label="Y" onChange={(v) => setY(v)} />
                <CustomHandle id="input3" connectionCount={1} label="Z" onChange={(v) => setZ(v)} />
            </div>
            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id="output"
                style={{
                    border: 'none',
                    width: 10,
                    height: 10,
                    top: '60%'
                }}
            />
        </div>
    );
}

export default CombineVectorNode;
