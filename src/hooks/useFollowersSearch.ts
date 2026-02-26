import { useState, useCallback } from 'react';
import { GitHubService } from '../services/github';
import type { UserWithState, UserState, BulkStatus } from '../types/github';
import { toast } from 'sonner';

export const useFollowersSearch = (token: string) => {
  const [followers, setFollowers] = useState<UserWithState[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchProgressLabel, setSearchProgressLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [bulkStatus, setBulkStatus] = useState<BulkStatus>({
    active: false,
    current: 0,
    total: 0,
    stopped: false
  });

  const searchAccount = useCallback(async (username: string) => {
    if (!token || !username) return;

    setIsSearching(true);
    setError(null);
    setSearchProgress(0);
    setSearchProgressLabel(`Searching for ${username}...`);
    setFollowers([]);

    const service = new GitHubService(token);

    try {
      const followersList = await service.getFollowers(username, (p, n) => {
        setSearchProgress(Math.min(p * 10, 100));
        setSearchProgressLabel(`Fetching followers... page ${p} (${n} users)`);
      });

      const listWithState = followersList.map(u => ({ ...u, state: 'idle' as UserState }));
      setFollowers(listWithState);
      setSearchProgress(100);
      setSearchProgressLabel(`Loaded ${followersList.length} followers of ${username}`);
      toast.success(`Search completed for ${username}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during search');
      setSearchProgress(0);
      toast.error('Search failed');
    } finally {
      setIsSearching(false);
    }
  }, [token]);

  const handleFollowAction = useCallback(async (login: string) => {
    if (!token) return;
    const service = new GitHubService(token);

    setFollowers(prev => prev.map(u => u.login === login ? { ...u, state: 'loading' } : u));

    try {
      await service.follow(login);
      setFollowers(prev => prev.map(u => u.login === login ? { ...u, state: 'done' } : u));
    } catch (err: unknown) {
      setFollowers(prev => prev.map(u => u.login === login ? { ...u, state: 'error' } : u));
      const errMsg = err instanceof Error ? err.message : String(err);
      setError(`Failed to follow ${login}: ${errMsg}`);
      throw err;
    }
  }, [token]);

  const handleBulkFollow = useCallback(async () => {
    if (!token) return;
    const pending = followers.filter(u => u.state !== 'done');
    
    setBulkStatus({ active: true, current: 0, total: pending.length, stopped: false });

    for (let i = 0; i < pending.length; i++) {
      let isStopped = false;
      setBulkStatus(prev => {
        if (prev.stopped) isStopped = true;
        return prev;
      });
      if (isStopped) break;

      setBulkStatus(prev => ({ ...prev, current: i + 1 }));

      try {
        await handleFollowAction(pending[i].login);
      } catch (err) { // Changed 'e' to 'err'
        console.error(err); // Removed string literal, now logs the error object directly
        toast.error('Bulk follow item failed'); // Added toast notification for bulk item failure
      }
      
      await new Promise(r => setTimeout(r, 700));
    }

    setBulkStatus(prev => ({ ...prev, active: false }));
  }, [token, followers, handleFollowAction]);

  const stopBulkFollow = useCallback(() => {
    setBulkStatus(prev => ({ ...prev, stopped: true }));
  }, []);

  return {
    followers,
    isSearching,
    searchProgress,
    searchProgressLabel,
    bulkStatus,
    error,
    searchAccount,
    handleFollowAction,
    handleBulkFollow,
    stopBulkFollow
  };
};
