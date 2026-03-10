import UpcomingEvents from "./adminEvents/upcomingEvents";
import QuickActions from "./adminEvents/quickActions";
import AttendanceChart from "./adminEvents/attendanceChart";
import ProfileAndPerformance from "./profileAndPerformance";
import StudentPerformance from "./adminEvents/studentPerformance";

const AdminEvents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Column 1 */}
      <div className="h-full">
        <UpcomingEvents />
      </div>

      {/* Column 2
       */}
      <div className="flex flex-col gap-6 h-full">
        {/* AttendanceChart — auto height */}
        <AttendanceChart />

        {/* Profile full height filler */}
        <div className="flex-1">
          <ProfileAndPerformance />
        </div>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-6 h-full">
        <QuickActions />

        <div className="flex-1 flex flex-col">
          <StudentPerformance />
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
