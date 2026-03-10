import { useMemo } from "react";
import { Badge, Button, Select } from "antd";
import {
  FileTextOutlined,
  PlusOutlined,
  BellOutlined,
  DownloadOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { TableContainer } from "../../../../sharedComponents/MainFlexContainer";
import HeaderBar from "../../../../sharedComponents/header/view";
import {
  setSearchQuery,
  setSortBy,
  setSortOrder,
  toggleCreateDrawer,
} from "../../store/pagesSlice";
import SideDrawer from "../../../../sharedComponents/SharedDrawer";
import PagesListing from "./Listing";
import CreatePage from "./composer/CreatePage";

const SCHOOL_BLUE = "rgb(82,107,177)";
const SCHOOL_PINK = "rgb(232,19,123)";

const SORT_OPTIONS = [
  { value: "updateDate-desc", label: "Update Date - Desc" },
  { value: "updateDate-asc",  label: "Update Date - Asc"  },
  { value: "createDate-desc", label: "Create Date - Desc" },
  { value: "name-asc",        label: "Name A - Z"         },
];

const PagesPage = () => {
  const dispatch = useDispatch();
  const { pages, searchQuery, sortBy, sortOrder, isCreateDrawerOpen } = useSelector(
    (s) => s.pages
  );

  /* ── filter by search ── */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return pages;
    return pages.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }, [pages, searchQuery]);

  /* ── sort ── */
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "name") {
      arr.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "updateDate") {
      arr.sort((a, b) =>
        sortOrder === "desc"
          ? new Date(b.updateDate) - new Date(a.updateDate)
          : new Date(a.updateDate) - new Date(b.updateDate)
      );
    } else if (sortBy === "createDate") {
      arr.sort((a, b) =>
        sortOrder === "desc"
          ? new Date(b.createDate) - new Date(a.createDate)
          : new Date(a.createDate) - new Date(b.createDate)
      );
    }
    return arr;
  }, [filtered, sortBy, sortOrder]);

  /* ── header extra actions ── */
  const headerExtra = (
    <div className="flex items-center gap-2">
      {/* Bell with badge */}
      <Badge count={3} style={{ backgroundColor: SCHOOL_PINK }}>
        <Button
          shape="circle"
          icon={<BellOutlined style={{ fontSize: 15 }} />}
          type="text"
          style={{ color: "#6b7280" }}
        />
      </Badge>

      {/* Sort dropdown */}
      <Select
        value={`${sortBy}-${sortOrder}`}
        options={SORT_OPTIONS}
        onChange={(v) => {
          const dashIdx = v.lastIndexOf("-");
          const sb = v.slice(0, dashIdx);
          const so = v.slice(dashIdx + 1);
          dispatch(setSortBy(sb));
          dispatch(setSortOrder(so));
        }}
        style={{
          width: 180,
          fontFamily: "Montserrat, sans-serif",
          fontSize: 13,
        }}
        size="middle"
      />

      {/* Export button */}
      <Button
        icon={<DownloadOutlined />}
        style={{
          borderRadius: 8,
          fontFamily: "Montserrat, sans-serif",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        Export <DownOutlined style={{ fontSize: 10 }} />
      </Button>
    </div>
  );

  return (
    <TableContainer>
      {/* Header */}
      <HeaderBar
        title="Pages"
        icon={<FileTextOutlined style={{ fontSize: 18 }} />}
        buttonTitle="Create Page"
        onButtonClick={() => dispatch(toggleCreateDrawer(true))}
        extra={headerExtra}
      />

      {/* Body — table only, no filter bar */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        <PagesListing pages={sorted} loading={false} />
      </div>

      {/* Create Page drawer */}
      <SideDrawer
        visible={isCreateDrawerOpen}
        onClose={() => dispatch(toggleCreateDrawer(false))}
        title="Create Page"
        width={480}
      >
        <CreatePage />
      </SideDrawer>
    </TableContainer>
  );
};

export default PagesPage;
