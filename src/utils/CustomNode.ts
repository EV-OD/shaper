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
import ShadeSmoothNode from "../component/widgets/nodes/shadeSmooth";
import JoinGeoNode from "../component/widgets/nodes/JoinGeoNode";
import ClampNode from "../component/widgets/nodes/ClampNode";
import ModelNode from "../component/widgets/nodes/ImportModel";
import ToMeshNode from "../component/widgets/nodes/ToMeshNode";
import GroupMeshNode from "../component/widgets/nodes/GroupNode";
import MeshViewNode from "../component/widgets/nodes/MeshViewNode";
import TranslateMeshNode from "../component/widgets/nodes/TranslateMeshNode";
import NoGeoInstancePositionNode from "../component/widgets/nodes/NoGeoInstanceNode";

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
  },
};

export const GeoNodeTypes = {
  mesh: {
    planeGeometry: PlaneGeoNode,
    cubeGeoNode: CubeGeoNode,
    importNode: ModelNode,
  },
  output: {
    geoViewNode: GeoViewNode,
  },
  transform: {
    scaleGeoNode: ScaleGeoNode,
    rotateGeoNode: RotateGeoNode,
    translateGeoNode: TranslateGeoNode,
    translateMesh: TranslateMeshNode,
  },
  instance: {
    vetrexInsNode: InstancePositionNode,
    noGeoInstanceNode: NoGeoInstancePositionNode,
  },
  misc: {
    shadeSmoothNode: ShadeSmoothNode,
    joinGeoNode: JoinGeoNode,
    toMeshNode: ToMeshNode,
    groupMesh: GroupMeshNode,
    meshViewNode: MeshViewNode,
  },
};

export const valueNodeTypes = {
  randomNode: RandomNode,
  valueNode: ValueNode,
  noiseTexture: NoiseNode,
  clampNode: ClampNode,
};

// function to deep flaten an object
function flattenObject(
  obj: Record<string, any>,
  parentKey: string = "",
  result: Record<string, any> = {},
): Record<string, any> {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
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
};

export { CustomNodeType };
