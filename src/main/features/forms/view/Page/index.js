import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import {
  setActiveForm,
  setActiveTab,
  setSearchQuery,
  setViewMode,
  toggleDetailDrawer,
} from "../../store/formsSlice";
import FormsHeader from "./header";
import FormsFilterBar from "./filterbar";
import FormsListing from "./Listing";
import FormDetail from "./Detail";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";

const FormsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    forms,
    activeTab,
    viewMode,
    searchQuery,
    activeFormId,
    isDetailDrawerOpen,
  } = useSelector((s) => s.forms);

  const filtered = useMemo(() => {
    return forms.filter((f) => {
      let matchTab = true;
      if (activeTab === "createdByMe") {
        matchTab = f.creatorRole === "Administrator" || f.creatorRole === "Chief Executive Officer (CEO)";
      } else if (activeTab === "forApproval") {
        matchTab = f.status === "For Review" || f.status === "In Process";
      } else if (activeTab === "forReview") {
        matchTab = f.status === "For Review";
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.formId.toLowerCase().includes(q) ||
        f.creatorName.toLowerCase().includes(q) ||
        (f.description && f.description.toLowerCase().includes(q));

      return matchTab && matchSearch;
    });
  }, [forms, activeTab, searchQuery]);

  const selectedForm = forms.find((f) => f.id === activeFormId) || null;

  const handleCardClick = (id) => {
    dispatch(setActiveForm(id));
    dispatch(toggleDetailDrawer(true));
  };

  return (
    <TableContainer>
      {/* Header */}
      <FormsHeader onCreateForm={() => navigate("/forms/create")} />

      {/* Filter Bar */}
      <FormsFilterBar
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        searchValue={searchQuery}
        onSearchChange={(v) => dispatch(setSearchQuery(v))}
        viewMode={viewMode}
        onViewModeChange={(v) => dispatch(setViewMode(v))}
      />

      {/* Body */}
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
        <FormsListing
          forms={filtered}
          viewMode={viewMode}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Detail Drawer */}
      <SideDrawer
        visible={isDetailDrawerOpen}
        onClose={() => dispatch(toggleDetailDrawer(false))}
        title="Form Details"
        width={480}
      >
        <FormDetail form={selectedForm} />
      </SideDrawer>
    </TableContainer>
  );
};

export default FormsPage;
