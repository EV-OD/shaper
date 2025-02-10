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
    useReactFlow,
  } from '@xyflow/react';
   
  import '@xyflow/react/dist/style.css';
import { useCallback, useMemo, useRef } from 'react';
import RandomeNode from '../widgets/nodes/randomNode';
import CombineVectorNode from '../widgets/nodes/combineVector';
import VectorViewNode from '../widgets/nodes/vectorView';
import VectorAdd from '../widgets/nodes/vectorAdd';
import { useDnD } from '../../DndContext';
import SideBar from '../Sidebar';
import { CustomNodeType } from '../../utils/CustomNode';

const initialNodes = [];
const initialEdges = [];

let id = 0;
const getId = () => `dndnode_${id++}`;


const NodeEditor = () =>{
  const reactFlowWrapper = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => CustomNodeType, []);

  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 
      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 
  return (
    <div style={{ width: '100vw', height: '100%' }}>
      <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes} 
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          colorMode='dark'
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
        </div>
        <SideBar/>
        </div>
    </div>
  );
}

export default NodeEditor