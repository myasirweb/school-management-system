import React from "react";
import { Button, Breadcrumb, Divider } from "antd";
import { ArrowLeft, Clock, MapPin, User, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { scheduleEvents } from "../../../utils/dummySchedule";


const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const event = scheduleEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="p-6 bg-white rounded-lg border text-center">
        <p className="text-gray-600">Event not found</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const eventTypeColors = {
    class: { bg: "#f0fdfb", border: "var(--blue-hosta)", label: "Class" },
    exam: { bg: "#fdf2f8", border: "var(--vivid-cerise)", label: "Exam" },
    break: { bg: "#f0fef9", border: "var(--medium-turquoise)", label: "Break" },
    assignment: { bg: "#f3f4ff", border: "var(--RoyalBlue)", label: "Assignment" },
    holiday: { bg: "#fffbf0", border: "var(--bright-sun)", label: "Holiday" },
    event: { bg: "#f8f9ff", border: "var(--waikawa-grey)", label: "Event" },
  };

  const eventType = eventTypeColors[event.type] || eventTypeColors.event;

  return (
    <div className="space-y-5">
      <Button type="text" icon={<ArrowLeft size={18} />} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Breadcrumb
        items={[
          { title: "Home" },
          { title: "Class Schedule", onClick: () => navigate("/class-schedule") },
          { title: event.subject },
        ]}
      />

      {/* Event Header */}
      <div
        className="rounded-lg p-6 border-l-4"
        style={{ backgroundColor: eventType.bg, borderColor: eventType.border }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{event.subject}</h1>
            <p
              className="text-sm mt-1"
              style={{ color: eventType.border }}
            >
              {eventType.label}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        {event.time && (
          <div className="flex items-center gap-3">
            <Clock size={20} style={{ color: "var(--RoyalBlue)" }} />
            <div>
              <div className="text-xs text-gray-600">Time</div>
              <div className="font-semibold text-gray-900">{event.time}</div>
            </div>
          </div>
        )}

        {event.teacher && (
          <>
            <Divider className="my-3" />
            <div className="flex items-center gap-3">
              <User size={20} style={{ color: "var(--blue-hosta)" }} />
              <div>
                <div className="text-xs text-gray-600">Instructor</div>
                <div className="font-semibold text-gray-900">{event.teacher}</div>
              </div>
            </div>
          </>
        )}

        {event.room && (
          <>
            <Divider className="my-3" />
            <div className="flex items-center gap-3">
              <MapPin size={20} style={{ color: "var(--medium-turquoise)" }} />
              <div>
                <div className="text-xs text-gray-600">Location</div>
                <div className="font-semibold text-gray-900">{event.room}</div>
              </div>
            </div>
          </>
        )}

        {event.description && (
          <>
            <Divider className="my-3" />
            <div className="flex gap-3">
              <FileText size={20} style={{ color: "var(--RoyalBlue)" }} />
              <div>
                <div className="text-xs text-gray-600">Description</div>
                <div className="text-gray-900">{event.description}</div>
              </div>
            </div>
          </>
        )}

        {event.dueDate && (
          <>
            <Divider className="my-3" />
            <div className="flex items-center gap-3">
              <Clock size={20} style={{ color: "var(--vivid-cerise)" }} />
              <div>
                <div className="text-xs text-gray-600">Due Date</div>
                <div className="font-semibold text-gray-900">
                  {new Date(event.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button onClick={() => navigate(-1)}>Close</Button>
        <Button type="primary" style={{ backgroundColor: "var(--RoyalBlue)" }}>
          Add to My Calendar
        </Button>
      </div>
    </div>
  );
};

export default EventDetailPage;
