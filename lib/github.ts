import axios from "axios";
import type { GitHubUser } from "@/types";

const GITHUB_API = "https://api.github.com";

function createClient(accessToken: string) {
  return axios.create({
    baseURL: GITHUB_API,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
}

export async function getFollowers(
  accessToken: string,
  page = 1,
  perPage = 100
): Promise<GitHubUser[]> {
  const client = createClient(accessToken);
  const { data } = await client.get<GitHubUser[]>(
    `/user/followers?page=${page}&per_page=${perPage}`
  );
  return data;
}

export async function getFollowing(
  accessToken: string,
  page = 1,
  perPage = 100
): Promise<GitHubUser[]> {
  const client = createClient(accessToken);
  const { data } = await client.get<GitHubUser[]>(
    `/user/following?page=${page}&per_page=${perPage}`
  );
  return data;
}

export async function unfollowUser(
  accessToken: string,
  username: string
): Promise<void> {
  const client = createClient(accessToken);
  await client.delete(`/user/following/${username}`);
}

export async function getAllFollowers(
  accessToken: string
): Promise<GitHubUser[]> {
  const all: GitHubUser[] = [];
  let page = 1;
  let batch: GitHubUser[];

  do {
    batch = await getFollowers(accessToken, page);
    all.push(...batch);
    page++;
  } while (batch.length === 100);

  return all;
}

export async function getAllFollowing(
  accessToken: string
): Promise<GitHubUser[]> {
  const all: GitHubUser[] = [];
  let page = 1;
  let batch: GitHubUser[];

  do {
    batch = await getFollowing(accessToken, page);
    all.push(...batch);
    page++;
  } while (batch.length === 100);

  return all;
}
