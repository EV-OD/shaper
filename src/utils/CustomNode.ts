import CombineVectorNode from "../component/widgets/nodes/combineVector";
import RandomNode from "../component/widgets/nodes/randomNode";
import ValueNode from "../component/widgets/nodes/valueNode";
import VectorAdd from "../component/widgets/nodes/vectorAdd";
import VectorViewNode from "../component/widgets/nodes/vectorView";
import RandomVector from "../component/widgets/nodes/randomVector";
import VectorNode from "../component/widgets/nodes/vectorNode";
import PlaneGeoNode from "../component/widgets/nodes/PlaneGeoNode";
import GeoViewNode from "../component/widgets/nodes/GeoViewNode";
import CubeGeoNode from "../component/widgets/nodes/CubeGeoNode";
import ScaleGeoNode from "../component/widgets/nodes/ScaleGeoNode";
import InstancePositionNode from "../component/widgets/nodes/InstancePositionNode";
import RotateGeoNode from "../component/widgets/nodes/RotateGeoNode";
import TranslateGeoNode from "../component/widgets/nodes/TranslateGeoNode";
import VectorSub from "../component/widgets/nodes/vectorSub";
import NoiseNode from "../component/widgets/nodes/noiseNode";



export const VectorNodeTypes = {
  arithemetic: {
    vectorAdd: VectorAdd,
    vectorSub: VectorSub,
  },
  output: {
    vectorView: VectorViewNode,
  },
  input: {
    randomVector: RandomVector,
    vectorNode: VectorNode,
  }, 
  misc: {
    combineVector: CombineVectorNode,
  }
}

export const GeoNodeTypes = {
  mesh:{
    planeGeometry: PlaneGeoNode,
    cubeGeoNode: CubeGeoNode,
  },
  output: {
    geoViewNode: GeoViewNode,
  },
  transform: {
    scaleGeoNode: ScaleGeoNode,
    rotateGeoNode: RotateGeoNode,
    translateGeoNode: TranslateGeoNode,
  },
  instance: {
    vetrexInsNode: InstancePositionNode,
  }
}

export const valueNodeTypes = {
  randomNode: RandomNode,
  valueNode: ValueNode,
  noiseTexture: NoiseNode
}



// function to deep flaten an object
function flattenObject(obj: Record<string, any>, parentKey: string = '', result: Record<string, any> = {}): Record<string, any> {
  for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
          flattenObject(obj[key], parentKey, result);
      } else {
          result[key] = obj[key];
      }
  }
  return result;
}

const CustomNodeType = {
  ...valueNodeTypes,
  ...flattenObject(VectorNodeTypes),
  ...flattenObject(GeoNodeTypes),
}

export {CustomNodeType}


