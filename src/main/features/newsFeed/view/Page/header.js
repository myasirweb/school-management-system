import TopIcons from "../../../../sharedComponents/header/view/UI/TopIcons";
import ProfileBox from "../../../../sharedComponents/header/view/UI/ProfileBox";

const FILTER_TABS = [
  { key: "posts",     label: "Posts"     },
  { key: "photos",    label: "Photos"    },
  { key: "polls",     label: "Polls"     },
  { key: "documents", label: "Documents" },
  { key: "tagged",    label: "Tagged"    },
];

const NewsFeedHeader = ({ activeFilter, onChange }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100 px-5 flex items-center justify-between shadow-sm">
      {/* Filter tabs — replace title */}
      <div className="flex items-stretch h-full">
        {FILTER_TABS.map(({ key, label }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-[rgb(82,107,177)] text-[rgb(82,107,177)] font-semibold"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Right side — icons + profile */}
      <div className="flex items-center gap-4">
        <TopIcons />
        <ProfileBox />
      </div>
    </header>
  );
};

export default NewsFeedHeader;
