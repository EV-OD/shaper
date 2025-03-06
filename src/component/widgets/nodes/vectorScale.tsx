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

function VectorScale(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();

  const [a, setA] = useState(vectorItemDummy)
  const [k, setK] = useState<vectorItem>({
    obj: {
        type: "instance",
        f: () => 0
    }
});
  useEffect(()=>{
    console.log(a,b)
    if(a.obj.vector && b.obj.vector && a.obj.vector.length != 0 && b.obj.vector.length != 0){

        // console.log(v)
        updateNodeData(props.id, {
            obj:{
                type: "instance",
                f:(argObj)=> {
                  const aV = new Vector(a.obj.vector)
    
                  const v = aV.scalarMultiply(k.obj.f(argObj), argObj)
                  return v
                },
            }
        })
    }
  }, [a,b])


  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg vector ">
      <div className="header p-2 px-4 rounded-t-lg">
        <h3 className="text-sm font-semibold text">Vector Addition</h3>
      </div>
      <div className="">
        <CustomHandle connectionCount={1} id="vec a" label="A" className="vectorEdge" onChange={(v) => {
            setA(v)
        }} />
        <CustomHandle connectionCount={1} id="k" label="B" className="vectorEdge" onChange={(v) => {
            setK({
              obj: {
                type: "instance",
                f: () => v
              }
            })
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
            
            className="vectorEdge"
          />
        </div>
      </div>
    </div>
  );
}

export default VectorScale;
