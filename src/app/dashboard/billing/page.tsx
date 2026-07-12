"use client";

import { motion } from "framer-motion";
import { 
  CreditCard, 
  CheckCircle2, 
  Download, 
  ArrowUpRight,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";


const invoices = [
  { id: "INV-2026-001", date: "Jul 1, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-2026-002", date: "Jun 1, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-2026-003", date: "May 1, 2026", amount: "$0.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription, usage, and billing history.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Current Plan Overview */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="h-32 w-32" />
            </div>
            
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Free tier.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold tracking-tighter">$0</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">AI Generations</span>
                    <span className="text-muted-foreground">45 / 100</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[45%] rounded-full" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Active Projects</span>
                    <span className="text-muted-foreground">2 / 3</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[66%] rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Limits reset on Aug 1, 2026</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Upgrade Plan <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border/50 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="text-left font-medium p-3">Invoice</th>
                      <th className="text-left font-medium p-3">Date</th>
                      <th className="text-left font-medium p-3">Amount</th>
                      <th className="text-right font-medium p-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium">{inv.id}</td>
                        <td className="p-3 text-muted-foreground">{inv.date}</td>
                        <td className="p-3">{inv.amount}</td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 hover:text-primary">
                            <Download className="mr-2 h-3 w-3" /> PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Cards */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="relative overflow-hidden border-primary/50 shadow-lg shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                Recommended
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>For professionals and small teams.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tighter">$20</span>
                  <span className="text-muted-foreground text-sm">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Unlimited AI Generations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Unlimited Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Access to Claude 3.5 Sonnet</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Priority Support</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Upgrade to Pro
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Payment Method</CardTitle>
              </div>
              <CardDescription>No payment method on file.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">Add Payment Method</Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
