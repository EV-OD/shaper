import { Handle, Position, useNodeConnections, useNodesData } from "@xyflow/react";
import { useEffect } from "react";
import LimitHandle from "./LimitHandle";

function CustomHandle({
    id,
    label,
    onChange,
    className,
    connectionCount
}: {
    id: string;
    label: string;
    onChange: (value: any) => void;
    className?: string;
    connectionCount?: number;
}) {
    const connections = useNodeConnections({ handleType: 'target', handleId: id });
    const nodesData = useNodesData(connections?.[0]?.source);

    useEffect(() => {
        onChange(nodesData?.data ? nodesData.data : {
            obj: {
                type: "instance",
                f: () => 0
            }
        });
    }, [nodesData]);

    return (
        <div className='relative py-1'>
            <LimitHandle
               connectionCount={connectionCount}
                type="target"
                position={Position.Left}
                id={id}
                style={{
                    border: 'none',
                    width: 10,
                    height: 10,
                    left: 0
                }}
                className={className}
            />
            <label htmlFor={label} className="label px-5">
                {label}
            </label>
        </div>
    );
}


function CustomHandleSource({
    id,
    label,
    onChange
}: {
    id: string;
    label: string;
    onChange: (value: any) => void;
}) {
    const connections = useNodeConnections({ handleType: 'source', handleId: id });
    const nodesData = useNodesData(connections?.[0]?.source);

    useEffect(() => {
        onChange(nodesData?.data ? nodesData.data : {
            obj: {
                type: "instance",
                f: () => 0
            }
        });
    }, [nodesData]);

    return (
        <div className='relative py-1'>
            <Handle
                type="target"
                position={Position.Left}
                id={id}
                style={{
                    border: 'none',
                    width: 10,
                    height: 10,
                    left: 0
                }}
            />
            <label htmlFor={label} className="text-white px-5">
                {label}
            </label>
        </div>
    );
}


export default CustomHandle