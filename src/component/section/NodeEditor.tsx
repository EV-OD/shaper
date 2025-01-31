import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
  } from '@xyflow/react';
   
  import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from 'react';
import TextUpdaterNode from '../widgets/nodes/TextUpdaterNode';
import TextViewerNode from '../widgets/nodes/TextViewerNode';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    {
        id: '3',
        type: 'textUpdater',
        position: { x: 200, y: 0 },
        data: { value: 123 },
      },
      {
        id: '4',
        type: 'viewer',
        position: { x: 400, y: 0 },
        data: { value: 123 },
      },

  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }, 
    {id:'e2-3' , source: '2', target: '3' },
    {id:'e3-4' , source: '3', target: '4' }
];

const NodeEditor = () =>{
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode, viewer:TextViewerNode }), []);

 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: 'calc(100vh - 20%)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes} 
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default NodeEditor