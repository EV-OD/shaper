import { useCallback } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
 
const handleStyle = { left: 10 };
 
function TextUpdaterNode({ id, data }) {

    const {updateNodeData} = useReactFlow()
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
    updateNodeData(id, {value : evt.target.value})
  }, []);
 
  return (
    <div className='bg-slate-200 p-3 rounded-3xl'>
      <Handle type="target" position={Position.Left} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{left:"calc(100% - 5px)"}}
      />
    </div>
  );
}


export default TextUpdaterNode