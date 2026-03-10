import React, { useMemo } from "react";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import RewardHeader from "./header";
import {
  setActiveReward,
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleCreateDrawer,
  toggleDetailDrawer,
} from "../../store/rewardsSlice";
import RewardsFilterBar from "./filterbar";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import RewardsListing from "./Listing";
import RewardDetail from "./Detail";
import CreateReward from "./Composer/CreateReward";

const RewardsPage = () => {
  const dispatch = useDispatch();
  const {
    rewards,
    activeTab,
    viewMode,
    searchQuery,
    activeRewardId,
    isCreateDrawerOpen,
    isDetailDrawerOpen,
  } = useSelector((s) => s.rewards);

  const filtered = useMemo(() => {
    return rewards.filter((r) => {
      let matchTab = true;
      if (activeTab === "approvals") {
        matchTab = r.status === "Pending" || r.status === "In Process";
      } else if (activeTab === "my") {
        matchTab = r.status === "Approved" || r.status === "Declined";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        r.recipientName.toLowerCase().includes(q) ||
        r.rewardId.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.recipientRole.toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [rewards, activeTab, searchQuery]);

  const selectedReward = rewards.find((r) => r.id === activeRewardId) || null;

  const handleCardClick = (id) => {
    dispatch(setActiveReward(id));
    dispatch(toggleDetailDrawer(true));
  };

  return (
    <TableContainer>
      {/* Header */}
      <RewardHeader onCreateReward={() => dispatch(toggleCreateDrawer(true))} />

      <RewardsFilterBar
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        searchValue={searchQuery}
        onSearchChange={(v) => dispatch(setSearchQuery(v))}
        viewMode={viewMode}
        onViewModeChange={(v) => dispatch(setViewMode(v))}
        filteredCount={filtered.length}
        totalCount={rewards.length}
      />

      {/* body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        <RewardsListing
          viewMode={viewMode}
          rewards={filtered}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Detail drawer */}
      <SideDrawer
        visible={isDetailDrawerOpen}
        onClose={() => dispatch(toggleDetailDrawer(false))}
        title="Reward Details"
        width={520}
      >
        <RewardDetail reward={selectedReward} />
      </SideDrawer>

      {/* Create Reward drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Reward"
        width={480}
      >
        <CreateReward visible={isCreateDrawerOpen} />
      </SideDrawer>
    </TableContainer>
  );
};

export default RewardsPage;
