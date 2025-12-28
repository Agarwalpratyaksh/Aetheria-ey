// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TemplateSelection from '@/components/TemplateSelection';
import { saveProject, generateThreadId } from '@/utils/projectService';
import { ResearchTemplate } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const userId = '550e8400-e29b-41d4-a716-446655440000'; // Replace with real Auth context later

  const handleSelectProject = (projectId: string) => {
    // Navigate to the dynamic research route
    router.push(`/research/${projectId}`);
  };

  const handleCreateNew = async () => {
    try {
      const newThreadId = generateThreadId();
      // Create empty project immediately to get an ID
      const savedProject = await saveProject(userId, {
        title: 'New Project',
        generatedDocument: { markdown: '', content: '', review: {} },
        chatHistory: [],
        knowledgeGraph: {},
        threadId: newThreadId,
      });

      if (savedProject && savedProject.id) {
        router.push(`/research/${savedProject.id}?new=true`);
      }
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  const handleTemplateSelect = (template: ResearchTemplate) => {
    // If you need to pass the template to the new project, 
    // you might want to create the project here with that template data
    // OR pass it as a query param.
    handleCreateNew(); 
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TemplateSelection 
        onSelect={handleTemplateSelect} 
        userId={userId}
        onSelectProject={handleSelectProject}
        onCreateNew={handleCreateNew}
      />
    </div>
  );
}