"use client";

import React, { useMemo } from "react";
import {
  ArrowRight,
  CheckCircle2,
  User,
  BrainCircuit,
  Database,
  Globe,
  ScrollText,
  TestTube,
  FileKey,
  Shield,
  SquarePlay,
  Play,
} from "lucide-react";
import ReactFlow, {
  Controls,
  Handle,
  Position,
  MarkerType,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

// --- Custom Nodes (Unchanged) ---

const UserNode = ({ data }: any) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
      <div className="relative flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
          <User size={28} className="text-slate-600" />
        </div>
        <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow-sm text-xs font-bold text-slate-700 border border-slate-100">
          {data.label}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-400 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
};

const MasterNode = ({ data }: any) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-xl animate-pulse"></div>
      <div className="relative bg-white rounded-2xl shadow-xl border-2 border-primary/10 p-4 w-48 flex flex-col items-center text-center gap-3 transition-transform hover:scale-105">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
          <BrainCircuit size={24} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800">Master Agent</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1 bg-slate-100 px-2 py-0.5 rounded-full inline-block">
            Orchestrator
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-medium text-green-600">
            Thinking
          </span>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-primary !w-3 !h-3 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-orange-500 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
};

const ClusterNode = ({ data }: any) => {
  return (
    <div className="w-full h-full bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 relative">
      <div className="absolute -top-3 left-6 bg-white px-3 py-1 text-xs font-bold text-slate-400 border border-slate-200 rounded-full flex items-center gap-1">
        <Shield size={10} />
        Specialized Swarm
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "50%", background: "#f97316" }}
        className="!w-4 !h-4 !border-4 !border-white shadow-sm"
      />
    </div>
  );
};

const AgentNode = ({ data }: any) => {
  const Icon = data.icon || Database;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2.5 flex items-center gap-3 w-full hover:shadow-md hover:border-orange-200 transition-all cursor-default">
      <div
        className={`p-2 rounded-lg ${
          data.color || "bg-slate-100 text-slate-600"
        }`}
      >
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div className="text-xs font-bold text-slate-700 leading-tight">
          {data.label}
        </div>
        <div className="text-[9px] text-slate-400 font-mono mt-0.5">Active</div>
      </div>
    </div>
  );
};

// --- Configuration ---

const initialNodes: Node[] = [
  {
    id: "user",
    type: "userNode",
    position: { x: 750, y: 350 },
    data: { label: "Researcher" },
  },
  {
    id: "master",
    type: "masterNode",
    position: { x: 980, y: 350 },
    data: { label: "Master Agent" },
  },
  {
    id: "cluster",
    type: "clusterNode",
    position: { x: 1280, y: 250 },
    style: { width: 240, height: 460, zIndex: -1 },
    data: { label: "Specialized Agents" },
  },
  {
    id: "a1",
    type: "agentNode",
    parentId: "cluster",
    position: { x: 20, y: 30 },
    data: {
      label: "Iqvia Agent",
      icon: Database,
      color: "bg-blue-100 text-blue-600",
    },
    extent: "parent",
  },
  {
    id: "a2",
    type: "agentNode",
    parentId: "cluster",
    position: { x: 20, y: 100 },
    data: {
      label: "Exim Agent",
      icon: Globe,
      color: "bg-indigo-100 text-indigo-600",
    },
    extent: "parent",
  },
  {
    id: "a3",
    type: "agentNode",
    parentId: "cluster",
    position: { x: 20, y: 170 },
    data: {
      label: "Web Search Agent",
      icon: Globe,
      color: "bg-sky-100 text-sky-600",
    },
    extent: "parent",
  },
  {
    id: "a4",
    type: "agentNode",
    parentId: "cluster",
    position: { x: 20, y: 240 },
    data: {
      label: "Patent Landscape",
      icon: ScrollText,
      color: "bg-amber-100 text-amber-600",
    },
    extent: "parent",
  },
  {
    id: "a5",
    type: "agentNode",
    parentId: "cluster",
    position: { x: 20, y: 310 },
    data: {
      label: "Clinical Trial Agent",
      icon: TestTube,
      color: "bg-emerald-100 text-emerald-600",
    },
    extent: "parent",
  },
  {
    id: "a6",
    type: "agentNode",
    parentId: "cluster",
    position: { x: 20, y: 380 },
    data: {
      label: "Internal Knowledge",
      icon: FileKey,
      color: "bg-purple-100 text-purple-600",
    },
    extent: "parent",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "user",
    target: "master",
    animated: true,
    style: { stroke: "#94a3b8", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
    markerStart: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
  },
  {
    id: "e2",
    source: "master",
    target: "cluster",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
    markerStart: { type: MarkerType.ArrowClosed, color: "#f97316" },
  },
];

const Hero: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(
    () => ({
      userNode: UserNode,
      masterNode: MasterNode,
      agentNode: AgentNode,
      clusterNode: ClusterNode,
    }),
    []
  );

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-50 selection:bg-orange-100 selection:text-orange-900 flex items-center">
      
      {/* --- LAYER 1: ORIGINAL STATIC TECH GRID & GLOW --- 
         This is the code restored from your original file. 
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* The Orange Glow Blob */}
        <div className="absolute left-7/12 top-1/2 -translate-y-1/2 -z-10 m-auto h-80 w-80 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* --- LAYER 2: INTERACTIVE REACT FLOW --- 
         We set !bg-transparent here so Layer 1 shows through.
      */}
      <div className="absolute inset-0 z-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          minZoom={0.3}
          maxZoom={1.5}
          zoomOnScroll={false}       // Prevents scroll wheel from zooming
          zoomActivationKeyCode="Ctrl"
          panOnScroll={false}        // Prevents scroll wheel from panning
          preventScrolling={false}
          // IMPORTANT: Transparent background so the static grid is visible
          className="!bg-transparent"
          proOptions={{ hideAttribution: true }}
        >
            <Controls position="bottom-right" className="bg-white border border-slate-200 shadow-sm" />
        
          <Controls className="bg-white border border-slate-200 shadow-sm" />
          <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-slate-50/90 to-transparent pointer-events-none"></div>
          {/* Note: I removed the <Background /> component here because 
              you are using the custom static grid in Layer 1. */}
        </ReactFlow>
        
        {/* Optional: Very subtle fade on the left to help text readability, 
            but kept light so grid is still visible. Remove if you want pure grid. */}
        <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-slate-50/90 to-transparent pointer-events-none"></div>
      </div>

      {/* --- LAYER 3: CONTENT OVERLAY --- */}
      <div className="px-32 mx-auto relative z-10 w-full pointer-events-none">
        <div className="grid lg:grid-cols-2 gap-5 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Badge - Re-enable pointer events */}
            <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 shadow-sm text-xs font-semibold text-blue-700 mb-2 hover:scale-105 transition-transform cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Currently in Prototype mode
            </div>

            {/* Text Headers */}
            <h1 className="text-5xl lg:text-7xl font-serif text-primary leading-[1.1] tracking-tight pointer-events-none">
              The Future of <br />
              {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-primary to-orange-500"> */}
                  <span className="text-blue-700">
                Medical Research
              </span>{" "}
              is Agentic.
            </h1>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed pointer-events-none">
              Transform drug repurposing research from months to days. Orchestrate autonomous agents to analyze market viability, patent landscapes, and clinical data in minutes.
            </p>

            {/* Buttons - Re-enable pointer events */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 pointer-events-auto">
              <button className="relative px-6 py-3 text-white bg-primary hover:bg-slate-800 rounded-xl transition-all shadow-lg hover:shadow-primary/30 font-medium text-lg flex items-center justify-center gap-2 group overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start New Research
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </button>

              <button className="px-6 py-3 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition-all font-medium text-lg shadow-sm hover:shadow-md active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  <Play
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                    />
                    View Demo
                </span>
              </button>
            </div>

            {/* Footer Items */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium pointer-events-auto">
              <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default group">
                <CheckCircle2
                  size={16}
                  className="text-green-500 group-hover:scale-110 transition-transform"
                />{" "}
                30M+ Papers Indexed
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default group">
                <CheckCircle2
                  size={16}
                  className="text-green-500 group-hover:scale-110 transition-transform"
                />{" "}
                Secure Enterprise Cloud
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default group">
                <CheckCircle2
                  size={16}
                  className="text-green-500 group-hover:scale-110 transition-transform"
                />{" "}
                Authenticated API Access
              </div>
            </div>
          </div>
          
          {/* Empty Right Column */}
          <div></div> 
        </div>
      </div>
    </section>
  );
};

export default Hero;