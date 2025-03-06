import { useState, useCallback } from "react";

// Vertex class representing connection points
class Vertex {
  id: string;
  connectionId?: string;
  processedData?: any;

  constructor(id: string, processedData?: any) {
    this.id = id;
    this.processedData = processedData;
  }
}

// Node class containing vertices
class GraphNode {
  id: string;
  data: any;
  inputs: Vertex[];
  outputs: Vertex[];

  constructor(id: string, data: any) {
    this.id = id;
    this.data = data;
    this.inputs = [];
    this.outputs = [];
  }
}

// Edge representing connections
class Edge {
  id: string;
  from: string;
  to: string;
  fromVertexId: string;
  toVertexId: string;
  data: any;

  constructor(from: string, to: string, fromVertexId: string, toVertexId: string, data: any) {
    this.id = `${from}-${to}-${fromVertexId}-${toVertexId}`;
    this.from = from;
    this.to = to;
    this.fromVertexId = fromVertexId;
    this.toVertexId = toVertexId;
    this.data = data;
  }
}

// GraphList for managing nodes and edges
class GraphList {
  private nodes: Map<string, GraphNode>;
  private edges: Edge[];

  constructor() {
    this.nodes = new Map();
    this.edges = [];
  }

  addNode(id: string, data: any) {
    this.nodes.set(id, new GraphNode(id, data));
  }

  addEdge(fromId: string, toId: string, fromVertexId: string, toVertexId: string, data: any) {
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);
    if (!fromNode || !toNode) throw new Error("Both nodes must exist");
    
    this.edges.push(new Edge(fromId, toId, fromVertexId, toVertexId, data));
  }

  removeEdge(fromId: string, toId: string, fromVertexId: string, toVertexId: string) {
    this.edges = this.edges.filter(edge => !(edge.from === fromId && edge.to === toId && edge.fromVertexId === fromVertexId && edge.toVertexId === toVertexId));
  }

  setNodes(nodes: GraphNode[]) {
    this.nodes.clear();
    nodes.forEach(node => this.nodes.set(node.id, node));
  }

  setEdges(edges: Edge[]) {
    this.edges = edges;
  }

  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  getAllEdges(): Edge[] {
    return this.edges;
  }
}

// Hooks for managing state
export const useNodesState = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const setNodesData = useCallback((newNodes: GraphNode[]) => setNodes(newNodes), []);
  return [nodes, setNodesData] as const;
};

export const useEdgesState = () => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const setEdgesData = useCallback((newEdges: Edge[]) => setEdges(newEdges), []);
  return [edges, setEdgesData] as const;
};

export const useNodesData = () => {
  const [nodesData, setNodesData] = useState<any>({});
  const updateNodesData = useCallback((id: string, data: any) => {
    setNodesData(prevData => ({ ...prevData, [id]: data }));
  }, []);
  return [nodesData, updateNodesData] as const;
};

export const useNodeConnections = () => {
  const [connections, setConnections] = useState<Record<string, string[]>>({});
  const updateConnections = useCallback((nodeId: string, connectedNodeIds: string[]) => {
    setConnections(prevConnections => ({ ...prevConnections, [nodeId]: connectedNodeIds }));
  }, []);
  return [connections, updateConnections] as const;
};

export const useReactFlow = () => {
  const [nodes, setNodes] = useNodesState();
  const [edges, setEdges] = useEdgesState();
  const [nodesData, updateNodesData] = useNodesData();
  const [connections, updateConnections] = useNodeConnections();

  return { nodes, edges, nodesData, connections, setNodes, setEdges, updateNodesData, updateConnections };
};
