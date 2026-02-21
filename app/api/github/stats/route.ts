import { NextResponse } from "next/server";
import { withGitHubAuth } from "@/lib/api-utils";
import {
  fetchAllFollowers,
  fetchAllFollowing,
  getNotFollowingBack,
} from "@/lib/github";
import { prisma } from "@/lib/prisma";
import type { StatsResponse } from "@/types/api";

export const revalidate = 60; // Cache for 60 seconds

export const GET = withGitHubAuth(async (req, { user, unencryptedToken }) => {
  // Fetch followers and following in parallel
  const [followers, following] = await Promise.all([
    fetchAllFollowers(unencryptedToken),
    fetchAllFollowing(unencryptedToken),
  ]);

  // Compute users not following back
  const notFollowingBack = getNotFollowingBack(followers, following);

  // Update last sync time in database
  const now = new Date();
  await prisma.user.update({
    where: { id: user.id },
    data: { lastSyncAt: now },
  });

  const responseData: StatsResponse = {
    followers: followers.length,
    following: following.length,
    notFollowingBack,
    lastSyncAt: now.toISOString(),
  };

  return NextResponse.json(responseData);
});
