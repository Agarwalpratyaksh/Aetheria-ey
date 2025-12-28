import React from 'react';
import ResearchWorkspace from '@/components/ResearchWorkspace';

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ResearchPage({ params }: PageProps) {
  // 1. Await the params object to resolve the promise
  const resolvedParams = await params;
  
  // 2. Extract the projectId safely
  const { projectId } = resolvedParams;

  // 3. Pass the string ID to your client component
  return <ResearchWorkspace projectId={projectId} />;
}