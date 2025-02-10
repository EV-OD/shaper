import { useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';
import CustomInput from '../../ui/CInput';
import { evn } from '../../../utils/evaluator';



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
        <div className="border border-none rounded-lg cnode rounded-t-lg ">
            <div className="header p-2 px-4">
            <h3 className="text-sm font-semibold text">Value</h3>
            </div>
            <div className="p-4">
            <p className="text-sm text-gray-600">
                <CustomInput
                    label="Value"
                    className="w-32"
                    onInput={(e) => {
                        updateNodeData(props.id, {
                            obj: {
                                type: 'value',
                                f: () => evn(e.target.value)
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
