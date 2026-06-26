"use client";

import { use } from "react";
import { TemplateDemoPage } from "@/components/marketing/template-demo-page";

interface PreviewPageProps {
  params: Promise<{ templateId: string }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const { templateId } = use(params);
  return <TemplateDemoPage templateId={templateId} />;
}
