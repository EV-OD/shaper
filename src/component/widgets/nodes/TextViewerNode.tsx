import { Handle, Position, useHandleConnections, useNodeConnections, useNodesData } from '@xyflow/react';
import { useEffect } from 'react';
 
 
function TextViewerNode({ id, data }) {

  const v = useNodeConnections({
    handleId: id,
    handleType: "target"
  })
  console.log(v)
  const nodeData = useNodesData("3")

  useEffect(()=>{
    console.log(nodeData)
  },[nodeData])

  return (
    <div className='bg-slate-200 p-3 rounded-3xl'>
      <Handle type="target" position={Position.Left} />
      <p>{nodeData?.data.value}</p>
    </div>
  );
}


export default TextViewerNode