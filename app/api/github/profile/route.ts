import { NextResponse } from "next/server";
import { withGitHubAuth } from "@/lib/api-utils";
import { getAuthenticatedUser } from "@/lib/github";
import type { ProfileResponse } from "@/types/api";

export const GET = withGitHubAuth(async (req, { user, unencryptedToken }) => {
  const profileDetails = await getAuthenticatedUser(unencryptedToken);

  const responseData: ProfileResponse = {
    user: profileDetails,
    lastSyncAt: user.lastSyncAt ? user.lastSyncAt.toISOString() : null,
  };

  return NextResponse.json(responseData);
});
