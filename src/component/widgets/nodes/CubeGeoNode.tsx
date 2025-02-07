import { useEffect, useMemo, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';
import { BoxGeometry } from 'three';

function CubeGeoNode(props: NodeProps<DataType>) {
    const { updateNodeData } = useReactFlow();

    const [dim, setDim] = useState({ width: 1, height: 1, depth: 1, segments: 1 });

    const geometry = useMemo(() => {
        const box = new BoxGeometry(
            dim.width,
            dim.height,
            dim.depth,
            dim.segments,
            dim.segments,
            dim.segments
        );
        return box;
    }, [dim]);

    useEffect(() => {
        updateNodeData(props.id, {
            obj: {
                type: 'instance',
                f: () => geometry,
            },
        });
    }, [geometry]);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-700 p-2 px-4">
                <h3 className="text-sm font-semibold text-white">Box Geometry</h3>
            </div>
            <div className="p-4">
                <div className="flex flex-col">
                    <label>Width</label>
                    <input
                        type="number"
                        value={dim.width}
                        onChange={(e) =>
                            setDim((d) => ({ ...d, width: +e.target.value }))
                        }
                    />

                    <label>Height</label>
                    <input
                        type="number"
                        value={dim.height}
                        onChange={(e) =>
                            setDim((d) => ({ ...d, height: +e.target.value }))
                        }
                    />

                    <label>Depth</label>
                    <input
                        type="number"
                        value={dim.depth}
                        onChange={(e) =>
                            setDim((d) => ({ ...d, depth: +e.target.value }))
                        }
                    />

                    <label>Segments</label>
                    <input
                        type="number"
                        value={dim.segments}
                        onChange={(e) =>
                            setDim((d) => ({ ...d, segments: +e.target.value }))
                        }
                    />
                </div>

                <Handle
                    type="source"
                    position={Position.Right}
                    id="b"
                    style={{
                        top: '70%',
                        border: 'none',
                        width: 10,
                        height: 10,
                    }}
                />
            </div>
        </div>
    );
}

export default CubeGeoNode;
