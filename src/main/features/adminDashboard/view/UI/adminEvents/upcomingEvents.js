import React from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Calendar, Divider, Avatar, Button, Card } from "antd";

const UpcomingEvents = () => {
  const events = [
    {
      title: "Parents, Teacher Meet",
      date: "July 15, 2024",
      time: "09:10 AM - 10:50 PM",
      Icon: Users,
      color: "bg-vivid-cerise/10 text-vivid-cerise",
      attendees: ["Sania", "Hassan", "Talha"],
    },
    {
      title: "Vacation Planning Session",
      date: "July 07, 2024",
      time: "09:10 AM - 10:50 PM",
      Icon: Clock,
      color: "bg-medium-turquoise/10 text-medium-turquoise",
      attendees: ["Ayesha", "Noman"],
    },
    {
      title: "Team Project Kickoff",
      date: "July 20, 2024",
      time: "02:00 PM - 03:00 PM",
      Icon: CalendarIcon,
      color: "bg-blue-hosta/10 text-blue-hosta",
      attendees: ["Imran", "Sadaf", "Usman", "Hamza"],
    },
  ];

  const EventItem = ({ title, date, time, Icon, color, attendees }) => {
    const visible = attendees.slice(0, 3);
    const remaining = attendees.length - 3;

    return (
      <div className="flex items-start gap-4 p-4 bg-white border rounded-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
        {/* Icon */}
        <div className={`p-3 rounded-md flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>

        {/* Event content */}
        <div className="flex-1">
          <h5 className="text-sm font-semibold text-waikawa-grey">{title}</h5>

          <div className="text-xs text-gray-600 mt-1 space-y-1">
            <div className="flex items-center gap-1">
              <CalendarIcon size={12} /> {date}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} /> {time}
            </div>
          </div>
        </div>

        {/* Avatars */}
        <div className="flex -space-x-3">
          {visible.map((name, i) => (
            <Avatar
              key={i}
              size={26}
              className="border-2 border-white bg-waikawa-grey text-white"
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
          ))}

          {remaining > 0 && (
            <Avatar
              size={26}
              className="border-2 border-white bg-gray-200 text-gray-600"
            >
              +{remaining}
            </Avatar>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card
      bordered
      className="rounded-md shadow-sm"
      title={<h2 className="text-lg font-semibold text-black-olive">Schedules</h2>}
      extra={
        <Button
          type="primary"
          className="bg-waikawa-grey border-none hover:bg-waikawa-grey/90"
        >
          Add New Event
        </Button>
      }
    >
      {/* Calendar */}
      <Calendar
        fullscreen={false}
        className="rounded-md"
        headerRender={({ value, onChange }) => (
          <div className="flex items-center justify-between px-3 pb-2">
            <button onClick={() => onChange(value.clone().subtract(1, "month"))}>
              <ChevronLeft size={18} />
            </button>

            <h3 className="text-base font-semibold text-waikawa-grey">
              {value.format("MMMM YYYY")}
            </h3>

            <button onClick={() => onChange(value.clone().add(1, "month"))}>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      />

      <Divider />

      <h3 className="text-base font-semibold text-waikawa-grey mb-3">
        Upcoming Events
      </h3>

      <div className="flex flex-col gap-4">
        {events.map((ev, i) => (
          <EventItem key={i} {...ev} />
        ))}
      </div>
    </Card>
  );
};

export default UpcomingEvents;
