"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Settings2, 
  Building, 
  Bell, 
  Monitor, 
  ShieldCheck,
  CreditCard,
  Keyboard,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  { title: "Profile", icon: User, id: "profile" },
  { title: "Appearance", icon: Monitor, id: "appearance" },
  { title: "Workspace", icon: Building, id: "workspace" },
  { title: "AI Preferences", icon: Settings2, id: "ai" },
  { title: "Notifications", icon: Bell, id: "notifications" },
  { title: "Shortcuts", icon: Keyboard, id: "shortcuts" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {sidebarNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium">Public Profile</h2>
                <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
              </div>
              <div className="h-px bg-border/50" />
              
              <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Display Name</CardTitle>
                  <CardDescription>
                    Please enter your full name, or a display name you are comfortable with.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md">
                    <Input defaultValue="John Doe" />
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Please use 32 characters at maximum.</p>
                  <Button size="sm">Save changes</Button>
                </CardFooter>
              </Card>

              <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Email Address</CardTitle>
                  <CardDescription>
                    This is the email address used for login and notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md">
                    <Input defaultValue="john.doe@example.com" disabled />
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 px-6 py-4">
                  <Button variant="outline" size="sm">Manage on Clerk</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium">Appearance</h2>
                <p className="text-sm text-muted-foreground">Customize the look and feel of your dashboard.</p>
              </div>
              <div className="h-px bg-border/50" />
              
              <div className="grid gap-4 md:grid-cols-3">
                {['Light', 'Dark', 'System'].map((theme, i) => (
                  <button 
                    key={theme}
                    className={cn(
                      "flex flex-col items-center gap-4 p-4 rounded-xl border-2 transition-all",
                      i === 1 ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <div className={cn(
                      "w-full aspect-[4/3] rounded-lg border shadow-sm flex items-center justify-center p-2",
                      theme === 'Dark' ? "bg-zinc-950 border-zinc-800" : 
                      theme === 'Light' ? "bg-white border-zinc-200" : 
                      "bg-gradient-to-br from-white to-zinc-950 border-zinc-300"
                    )}>
                      {/* Fake UI illustration */}
                      <div className="w-full h-full flex flex-col gap-1.5 opacity-50">
                        <div className="w-full h-2 rounded bg-current opacity-20" />
                        <div className="w-3/4 h-2 rounded bg-current opacity-20" />
                        <div className="flex-1 rounded border border-current opacity-10 mt-2" />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{theme}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "ai" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium">AI Preferences</h2>
                <p className="text-sm text-muted-foreground">Manage default models and generation settings.</p>
              </div>
              <div className="h-px bg-border/50" />
              
              <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Default Model</CardTitle>
                  <CardDescription>
                    Select the model that will be selected by default when starting a new chat.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {['Gemini 3.1 Pro', 'Gemini 3.1 Flash', 'Claude 3.5 Sonnet'].map((model, i) => (
                      <label key={model} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                        <input type="radio" name="model" className="h-4 w-4 text-primary" defaultChecked={i === 0} />
                        <span className="text-sm font-medium">{model}</span>
                        {i === 0 && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Recommended</span>}
                      </label>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-end">
                  <Button size="sm">Save preferences</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* Placeholders for other tabs */}
          {["workspace", "notifications", "shortcuts"].includes(activeTab) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Settings2 className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-medium">Under Construction</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                This section is being developed. Check back later for updates to this settings panel.
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
