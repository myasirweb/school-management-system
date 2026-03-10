import React, { useMemo } from 'react'
import { TableContainer } from '../../../../sharedComponents/MainFlexContainer'
import { useDispatch, useSelector } from 'react-redux';
import LeavesHeader from './header';
import { setActiveLeave, setActiveTab, setSearchQuery, setViewMode, toggleCreateDrawer, toggleDetailDrawer } from '../../store/slice';
import LeavesFilterBar from './filterbar';
import SideDrawer from '../../../../sharedComponents/SharedDrawer';
import LeavesListing from './Listing';
import LeaveDetail from './Detail';
import CreateLeave from './Composer/CreateLeave';

const LeavePage = () => {
      const dispatch = useDispatch();
        const {
    leaves,
    activeTab,
    viewMode,
    searchQuery,
    activeLeaveId,
    isCreateDrawerOpen,
    isDetailDrawerOpen,
  } = useSelector((s) => s.leaves);

    const filtered = useMemo(() => {
      return leaves.filter((l) => {
        let matchTab = true;
        if (activeTab === "approvals") {
          matchTab = l.status === "pending" || l.status === "in-process";
        } else if (activeTab === "my") {
          matchTab = l.status === "approved" || l.status === "declined";
        }
  
        const q = searchQuery.toLowerCase();
        const matchSearch =
          !q ||
          l.applicantName.toLowerCase().includes(q) ||
          l.leaveId.toLowerCase().includes(q) ||
          l.leaveType.toLowerCase().includes(q) ||
          l.applicantRole.toLowerCase().includes(q);
  
        return matchTab && matchSearch;
      });
    }, [leaves, activeTab, searchQuery]);


  const selectedLeave = leaves.find((l) => l.id === activeLeaveId) || null;

      const handleCardClick = (id) => {
        dispatch(setActiveLeave(id));
        dispatch(toggleDetailDrawer(true));
      };


  return (
    <TableContainer>
         {/* Header */}
       <LeavesHeader onCreateLeave={() => dispatch(toggleCreateDrawer(true))} />

         <LeavesFilterBar
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        searchValue={searchQuery}
        onSearchChange={(v) => dispatch(setSearchQuery(v))}
        viewMode={viewMode}
        onViewModeChange={(v) => dispatch(setViewMode(v))}
        filteredCount={filtered.length}
        totalCount={leaves.length}
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
        <LeavesListing
          viewMode={viewMode}
          leaves={filtered}
          onCardClick={handleCardClick}
        />
      </div>



    {/* Detail drawer */}
        <SideDrawer
        visible={isDetailDrawerOpen}
        onClose={() => dispatch(toggleDetailDrawer(false))}
        title="Leave Details"
        width={520}
      >
        <LeaveDetail leave={selectedLeave} />

      </SideDrawer>

      {/* Create Leave drawer */}
       <SideDrawer
            visible={isCreateDrawerOpen}
            onClose={() => dispatch(toggleCreateDrawer(false))}
            title="Create Leave"
            width={480}
          >


      <CreateLeave visible={isCreateDrawerOpen} />

          </SideDrawer>

    </TableContainer>
  )
}

export default LeavePage
