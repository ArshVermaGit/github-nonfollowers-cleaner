"use client";

import { useState } from "react";
import { GitHubUser } from "@/types";
import { useUnfollow } from "@/hooks/use-github";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, PartyPopper, Loader2, Check } from "lucide-react";

interface NonFollowersTableProps {
  isLoading: boolean;
  users: GitHubUser[];
  selectedUsers: Set<string>;
  onSelectOne: (username: string, checked: boolean) => void;
}

export function NonFollowersTable({ isLoading, users, selectedUsers, onSelectOne }: NonFollowersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const unfollowMutation = useUnfollow();
  const [unfollowedLocal, setUnfollowedLocal] = useState<Set<string>>(new Set());

  if (isLoading) {
    return (
      <div className="rounded-md border border-zinc-800 bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead>User</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i} className="border-zinc-800">
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-zinc-800 rounded-lg bg-zinc-950/50">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 mb-6">
          <PartyPopper className="h-10 w-10 text-[#238636]" />
        </div>
        <h3 className="text-xl font-bold text-zinc-50 mb-2">You&apos;re all clean!</h3>
        <p className="text-zinc-400 max-w-sm mx-auto">
          Everyone you follow is following you back 🎉
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleUnfollow = async (username: string) => {
    try {
      await unfollowMutation.mutateAsync(username);
      setUnfollowedLocal(new Set(unfollowedLocal).add(username));
    } catch {
      // toast is already handled in the hook
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent bg-zinc-900/50">
              <TableHead className="w-12 text-center">
                 {/* Only to align row checkboxes properly */}
              </TableHead>
              <TableHead className="text-zinc-300">User</TableHead>
              <TableHead className="text-zinc-300">Profile</TableHead>
              <TableHead className="text-zinc-300">Type</TableHead>
              <TableHead className="text-right text-zinc-300">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => {
              const isUnfollowed = unfollowedLocal.has(user.login);
              const isPending = unfollowMutation.isPending && unfollowMutation.variables === user.login;
              
              return (
                <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <TableCell className="text-center align-middle">
                    <Checkbox 
                      checked={selectedUsers.has(user.login)}
                      onCheckedChange={(c) => onSelectOne(user.login, !!c)}
                      disabled={isUnfollowed || isPending}
                      className="border-zinc-700 data-[state=checked]:bg-[#238636] data-[state=checked]:text-white"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-zinc-800">
                        <AvatarImage src={user.avatar_url} alt={user.login} />
                        <AvatarFallback className="bg-zinc-800 text-xs">
                          {user.login.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <a 
                        href={user.html_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="font-medium text-zinc-200 hover:text-white hover:underline transition-all"
                      >
                        {user.login}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={user.html_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[#238636] hover:text-[#2ea043] flex items-center gap-1 text-sm transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={user.type === "Organization" ? "border-blue-900 text-blue-400 bg-blue-950/30" : "border-zinc-700 text-zinc-400 bg-zinc-900/50"}
                    >
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {isUnfollowed ? (
                      <Button variant="outline" size="sm" disabled className="border-[#238636]/50 text-[#238636] bg-[#238636]/10">
                        <Check className="mr-2 h-3.5 w-3.5" />
                        Unfollowed
                      </Button>
                    ) : (
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleUnfollow(user.login)}
                        disabled={isPending}
                        className="bg-red-900/40 text-red-500 hover:bg-red-900/80 hover:text-white border border-red-900/50 min-w-[100px]"
                      >
                        {isPending ? (
                          <><Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> Unfollowing</>
                        ) : "Unfollow"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-zinc-400">
          <div>
            Showing <span className="text-zinc-50 font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-zinc-50 font-medium">{Math.min(currentPage * itemsPerPage, users.length)}</span> of <span className="text-zinc-50 font-medium">{users.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900"
            >
              Previous
            </Button>
            <div className="px-2 text-zinc-500 border border-zinc-800 bg-zinc-900/30 rounded-md h-9 flex items-center justify-center min-w-[40px]">
              {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
