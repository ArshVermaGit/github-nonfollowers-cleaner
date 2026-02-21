import { NextResponse } from "next/server";
import { withGitHubAuth } from "@/lib/api-utils";
import { unfollowUser } from "@/lib/github";
import type { UnfollowResponse } from "@/types/api";

export const DELETE = withGitHubAuth(
  async (req, { params, unencryptedToken }) => {
    const username = params?.username;

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid username parameter" },
        { status: 400 }
      );
    }

    // Validate username parameter: alphanumeric + hyphens only (GitHub constraints)
    const isValidUsername = /^[a-zA-Z0-9-]+$/.test(username);
    if (!isValidUsername) {
      return NextResponse.json(
        { success: false, username, error: "Invalid username format" },
        { status: 400 }
      );
    }

    await unfollowUser(unencryptedToken, username);

    const responseData: UnfollowResponse = {
      success: true,
      username,
    };

    return NextResponse.json(responseData);
  }
);
