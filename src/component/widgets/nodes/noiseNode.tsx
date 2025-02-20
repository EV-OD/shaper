import { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import { DataType } from "../../../types/dataType";
import CustomInput from "../../ui/CInput";
import { evn } from "../../../utils/evaluator";
import { createNoise2D } from "simplex-noise";
import ArgsObjType from "../../../types/ArgsObjTYpe";
import { fastBlenderNoise } from "../../../utils/texture";

const noise2D = createNoise2D();

function NoiseNode(props: NodeProps<DataType>) {
  const { updateNodeData } = useReactFlow();

  // scale: number = 100,
  // detail: number = 3,
  // roughness: number = 0.1,
  // distortion: number = 0.0

  const [scale, setScale] = useState(100);
  const [detail, setDetail] = useState(3);
  const [roughness, setRoughness] = useState(0.1);
  const [distortion, setDistortion] = useState(0.0);

  useEffect(() => {
    updateNodeData(props.id, {
      obj: {
        type: "instance",
        f: (obj: ArgsObjType) => {
          if (obj && obj.vector) {
            const x = obj.vector.x.f();
            const z = obj.vector.z.f();
            // return fastBlenderNoise(x, z , scale, detail, roughness, distortion)
            return noise2D(x / scale, z / scale);
          } else {
            return fastBlenderNoise(0, 0);
          }
        },
      },
    });
  }, [props.id, updateNodeData, scale, detail, roughness, distortion]);

  return (
    <div className="border border-none rounded-lg cnode rounded-t-lg">
      <div className="header p-2 px-4">
        <h3 className="text-sm font-semibold text">Noise Texture</h3>
      </div>
      <div className="p-4">
        <div className="custom-input space-y-2">
          <div>
            <label className="text-sm text-white mr-2">Scale:</label>
            <CustomInput
              label="Scale"
              className="w-32"
              value={scale}
              onChange={(e) => setScale(evn(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm text-white mr-2">Detail:</label>
            <CustomInput
              label="Detail"
              className="w-32"
              value={detail}
              onChange={(e) => setDetail(evn(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm text-white mr-2">Roughness:</label>
            <CustomInput
              label="Roughness"
              className="w-32"
              value={roughness}
              onChange={(e) => setRoughness(evn(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm text-white mr-2">Distortion:</label>
            <CustomInput
              label="Distortion"
              className="w-32"
              value={distortion}
              onChange={(e) => setDistortion(evn(e.target.value))}
            />
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          style={{ top: "70%", border: "none", width: 10, height: 10 }}
        />
      </div>
    </div>
  );
}

export default NoiseNode;
