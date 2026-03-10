import React, { useMemo } from "react";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import { useDispatch, useSelector } from "react-redux";
import ComplaintHeader from "./header";
import {
  setActiveComplaint,
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleCreateDrawer,
  toggleDetailDrawer,
} from "../../store/complaintsSlice";
import ComplaintsFilterBar from "./filterbar";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import ComplaintsListing from "./Listing";
import ComplaintDetail from "./Detail";
import CreateComplaint from "./Composer/CreateComplaint";

const ComplaintsPage = () => {
  const dispatch = useDispatch();
  const {
    complaints,
    activeTab,
    viewMode,
    searchQuery,
    activeComplaintId,
    isCreateDrawerOpen,
    isDetailDrawerOpen,
  } = useSelector((s) => s.complaints);

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      let matchTab = true;
      if (activeTab === "approvals") {
        matchTab = c.status === "Pending" || c.status === "In Process";
      } else if (activeTab === "my") {
        matchTab = c.status === "Approved" || c.status === "Declined";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        c.recipientName.toLowerCase().includes(q) ||
        c.complaintId.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.complainOf?.name || "").toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [complaints, activeTab, searchQuery]);

  const selectedComplaint = complaints.find((c) => c.id === activeComplaintId) || null;

  const handleCardClick = (id) => {
    dispatch(setActiveComplaint(id));
    dispatch(toggleDetailDrawer(true));
  };

  return (
    <TableContainer>
      {/* Header */}
      <ComplaintHeader onCreateComplaint={() => dispatch(toggleCreateDrawer(true))} />

      <ComplaintsFilterBar
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        searchValue={searchQuery}
        onSearchChange={(v) => dispatch(setSearchQuery(v))}
        viewMode={viewMode}
        onViewModeChange={(v) => dispatch(setViewMode(v))}
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
        <ComplaintsListing
          viewMode={viewMode}
          complaints={filtered}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Detail drawer */}
      <SideDrawer
        visible={isDetailDrawerOpen}
        onClose={() => dispatch(toggleDetailDrawer(false))}
        title="Complaint Details"
        width={520}
      >
        <ComplaintDetail complaint={selectedComplaint} />
      </SideDrawer>

      {/* Create Complaint drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Complaint"
        width={480}
      >
        <CreateComplaint />
      </SideDrawer>
    </TableContainer>
  );
};

export default ComplaintsPage;
