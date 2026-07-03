"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<"general" | "appearance" | "billing">("general");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] gap-0 p-0 border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="p-6 border-b">
          <DialogHeader>
            <DialogTitle className="text-xl">Settings</DialogTitle>
            <DialogDescription>
              Manage your workspace preferences and billing.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="w-full flex h-[400px]">
          <div className="flex flex-col h-full w-[160px] justify-start border-r p-2 gap-1 bg-muted/20">
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("general")}
              className={cn("w-full justify-start font-normal", activeTab === "general" && "bg-accent")}
            >
              General
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("appearance")}
              className={cn("w-full justify-start font-normal", activeTab === "appearance" && "bg-accent")}
            >
              Appearance
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("billing")}
              className={cn("w-full justify-start font-normal", activeTab === "billing" && "bg-accent")}
            >
              Billing
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "general" && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-lg font-medium">General Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Model</label>
                    <select className="w-full p-2 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary/20">
                      <option>Claude 3.5 Sonnet</option>
                      <option>GPT-4o</option>
                      <option>Gemini 1.5 Pro</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "appearance" && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-lg font-medium">Appearance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                  </div>
                  <ModeToggle />
                </div>
              </div>
            )}
            
            {activeTab === "billing" && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-lg font-medium">Billing & Plan</h3>
                <div className="rounded-lg border p-4 bg-card/50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium text-primary">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">$20/month</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ Unlimited generations</p>
                    <p>✓ Fast queue</p>
                    <p>✓ Private projects</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
