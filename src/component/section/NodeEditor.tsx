import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    ReactFlowProvider,
  } from '@xyflow/react';
   
  import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from 'react';
import RandomeNode from '../widgets/nodes/randomNode';
import CombineVectorNode from '../widgets/nodes/combineVector';
import VectorViewNode from '../widgets/nodes/vectorView';

const initialNodes = [
    {
        id: '1',
        type: 'randomNode',
        position: { x: 0, y: 50 },
      },
      {
        id: '2',
        type: 'combineVector',
        position: { x: 200, y: 50 },
      },
      {
        id: '3',
        type: "vectorView",
        position: { x: 500, y: 50 },
      }
  ];
  const initialEdges = [
];

const NodeEditor = () =>{
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ randomNode: RandomeNode, 
    combineVector: CombineVectorNode,
    vectorView: VectorViewNode
  }), []);

 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: 'calc(100vh - 20%)' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes} 
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default NodeEditor