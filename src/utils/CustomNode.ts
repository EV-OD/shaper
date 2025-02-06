import CombineVectorNode from "../component/widgets/nodes/combineVector";
import RandomNode from "../component/widgets/nodes/randomNode";
import ValueNode from "../component/widgets/nodes/valueNode";
import VectorAdd from "../component/widgets/nodes/vectorAdd";
import VectorViewNode from "../component/widgets/nodes/vectorView";
import RandomVector from "../component/widgets/nodes/randomVector";
import VectorNode from "../component/widgets/nodes/vectorNode";

export const CustomNodeType = { 
  randomNode: RandomNode, 
  combineVector: CombineVectorNode,
  vectorView: VectorViewNode,
  vectorAdd: VectorAdd,
  valueNode: ValueNode,
  randomVector: RandomVector,
  vectorNode: VectorNode,
};
