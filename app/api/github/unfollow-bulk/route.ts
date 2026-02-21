import { NextResponse } from "next/server";
import { withGitHubAuth } from "@/lib/api-utils";
import { unfollowUser } from "@/lib/github";
import type { BulkUnfollowRequest, BulkUnfollowResponse, BulkUnfollowResult } from "@/types/api";

const MAX_BULK_USERS = 100;
const DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const POST = withGitHubAuth(async (req, { unencryptedToken }) => {
  let body: BulkUnfollowRequest;
  
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { usernames } = body;

  if (!Array.isArray(usernames)) {
    return NextResponse.json(
      { error: "usernames must be an array of strings" },
      { status: 400 }
    );
  }

  if (usernames.length === 0) {
    return NextResponse.json(
      { error: "usernames array cannot be empty" },
      { status: 400 }
    );
  }

  if (usernames.length > MAX_BULK_USERS) {
    return NextResponse.json(
      { error: `Cannot process more than ${MAX_BULK_USERS} usernames at once` },
      { status: 400 }
    );
  }

  // Validate all usernames first
  for (const username of usernames) {
    if (typeof username !== "string" || !/^[a-zA-Z0-9-]+$/.test(username)) {
      return NextResponse.json(
        { error: `Invalid username in array: ${username}` },
        { status: 400 }
      );
    }
  }

  const results: BulkUnfollowResult[] = [];
  let succeeded = 0;
  let failed = 0;

  // Process sequentially to respect GitHub API rate limits
  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i];
    
    try {
      if (i > 0) {
        await delay(DELAY_MS); // Add delay between requests
      }
      
      await unfollowUser(unencryptedToken, username);
      results.push({ username, success: true });
      succeeded++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      results.push({ username, success: false, error: errorMessage });
      failed++;
    }
  }

  const responseData: BulkUnfollowResponse = {
    results,
    total: usernames.length,
    succeeded,
    failed,
  };

  return NextResponse.json(responseData);
});
