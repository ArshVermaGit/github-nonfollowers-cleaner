"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface BulkProgressProps {
  progress: { current: number; total: number };
  results: Array<{ username: string; success: boolean; error?: string }>;
  onCancel: () => void;
}

export function BulkProgress({ progress, results, onCancel }: BulkProgressProps) {
  const percent = progress.total === 0 ? 0 : Math.round((progress.current / progress.total) * 100);
  const isFinished = progress.current >= progress.total;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-50">Bulk Unfollow Progress</h3>
          <p className="text-zinc-400 text-sm">
            {isFinished 
              ? `Completed! Processed ${progress.total} users.` 
              : `Processing... Unfollowed ${progress.current} out of ${progress.total} selected.`}
          </p>
        </div>
        {!isFinished && (
          <Button variant="outline" onClick={onCancel} className="shrink-0 border-zinc-800 hover:bg-zinc-900">
             Cancel Remaining
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-zinc-400 px-1">
          <span>{percent}%</span>
          <span>{progress.current} / {progress.total}</span>
        </div>
        <Progress value={percent} className="h-3 bg-zinc-900 [&>div]:bg-[#238636]" />
      </div>

      {results.length > 0 && (
        <div className="mt-6 rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden">
          <div className="max-h-60 overflow-y-auto p-4 space-y-3">
            {results.map((res, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                {res.success ? (
                  <CheckCircle2 className="h-4 w-4 text-[#238636] shrink-0" />
                ) : res.error === "Rate limited" ? (
                  <AlertCircle className="h-4 w-4 text-orange-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                )}
                
                <span className="font-medium text-zinc-300">@{res.username}</span>
                
                {res.success ? (
                  <span className="text-zinc-500">— Unfollowed</span>
                ) : (
                  <span className="text-red-400">— Error: {res.error}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
