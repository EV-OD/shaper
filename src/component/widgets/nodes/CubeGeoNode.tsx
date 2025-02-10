import { useEffect, useMemo, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';
import { BoxGeometry } from 'three';
import CustomInput from '../../ui/CInput';
import { evn } from '../../../utils/evaluator';

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
        <div className="border border-none rounded-lg cnode rounded-t-lg geo">
            <div className="header p-2 px-4">
                <h3 className="text-sm font-semibold text">Box Geometry</h3>
            </div>
            <div className="p-4">
                <div className="flex flex-col">
                    <label>Width</label>
                    <CustomInput
                        className="w-32"
                        label="Width"
                        onInput={(e) =>
                            setDim((d) => ({ ...d, width: evn(e.target.value) }))
                        }
                    />



                    <label>Height</label>
                    <CustomInput
                        className="w-32"
                        label="Height"
                        onInput={(e) =>
                            setDim((d) => ({ ...d, height: evn(e.target.value) }))
                        }
                    />


                    <label>Depth</label>
                    <CustomInput
                        className="w-32"
                        label="Depth"
                        onInput={(e) =>
                            setDim((d) => ({ ...d, depth: evn(e.target.value) }))
                        }
                    />

                    <label>Segments</label>
                    <CustomInput
                        className="w-32"
                        label="Segments"
                        onInput={(e) =>
                            setDim((d) => ({ ...d, segments: evn(e.target.value) }))
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
