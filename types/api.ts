import { GitHubUser } from "./github";

export interface StatsResponse {
  followers: number;
  following: number;
  notFollowingBack: GitHubUser[];
  lastSyncAt: string | null;
}

export interface UnfollowResponse {
  success: boolean;
  username: string;
  error?: string;
}

export interface BulkUnfollowRequest {
  usernames: string[];
}

export interface BulkUnfollowResult {
  username: string;
  success: boolean;
  error?: string;
}

export interface BulkUnfollowResponse {
  results: BulkUnfollowResult[];
  total: number;
  succeeded: number;
  failed: number;
  error?: string;
}

export interface ProfileResponse {
  user: GitHubUser;
  lastSyncAt: string | null;
}
