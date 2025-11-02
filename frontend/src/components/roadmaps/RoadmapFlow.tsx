import { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    addEdge,
    Connection,
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import { CustomNode } from './CustomNode';
import { ParticleBackground } from './ParticleBackground';
import '@xyflow/react/dist/style.css';

interface RoadmapFlowProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onEdgesSet: (callback: (edges: Edge[]) => Edge[]) => void;
    onResetView?: () => void;
    isPanLocked?: boolean;
}

const nodeTypes = {
    custom: CustomNode,
};

function RoadmapFlowInner({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onEdgesSet,
    onResetView,
    isPanLocked = false
}: RoadmapFlowProps) {
    const { fitView } = useReactFlow();
    
    const onConnect = useCallback(
        (params: Connection) => onEdgesSet((eds: Edge[]) => addEdge(params, eds)),
        [onEdgesSet]
    );

    useEffect(() => {
        const handleResetView = () => {
            fitView({ padding: 0.1, duration: 800 });
        };

        if (onResetView) {
            window.addEventListener('reset-view', handleResetView);
            return () => window.removeEventListener('reset-view', handleResetView);
        }
    }, [fitView, onResetView]);

    return (
        <div className="h-full flex-1 relative" style={{ 
            height: 'calc(100vh - 60px)', 
            width: '100%',
            minHeight: '400px'
        }}>
            <div className="absolute inset-0 bg-black z-0"></div>
            <ParticleBackground />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView={true}
                fitViewOptions={{ padding: 0.1 }}
                nodesDraggable={true}
                nodesConnectable={true}
                elementsSelectable={true}
                panOnDrag={!isPanLocked}
                zoomOnScroll={!isPanLocked}
                attributionPosition="bottom-left"
                className="bg-black"
                style={{
                    backgroundColor: '#000000', // Pure black background
                    width: '100%',
                    height: '100%'
                }}
                connectionLineStyle={{
                    stroke: '#8b5cf6',
                    strokeWidth: 3,
                    strokeLinecap: 'round'
                }}
                defaultEdgeOptions={{
                    type: 'default',
                    style: { 
                        strokeWidth: 3,
                        stroke: '#8b5cf6'
                    },
                    markerEnd: {
                        type: 'arrowclosed',
                        width: 30,
                        height: 30
                    },
                    animated: true
                }}
            >
                <Controls className="bg-black/80 backdrop-blur-lg shadow-lg rounded-lg !left-2 !bottom-2 lg:!left-4 lg:!bottom-4 border border-border" 
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                <MiniMap
                    className="hidden lg:block backdrop-blur-lg shadow-lg rounded-lg border border-gray-300 !right-4 !top-4 !w-40 !h-32"
                    nodeColor={(node) => {
                        if (!node || !node.data) {
                            return '#22c55e';
                        }
                        const nodeData = node.data as { color?: string };
                        return nodeData.color || '#22c55e';
                    }}
                    maskColor="rgba(255, 255, 255, 0.1)"
                    pannable={true}
                    zoomable={true}
                    style={{
                      backgroundColor: 'rgba(240, 240, 240, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(200, 200, 200, 0.8)'
                    }}
                />
                <Background 
                    gap={16} 
                    size={2} 
                    color="#1a1a2e" // Darker grid for better contrast
                    className="bg-black"
                />
            </ReactFlow>
        </div>
    );
}

export function RoadmapFlow(props: RoadmapFlowProps) {
    return (
        <ReactFlowProvider>
            <RoadmapFlowInner {...props} />
        </ReactFlowProvider>
    );
}
