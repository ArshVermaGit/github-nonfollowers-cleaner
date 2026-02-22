"use client";

import { useStats } from "@/hooks/use-github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserPlus, UserMinus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function StatsCards() {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.followers ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Following</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.following ?? 0}</div>
          </CardContent>
        </Card>
        <Card className="border-[#238636]/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#238636]">
              Not Following Back
            </CardTitle>
            <UserMinus className="h-4 w-4 text-[#238636]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#238636]">
              {stats?.notFollowingBack?.length ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {stats?.lastSyncAt && (
        <p className="text-xs text-muted-foreground">
          Last synced:{" "}
          {formatDistanceToNow(new Date(stats.lastSyncAt), {
            addSuffix: true,
          })}
        </p>
      )}
    </div>
  );
}
