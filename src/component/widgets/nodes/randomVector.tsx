import { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { DataType } from '../../../types/dataType';
import Vector from '../../../utils/vector';
import CustomInput from '../../ui/CInput';

interface RandomVectorProps extends NodeProps<DataType> {}

function RandomVector(props: RandomVectorProps) {
  const { updateNodeData } = useReactFlow();
  
  // State to store min and max values
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);

  useEffect(() => {
    // Helper function to generate random numbers within a range
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const d = {
      obj: {
        type: 'instance',
        f: () => new Vector([
          { obj: { type: 'instance', f: () => randomInRange(min, max) } },
          { obj: { type: 'instance', f: () => randomInRange(min, max) } },
          { obj: { type: 'instance', f: () => randomInRange(min, max) } }
        ]),
        vector: new Vector([
          { obj: { type: 'instance', f: () => randomInRange(min, max) } },
          { obj: { type: 'instance', f: () => randomInRange(min, max) } },
          { obj: { type: 'instance', f: () => randomInRange(min, max) } }
        ]).toArray()
      }
    };

    console.log(d);
    updateNodeData(props.id, d);
  }, [props.id, min, max]);  // Re-run the effect if min/max values change

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg vector">
      <div className="header p-2 px-4">
        <h3 className="text-sm font-semibold text">Random Vector</h3>
      </div>
      <div className="p-4">

        {/* CustomInput to take min value */}
        <div className="flex flex-col gap-1">
            <p>Min</p>
        <CustomInput
          label="Min Value" 
          className="w-32"
          value={min} 
          onInput={(e) => setMin(Number(e.target.value))}
        />
        
        {/* CustomInput to take max value */}
        <p>Max</p>
        <CustomInput 
          label="Max Value" 
          className="w-32"
          value={max} 
          onInput={(e) => setMax(Number(e.target.value))}
        />
        </div>

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
