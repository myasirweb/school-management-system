import student from "../../../../../assets/images/main-dashboard-icon/student.svg";
import teacher from "../../../../../assets/images/main-dashboard-icon/teacher.svg";
import staff from "../../../../../assets/images/main-dashboard-icon/staff.svg";
import subject from "../../../../../assets/images/main-dashboard-icon/subject.svg";

const statsData = [
  {
    title: "Total Students",
    count: "3,654",
    active: 3643,
    inactive: 11,
    icon: student,
    color: "#DA1D81",
    trend: "1.2%",
  },
  {
    title: "Total Teachers",
    count: "284",
    active: 254,
    inactive: 30,
    icon: teacher,
    color: "#45C6EE",
    trend: "1.2%",
  },
  {
    title: "Total Staff",
    count: "162",
    active: 161,
    inactive: 2,
    icon: staff,
    color: "#FED33C",
    trend: "1.2%",
  },
  {
    title: "Total Subjects",
    count: "82",
    active: 81,
    inactive: 1,
    icon: subject,
    color: "#64C4B2",
    trend: "1.2%",
  },
];

export default function StatsCards() {
  return (
    <div className="bg-gray-50 p-2 font-sans mt-2 mb-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden 
            transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
          >
            {/* TOP */}
            <div className="px-5 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon Box */}
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stat.color}22` }} // <<< FIXED
                >
                  <img src={stat.icon} alt="icon" className="w-11 h-11" />
                </div>

                {/* Text */}
                <div className="leading-tight">
                  <h3
                    className="text-[22px] font-medium"
                    style={{ color: "#202c4b" }}
                  >
                    {stat.count}
                  </h3>
                  <p className="text-[15px] font-normal text-gray-500">
                    {stat.title}
                  </p>
                </div>
              </div>

              {/* Trend Badge */}
              <div
                className="px-2 py-1 text-[10px] font-medium text-white rounded"
                style={{ backgroundColor: stat.color }} // <<< FIXED
              >
                {stat.trend}
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full"></div>

            {/* BOTTOM */}
            <div className="px-5 py-3 flex items-center justify-between text-[14px]">
              <div className="flex items-center gap-1">
                <span className="text-gray-400 font-normal">Active:</span>
                <span className="font-semibold" style={{ color: "#202c4b" }}>
                  {stat.active}
                </span>
              </div>

              <div className="h-4 w-px bg-gray-200"></div>

              <div className="flex items-center gap-1">
                <span className="text-gray-400 font-normal">Inactive:</span>
                <span className="font-semibold" style={{ color: "#202c4b" }}>
                  {String(stat.inactive).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
