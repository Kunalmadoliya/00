"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createProject } from "@/features/projects/actions";
import { Loader2 } from "lucide-react";

export function PostLoginInterceptor() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPending, startTransition] = useTransition();
  const initialized = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || initialized.current) return;

    const pendingPrompt = sessionStorage.getItem("pending_prompt");
    if (pendingPrompt) {
      initialized.current = true;
      
      // Prevent React 19 synchronous setState warning in effect
      queueMicrotask(() => setShowOverlay(true));
      
      const initProject = async () => {
        try {
          const res = await createProject(pendingPrompt);
          sessionStorage.removeItem("pending_prompt");
          
          if (res?.username && res?.project?.name) {
            startTransition(() => {
              router.push(`/${res.username}/${res.project.name}`);
            });
          } else {
             startTransition(() => {
               router.push(`/`);
             });
             setShowOverlay(false);
          }
        } catch (e) {
          console.error("Failed to initialize project from prompt", e);
          sessionStorage.removeItem("pending_prompt");
          setShowOverlay(false);
        }
      };
      
      initProject();
    }
  }, [isLoaded, isSignedIn, router]);

  if (!showOverlay && !isPending) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
      <h2 className="text-2xl font-bold tracking-tight mb-2">Initializing Workspace...</h2>
      <p className="text-muted-foreground font-mono text-sm">Preparing your environment and parsing instructions.</p>
    </div>
  );
}
