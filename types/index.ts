export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface NonFollower extends GitHubUser {
  isUnfollowed?: boolean;
}

// Augment next-auth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      githubId: string;
      username: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    githubId?: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubId?: string;
    username?: string;
  }
}
