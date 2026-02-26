import React, { useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { AuthSection } from '../components/dashboard/AuthSection';
import { StatsSection } from '../components/dashboard/StatsSection';
import { ManagerTabs } from '../components/dashboard/ManagerTabs';
import { FollowersSearch } from '../components/dashboard/FollowersSearch';
import { UserItem } from '../components/dashboard/UserItem';
import { BulkStatusBar } from '../components/dashboard/BulkStatusBar';
import { useGitHubManager } from '../hooks/useGitHubManager';
import { useFollowersSearch } from '../hooks/useFollowersSearch';
import { Filter, SortAsc } from 'lucide-react';
import { UserItemSkeleton, StatCardSkeleton } from '../components/ui/Skeleton';
import { UserProfileModal } from '../components/ui/UserProfileModal';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const HomePage: React.FC = () => {
  const {
    following,
    followers,
    nonMutual,
    fans,
    isAnalyzing,
    progress,
    progressLabel,
    bulkStatus,
    analyze,
    handleAction,
    handleBulkAction,
    stopBulkAction,
    reset
  } = useGitHubManager();

  const [activeTab, setActiveTab] = useState<'nonMutual' | 'fans' | 'search'>('nonMutual');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'alpha' | 'z' | 'pending'>('pending');
  const [token, setToken] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const search = useFollowersSearch(token);

  const handleAnalyzeWithToken = async (t: string, u: string) => {
    setToken(t);
    try {
      await analyze(t, u);
      toast.success('Analysis complete');
    } catch (err) {
      toast.error('Analysis failed', {
        description: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  };

  const filteredData = useMemo(() => {
    const data = activeTab === 'nonMutual' ? nonMutual : fans;
    const list = data.filter(u => 
      u.login.toLowerCase().includes(filter.toLowerCase()) || 
      (u.name || '').toLowerCase().includes(filter.toLowerCase())
    );

    if (sortBy === 'alpha') list.sort((a, b) => a.login.localeCompare(b.login));
    if (sortBy === 'z') list.sort((a, b) => b.login.localeCompare(a.login));
    if (sortBy === 'pending') {
      list.sort((a, b) => {
        if (a.state === 'done' && b.state !== 'done') return 1;
        if (a.state !== 'done' && b.state === 'done') return -1;
        return 0;
      });
    }

    return list;
  }, [activeTab, nonMutual, fans, filter, sortBy]);

  const stats = useMemo(() => {
    const pendingNonMutual = nonMutual.filter(u => u.state !== 'done').length;
    const pendingFans = fans.filter(u => u.state !== 'done').length;
    const mutual = following.length - nonMutual.length;

    return {
      following: following.length,
      followers: followers.length,
      mutual,
      nonMutual: pendingNonMutual,
      fans: pendingFans
    };
  }, [following, followers, nonMutual, fans]);

  const hasData = following.length > 0 || followers.length > 0;

  return (
    <div className="app-container">
      <Header />
      
      <AuthSection 
        onAnalyze={handleAnalyzeWithToken}
        onReset={() => { reset(); setToken(''); }}
        isLoading={isAnalyzing}
        progress={progress}
        progressLabel={progressLabel}
      />

      {isAnalyzing && !hasData && (
        <div className="results-section">
          <div className="stats-grid">
             {[1, 2, 3, 4, 5].map(i => <StatCardSkeleton key={i} />)}
          </div>
          <div className="manager-section">
             <div className="user-list">
                {[1, 2, 3].map(i => <UserItemSkeleton key={i} />)}
             </div>
          </div>
        </div>
      )}

      {hasData && (
        <div className="results-section">
          <StatsSection {...stats} />

          <div className="manager-section">
            {activeTab === 'search' ? (
              <BulkStatusBar 
                current={search.bulkStatus.current}
                total={search.bulkStatus.active ? search.bulkStatus.total : search.followers.filter(u => u.state !== 'done').length}
                isActive={search.bulkStatus.active}
                onStop={search.stopBulkFollow}
                onStart={() => {
                  toast.promise(search.handleBulkFollow(), {
                    loading: 'Bulk following...',
                    success: 'Bulk follow action finished',
                    error: 'Bulk action failed'
                  });
                }}
                type="follow"
              />
            ) : (
              <BulkStatusBar 
                current={bulkStatus.current}
                total={bulkStatus.active ? bulkStatus.total : (activeTab === 'nonMutual' ? nonMutual.filter(u => u.state !== 'done').length : fans.filter(u => u.state !== 'done').length)}
                isActive={bulkStatus.active}
                onStop={stopBulkAction}
                onStart={() => {
                  toast.promise(handleBulkAction(token, activeTab as 'nonMutual' | 'fans'), {
                    loading: `Bulk ${activeTab === 'nonMutual' ? 'unfollowing' : 'following'}...`,
                    success: 'Bulk action finished',
                    error: 'Bulk action failed'
                  });
                }}
                type={activeTab === 'nonMutual' ? 'unfollow' : 'follow'}
              />
            )}

            <ManagerTabs 
              activeTab={activeTab}
              onTabChange={(t) => { setActiveTab(t); setFilter(''); }}
              nonMutualCount={stats.nonMutual}
              fansCount={stats.fans}
            />

            {activeTab === 'search' ? (
              <FollowersSearch 
                onViewProfile={(login) => setSelectedUser(login)}
                followers={search.followers}
                isSearching={search.isSearching}
                searchProgress={search.searchProgress}
                searchProgressLabel={search.searchProgressLabel}
                bulkStatus={search.bulkStatus}
                searchAccount={search.searchAccount}
                handleFollowAction={search.handleFollowAction}
              />
            ) : (
              <>
                <div className="controls-row">
                  <div className="filter-box">
                    <Filter size={16} />
                    <input 
                      type="text" 
                      placeholder="Filter users..." 
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>

                  <div className="sort-box">
                    <SortAsc size={16} />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'alpha' | 'z' | 'pending')}>
                      <option value="pending">Pending First</option>
                      <option value="alpha">A-Z</option>
                      <option value="z">Z-A</option>
                    </select>
                  </div>
                </div>

                <div className="user-list">
                  {filteredData.length > 0 ? (
                    filteredData.map((user, idx) => (
                      <UserItem 
                        key={user.login}
                        user={user}
                        index={idx}
                        onAction={(login) => handleAction(
                          token, 
                          login, 
                          activeTab === 'nonMutual' ? 'unfollow' : 'follow', 
                          activeTab
                        )}
                        onViewProfile={(login) => setSelectedUser(login)}
                        actionLabel={activeTab === 'nonMutual' ? 'Unfollow' : 'Follow Back'}
                        badgeLabel={activeTab === 'nonMutual' ? 'Not Following' : 'Fan'}
                        badgeType={activeTab === 'nonMutual' ? 'danger' : 'success'}
                      />
                    ))
                  ) : (
                    <div className="empty-state">
                      <h3>No users found</h3>
                      <p>Adjust your filter or switch tabs</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedUser && (
          <UserProfileModal 
            login={selectedUser} 
            token={token} 
            onClose={() => setSelectedUser(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
