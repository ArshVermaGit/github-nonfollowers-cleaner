"use client";

import { signOut } from "next-auth/react";

interface UserNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string;
  };
}

export function UserNav({ user }: UserNavProps) {
  return (
    <div className="flex items-center gap-3">
      {user.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt={user.username ?? user.name ?? "User avatar"}
          className="h-8 w-8 rounded-full"
        />
      )}
      <span className="text-sm font-medium">
        {user.username ?? user.name}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
      >
        Sign out
      </button>
    </div>
  );
}
