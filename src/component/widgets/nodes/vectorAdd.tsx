import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import { DataType } from "../../../types/dataType";
import CustomHandle from "../handle/customHandle";
import { useEffect, useState } from "react";
import Vector, { vectorItem } from "../../../utils/vector";

const vectorItemDummy = {
    obj: {
        type: "instance",
        f: ()=>{},
        vector: []
    }
}

function VectorAdd(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();

  const [a, setA] = useState(vectorItemDummy)
  const [b, setB] = useState(vectorItemDummy)

  useEffect(()=>{
    console.log(a,b)
    if(a.obj.vector && b.obj.vector && a.obj.vector.length != 0 && b.obj.vector.length != 0){
        const aV = new Vector(a.obj.vector)
        // console.log(aV)
        const bV = new Vector(b.obj.vector)
    
        const v = aV.add(bV)
        // console.log(v)
        updateNodeData(props.id, {
            obj:{
                type: "instance",
                f:()=> v,
                vector: [{obj:v.x}, {obj:v.y}, {obj:v.z}]
            }
        })
    }
  }, [a,b])


  return (
    <div className="border border-gray-300 rounded-lg bg-white">
      <div className="bg-slate-700 p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text-white">Vector Addition</h3>
      </div>
      <div className="">
        <CustomHandle id="a" label="Vector A" onChange={(v) => {
            setA(v)
        }} />
        <CustomHandle id="b" label="Vector B" onChange={(v) => {
            setB(v)
        }} />
        <div>
          <Handle
            type="source"
            position={Position.Right}
            id="c"
            style={{
              border: "none",
              width: 10,
              height: 10,
              right: 0,
              top: "70%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VectorAdd;
