// // src/components/ResearchWorkspace.tsx
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Sidebar from './Sidebar';
// import TaskPlanner from './TaskPlanner';
// import DocumentViewer from './DocumentViewer';
// import { ResearchConfig, ResearchTemplate, AgentRole, DataSource, Task, ResearchResult } from '@/types';
// import { generateResearchPlan, reviewContent, refineSection, generateSubnodes } from '@/services/geminiService';
// import { executeResearchQuery } from '@/services/apiService';
// import { getProject, updateProject, saveProject } from '@/utils/projectService';
// import { generateKnowledgeGraph } from '@/services/geminiService'; // Ensure this import matches your file structure

// interface ResearchWorkspaceProps {
//   projectId: string;
// }

// const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({ projectId }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const isNewProject = searchParams.get('new') === 'true';

//   // State
//   const [config, setConfig] = useState<ResearchConfig>({
//     topic: '',
//     template: ResearchTemplate.ORIGINAL_RESEARCH,
//     customData: '',
//     customDataSection: 'Methods',
//     selectedAgents: [
//       AgentRole.IQVIA_AGENT, AgentRole.TRIALS_AGENT, AgentRole.PATENT_AGENT, 
//       AgentRole.WEB_AGENT, AgentRole.REPORT_AGENT
//     ],
//     selectedResources: [DataSource.TRIALS_API, DataSource.WEB_PROXY]
//   });

//   const [step, setStep] = useState<'setup' | 'planning' | 'results'>(isNewProject ? 'setup' : 'results');
//   const [loading, setLoading] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [threadId, setThreadId] = useState<string | null>(null);
//   const [chatHistory, setChatHistory] = useState<any[]>([]);
//   const chatHistoryRef = useRef<any[]>([]);
  
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [result, setResult] = useState<ResearchResult | null>(null);
//   const [selectedDocumentText, setSelectedDocumentText] = useState('');

//   // --- INITIALIZATION ---
//   useEffect(() => {
//     const loadProject = async () => {
//       try {
//         const project = await getProject(projectId);
//         if (!project) {
//           alert('Project not found');
//           router.push('/dashboard');
//           return;
//         }

//         setThreadId(project.thread_id);
//         setConfig(prev => ({ ...prev, topic: project.title || '' }));
        
//         if (project.chat_history) {
//             setChatHistory(project.chat_history);
//             chatHistoryRef.current = project.chat_history;
//         }

//         // Restore document state if it exists
//         if (project.generated_document && !isNewProject) {
//             let markdownContent = '';
//             if (typeof project.generated_document === 'string') {
//                 markdownContent = project.generated_document;
//             } else {
//                 markdownContent = project.generated_document.markdown || project.generated_document.content || '';
//             }
            
//             setResult({
//                 markdown: markdownContent,
//                 graph: project.knowledge_graph || { nodes: [], links: [] },
//                 review: project.generated_document.review || {}
//             });
//             setStep('results');
//         } else {
//             setStep('setup');
//         }
//       } catch (error) {
//         console.error('Error loading project:', error);
//       }
//     };

//     if (projectId) loadProject();
//   }, [projectId, router, isNewProject]);

//   // --- HANDLERS (Simplified from your App.tsx) ---

//   const handleBackToProjects = () => {
//     router.push('/dashboard');
//   };

//   const handleGeneratePlan = async () => {
//     if (!config.topic) return;
//     setLoading(true);
//     try {
//       const generatedTasks = await generateResearchPlan(config);
//       setTasks(generatedTasks);
//       setStep('planning');
      
//       // Update title in DB
//       await updateProject(projectId, { title: config.topic });
//     } catch (e) {
//       console.error(e);
//       alert("Error creating plan");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExecuteResearch = async () => {
//     setLoading(true);
//     try {
//       const draftMarkdown = await executeResearchQuery(config.topic, threadId || undefined);
//       const [graphData, reviewData] = await Promise.all([
//         generateKnowledgeGraph(draftMarkdown),
//         reviewContent(draftMarkdown)
//       ]);

//       const newResult = { markdown: draftMarkdown, graph: graphData, review: reviewData };
//       setResult(newResult);
//       setStep('results');

//       await updateProject(projectId, {
//         generated_document: { markdown: draftMarkdown, content: draftMarkdown, review: reviewData },
//         knowledge_graph: graphData,
//         chat_history: chatHistoryRef.current
//       });
//     } catch (e) {
//       console.error(e);
//       alert("Error executing research.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChatMessage = async (message: { role: 'user' | 'assistant'; content: string; timestamp: Date }) => {
//     const newMessage = {
//       role: message.role,
//       message: message.content,
//       timestamp: message.timestamp.toISOString()
//     };
    
//     const newHistory = [...chatHistoryRef.current, newMessage];
//     setChatHistory(newHistory);
//     chatHistoryRef.current = newHistory;

//     await updateProject(projectId, { chat_history: newHistory });
//   };

//   // Re-implement other handlers (handleRefine, handleNodeExpand, etc.) exactly as they were in App.tsx
//   // ... (Copy handleRefine, handleNodeExpand, handleTimelineBranchClick from your original code) ...

//   return (
//     <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
//       <Sidebar 
//         config={config} 
//         setConfig={setConfig} 
//         onGeneratePlan={handleGeneratePlan}
//         onReset={() => setStep('setup')} // Simplified reset
//         isGenerating={loading && step === 'setup'}
//         step={step}
//         onCollapsedChange={setSidebarCollapsed}
//         documentContent={result?.markdown || ''}
//         onChatMessage={handleChatMessage}
//         initialChatHistory={chatHistory}
//         onAppendResearchResult={() => {}} // Implement if needed
//         selectedDocumentText={selectedDocumentText}
//         onClearSelectedText={() => setSelectedDocumentText('')}
//       />
      
//       <main className={`flex-1 h-screen overflow-hidden flex flex-col relative transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-[420px]'}`}>
        
//         {step === 'setup' && (
//              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 animate-fade-in">
//                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] animate-float">
//                     <span className="text-7xl grayscale opacity-30 select-none">🧬</span>
//                  </div>
//                  <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Project Initialized</h2>
//                  <p className="max-w-md text-center text-lg leading-relaxed text-slate-500">
//                      Configure your parameters in the sidebar to begin the analysis for project <br/>
//                      <span className="font-mono text-sm text-slate-400">{projectId}</span>
//                  </p>
//             </div>
//         )}

//         {step === 'planning' && (
//            <div className="flex-1 overflow-y-auto bg-slate-50/50 scrollbar-hide animate-fade-in">
//              <TaskPlanner 
//                 tasks={tasks} 
//                 onExecute={handleExecuteResearch}
//                 isExecuting={loading && step === 'planning'}
//              />
//            </div>
//         )}

//         {step === 'results' && result && (
//             <div className="h-full animate-fade-up">
//                 <DocumentViewer 
//                     content={result.markdown} 
//                     metrics={result.review}
//                     graphData={result.graph}
//                     onRefine={() => {}} // Pass your handleRefine
//                     onRegenerateGraph={() => {}} // Pass your handleRegenerate
//                     onBackToProjects={handleBackToProjects}
//                     chatHistory={chatHistory}
//                     onTimelineBranchClick={() => {}} // Pass handler
//                     onTextSelected={setSelectedDocumentText}
//                     onNodeExpand={() => {}} // Pass handler
//                     onAddToChat={() => {}} // Pass handler
//                     onDeleteNode={() => {}} // Pass handler
//                 />
//             </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ResearchWorkspace;


'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from './Sidebar';
import TaskPlanner from './TaskPlanner';
import DocumentViewer from './DocumentViewer';
import { ResearchConfig, ResearchTemplate, AgentRole, DataSource, Task, ResearchResult, GraphData } from '@/types';
import { generateResearchPlan, reviewContent, refineSection, generateSubnodes, generateKnowledgeGraph } from '@/services/geminiService';
import { executeResearchQuery } from '@/services/apiService';
import { getProject, updateProject } from '@/utils/projectService';

interface ResearchWorkspaceProps {
  projectId: string;
}

const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({ projectId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewProject = searchParams.get('new') === 'true';

  // --- STATE ---
  const [config, setConfig] = useState<ResearchConfig>({
    topic: '',
    template: ResearchTemplate.ORIGINAL_RESEARCH,
    customData: '',
    customDataSection: 'Methods',
    selectedAgents: [
      AgentRole.IQVIA_AGENT, AgentRole.TRIALS_AGENT, AgentRole.PATENT_AGENT, 
      AgentRole.WEB_AGENT, AgentRole.REPORT_AGENT
    ],
    selectedResources: [DataSource.TRIALS_API, DataSource.WEB_PROXY]
  });

  const [step, setStep] = useState<'setup' | 'planning' | 'results'>('setup');
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  
  // Chat History
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const chatHistoryRef = useRef<any[]>([]);

  // Results
  const [tasks, setTasks] = useState<Task[]>([]);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [selectedDocumentText, setSelectedDocumentText] = useState('');

  // --- INITIALIZATION ---
  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      try {
        const project = await getProject(projectId);
        if (!project) {
          router.push('/dashboard');
          return;
        }

        setThreadId(project.thread_id);
        setConfig(prev => ({ ...prev, topic: project.title || '' }));
        
        if (project.chat_history) {
            setChatHistory(project.chat_history);
            chatHistoryRef.current = project.chat_history;
        }

        if (project.generated_document && !isNewProject) {
            let markdownContent = '';
            if (typeof project.generated_document === 'string') {
                markdownContent = project.generated_document;
            } else {
                markdownContent = project.generated_document.markdown || project.generated_document.content || '';
            }
            
            // Ensure graph is loaded safely
            const graph = project.knowledge_graph || { nodes: [], links: [] };

            setResult({
                markdown: markdownContent,
                graph: graph,
                review: project.generated_document.review || {}
            });
            setStep('results');
        } else {
            setStep('setup');
        }
      } catch (error) {
        console.error('Error loading project:', error);
      }
    };
    loadProject();
  }, [projectId, router, isNewProject]);


  // --- HANDLERS ---

  // 1. Generate Plan
  const handleGeneratePlan = async () => {
    if (!config.topic) return;
    setLoading(true);
    try {
      const generatedTasks = await generateResearchPlan(config);
      setTasks(generatedTasks);
      setStep('planning');
      await updateProject(projectId, { title: config.topic });
    } catch (e) {
      console.error(e);
      alert("Error creating plan");
    } finally {
      setLoading(false);
    }
  };

  // 2. Execute Research
  const handleExecuteResearch = async () => {
    setLoading(true);
    try {
      const draftMarkdown = await executeResearchQuery(config.topic, threadId || undefined);
      
      // Parallel generation
      const [graphData, reviewData] = await Promise.all([
        generateKnowledgeGraph(draftMarkdown),
        reviewContent(draftMarkdown)
      ]);

      const newResult = { markdown: draftMarkdown, graph: graphData, review: reviewData };
      setResult(newResult);
      setStep('results');

      await updateProject(projectId, {
        generated_document: { markdown: draftMarkdown, content: draftMarkdown, review: reviewData },
        knowledge_graph: graphData,
        chat_history: chatHistoryRef.current
      });
    } catch (e) {
      console.error(e);
      alert("Error executing research.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Node Expansion (THE MISSING PIECE)
  const handleNodeExpand = async (nodeId: string, nodeName: string) => {
    if (!result) return;
    console.log(`🔬 Expanding node: ${nodeName} (${nodeId})`);

    try {
      // Call Gemini Service
      const subnodesText = await generateSubnodes(nodeName);
      
      // Parse response (simple line-based parsing of "Entity (Type)")
      const lines = subnodesText.split('\n').filter(line => line.trim().length > 0);
      const newNodes: any[] = [];
      const newLinks: any[] = [];
      
      lines.forEach((line, index) => {
        const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
        if (!cleanLine) return;
        
        // Extract Label and Type
        // Expected format: "Entity Name (Type)"
        const match = cleanLine.match(/^(.*?)\s*\((.*?)\)$/);
        const label = match ? match[1] : cleanLine;
        const type = match ? match[2] : 'Topic';
        
        const subNodeId = `${nodeId}-sub-${index}-${Date.now()}`;
        
        // Map type to color group
        const groupMap: Record<string, number> = {
            'Drug': 1, 'Product': 1, 'Molecule': 1,
            'Company': 2, 'Sponsor': 2,
            'Disease': 3, 'Indication': 3,
            'Patent': 4, 'Trial': 4
        };
        
        newNodes.push({
            id: subNodeId,
            label: label,
            group: groupMap[type] || 1
        });
        
        newLinks.push({
            source: nodeId,
            target: subNodeId,
            relation: 'related_to'
        });
      });

      if (newNodes.length === 0) {
        console.warn("No subnodes parsed from response:", subnodesText);
        return;
      }
      
      // Update State
      const updatedGraph: GraphData = {
          nodes: [...result.graph.nodes, ...newNodes],
          links: [...result.graph.links, ...newLinks]
      };
      
      setResult(prev => prev ? ({ ...prev, graph: updatedGraph }) : null);
      
      // Update Database
      await updateProject(projectId, { knowledge_graph: updatedGraph });
      
    } catch (e) {
      console.error("Error expanding node:", e);
      alert("Failed to expand topic. Please try again.");
    }
  };

  // 4. Other Handlers
  const handleChatMessage = async (message: { role: 'user' | 'assistant'; content: string; timestamp: Date }) => {
    const newMessage = {
      role: message.role,
      message: message.content,
      timestamp: message.timestamp.toISOString()
    };
    const newHistory = [...chatHistoryRef.current, newMessage];
    setChatHistory(newHistory);
    chatHistoryRef.current = newHistory;
    await updateProject(projectId, { chat_history: newHistory });
  };

  const handleRefine = async (instruction: string) => {
      if (!result) return;
      try {
          const newMarkdown = await refineSection(result.markdown, instruction);
          const newReview = await reviewContent(newMarkdown);
          
          setResult(prev => prev ? ({ ...prev, markdown: newMarkdown, review: newReview }) : null);
          
          await updateProject(projectId, {
            generated_document: { markdown: newMarkdown, content: newMarkdown, review: newReview }
          });
      } catch (e) { console.error(e); }
  };

  const handleRegenerateGraph = async () => {
    if (!result) return;
    try {
      const newGraph = await generateKnowledgeGraph(result.markdown);
      setResult(prev => prev ? ({ ...prev, graph: newGraph }) : null);
      await updateProject(projectId, { knowledge_graph: newGraph });
    } catch (e) { console.error(e); }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        config={config} 
        setConfig={setConfig} 
        onGeneratePlan={handleGeneratePlan}
        onReset={() => setStep('setup')}
        isGenerating={loading && step === 'setup'}
        step={step}
        onCollapsedChange={setSidebarCollapsed}
        documentContent={result?.markdown || ''}
        onChatMessage={handleChatMessage}
        initialChatHistory={chatHistory}
        onAppendResearchResult={() => {}}
        selectedDocumentText={selectedDocumentText}
        onClearSelectedText={() => setSelectedDocumentText('')}
      />
      
      <main className={`flex-1 h-screen overflow-hidden flex flex-col relative transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-[420px]'}`}>
        
        {step === 'setup' && (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 animate-fade-in">
                 <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] animate-float">
                    <span className="text-7xl grayscale opacity-30 select-none">🧬</span>
                 </div>
                 <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Project Initialized</h2>
                 <p className="max-w-md text-center text-lg leading-relaxed text-slate-500">
                     Configure your parameters in the sidebar to begin analysis for project <br/>
                     <span className="font-mono text-sm text-slate-400">{projectId}</span>
                 </p>
            </div>
        )}

        {step === 'planning' && (
           <div className="flex-1 overflow-y-auto bg-slate-50/50 scrollbar-hide animate-fade-in">
             <TaskPlanner 
                tasks={tasks} 
                onExecute={handleExecuteResearch}
                isExecuting={loading && step === 'planning'}
             />
           </div>
        )}

        {step === 'results' && result && (
            <div className="h-full animate-fade-up">
                <DocumentViewer 
                    content={result.markdown} 
                    metrics={result.review}
                    graphData={result.graph}
                    onRefine={handleRefine}
                    onRegenerateGraph={handleRegenerateGraph}
                    onBackToProjects={() => router.push('/dashboard')}
                    chatHistory={chatHistory}
                    onTimelineBranchClick={async () => {}} 
                    onTextSelected={setSelectedDocumentText}
                    onNodeExpand={handleNodeExpand}
                    onAddToChat={(txt) => setSelectedDocumentText(txt)}
                    onDeleteNode={async (id) => {
                        // Delete logic
                        const updatedNodes = result.graph.nodes.filter(n => n.id !== id);
                        const updatedLinks = result.graph.links.filter(l => l.source !== id && l.target !== id);
                        const newGraph = { nodes: updatedNodes, links: updatedLinks };
                        setResult(prev => prev ? ({ ...prev, graph: newGraph }) : null);
                        await updateProject(projectId, { knowledge_graph: newGraph });
                    }} 
                />
            </div>
        )}
      </main>
    </div>
  );
};

export default ResearchWorkspace;