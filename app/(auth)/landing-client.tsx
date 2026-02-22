"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Search, Zap, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

export function LandingClient() {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-[#238636] selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-zinc-50" />
            <span className="text-xl font-bold tracking-tight">GitClean</span>
          </div>
          <Button 
            variant="outline" 
            className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:text-zinc-50 text-zinc-50"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <motion.div 
              className="flex flex-col items-center space-y-8 text-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Clean Your <span className="text-[#238636]">GitHub</span> Following List
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover who doesn&apos;t follow you back. Unfollow in bulk. Keep your network clean and meaningful.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="w-full max-w-sm space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-[#238636] hover:bg-[#2ea043] text-white gap-2 font-medium"
                  onClick={handleSignIn}
                >
                  <Github className="h-5 w-5" />
                  Sign in with GitHub
                </Button>
                <p className="text-xs text-zinc-500">
                  Free &bull; No data stored after session &bull; Open source
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-zinc-900/50 flex justify-center">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader>
                    <Search className="h-10 w-10 text-[#238636] mb-4" />
                    <CardTitle className="text-zinc-50">Instant Analysis</CardTitle>
                    <CardDescription className="text-zinc-400">See who doesn&apos;t follow you back in seconds, precisely identifying non-followers instantly.</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader>
                    <Zap className="h-10 w-10 text-[#238636] mb-4" />
                    <CardTitle className="text-zinc-50">Bulk Unfollow</CardTitle>
                    <CardDescription className="text-zinc-400">Remove non-followers one by one or all at once with powerful bulk selection tools.</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader>
                    <ShieldCheck className="h-10 w-10 text-[#238636] mb-4" />
                    <CardTitle className="text-zinc-50">Secure &amp; Private</CardTitle>
                    <CardDescription className="text-zinc-400">OAuth only. Tokens are encrypted and no passwords or permanent data is stored securely.</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-12 text-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-50">How it works</h2>
                <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed mx-auto">
                  Clean up your GitHub profile in three simple steps.
                </p>
              </motion.div>
              
              <div className="grid gap-8 md:grid-cols-3 relative w-full pt-8">
                {/* Connecting lines for desktop */}
                <div className="hidden md:block absolute top-[28px] left-[16.5%] right-[16.5%] h-0.5 bg-zinc-800 -z-10" />
                
                {[
                  { step: "1", title: "Connect GitHub", desc: "Sign in securely via OAuth" },
                  { step: "2", title: "Analyze", desc: "We fetch your followers and following lists" },
                  { step: "3", title: "Unfollow", desc: "Select non-followers and remove them" }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border-2 border-zinc-800 text-xl font-bold text-[#238636] shadow-sm">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-zinc-50">{item.title}</h3>
                    <p className="text-sm text-zinc-400 max-w-[200px] mx-auto text-center">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row px-4 text-center max-w-7xl mx-auto">
          <p className="text-sm text-zinc-500 leading-loose">
            Built with Next.js &bull; Not affiliated with GitHub
          </p>
        </div>
      </footer>
    </div>
  );
}
