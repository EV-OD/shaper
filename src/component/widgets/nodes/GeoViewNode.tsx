import { useEffect } from 'react';
import { Handle, Node, Position, useNodeConnections, useNodesData } from '@xyflow/react';
import { BufferGeometry } from 'three';
import useGeo from '../../../globalStores/geoViewer';




type CustomDataType = Node<{
    obj: {
        type: string;
        f: () => BufferGeometry;
    };
}>;

function GeoViewNode() {
    const connections = useNodeConnections({ handleType: 'target' });
    const nodeData = useNodesData<CustomDataType>(connections?.[0]?.source);

    const setGeometry  = useGeo(state=> state.setGeometry)
    const clearGeometry  = useGeo(state=> state.clearGeometry)


    useEffect(() => {
        const v  = nodeData?.data?.obj.f()
        if(v){
            setGeometry(v)
        }else{
            clearGeometry()
        }
    }, [nodeData]);

    


    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-700 p-2 px-4">
                <h3 className="text-sm font-semibold text-white">GeoViewNode</h3>
            </div>
            <div className="p-4">
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

export default GeoViewNode;
