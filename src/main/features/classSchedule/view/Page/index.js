import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge, Button, Calendar as AntCalendar, Checkbox,
  DatePicker, Divider, Drawer, Form, Input, Modal, Popover,
  Radio, Select, Tag, TimePicker, Tooltip,
} from "antd";
import {
  LeftOutlined, RightOutlined, PlusOutlined, ClockCircleOutlined,
  EnvironmentOutlined, UserOutlined, FileTextOutlined, BellOutlined,
  SearchOutlined, ShareAltOutlined, DownOutlined, InboxOutlined,
  PaperClipOutlined, CalendarOutlined, SendOutlined,
  CheckOutlined, CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  setEvents, addEvent, setActiveView, setActiveDate, setSidebarEventTab,
  setSchedules, addSchedule, setActiveScheduleId, setActiveScheduleTab, setScheduleFilter,
  setActiveCalendarTab,
} from "../../store/calendarSlice";
import {
  seedCalendar, getCalendarEventsFromStorage, saveCalendarEventsToStorage,
  seedSchedules, getSchedulesFromStorage,
} from "../../utils/calendarDummyData";

/* ══════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════ */
const EVENT_TYPE_CONFIG = {
  class:    { label: "Class",     color: "rgb(82,107,177)",  bg: "rgba(82,107,177,0.12)"  },
  exam:     { label: "Exam",      color: "rgb(232,19,123)",  bg: "rgba(232,19,123,0.12)"  },
  event:    { label: "Event",     color: "rgb(100,196,178)", bg: "rgba(100,196,178,0.12)" },
  holiday:  { label: "Holiday",   color: "rgb(247,212,71)",  bg: "rgba(247,212,71,0.15)"  },
  meeting:  { label: "Meeting",   color: "rgb(69,198,238)",  bg: "rgba(69,198,238,0.12)"  },
  homework: { label: "Homework",  color: "#8b5cf6",          bg: "rgba(139,92,246,0.12)"  },
  interview:{ label: "Interview", color: "rgb(82,107,177)",  bg: "rgba(82,107,177,0.12)"  },
};

const SCHEDULE_GRADIENTS = {
  meeting:   "linear-gradient(135deg, rgb(69,198,238), rgb(82,107,177))",
  exam:      "linear-gradient(135deg, rgb(232,19,123), rgb(130,0,80))",
  interview: "linear-gradient(135deg, rgb(82,107,177), rgb(100,196,178))",
  event:     "linear-gradient(135deg, rgb(100,196,178), rgb(69,198,238))",
  class:     "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
  homework:  "linear-gradient(135deg, #8b5cf6, #6d28d9)",
};

const FILE_COLORS = { pdf: "#ef4444", xlsx: "#22c55e", zip: "#f97316", docx: "#3b82f6" };
const FILE_LABELS = { pdf: "PDF", xlsx: "XLS", zip: "ZIP", docx: "DOC" };

const MEMBER_PALETTE = [
  "rgb(82,107,177)", "rgb(232,19,123)", "rgb(100,196,178)",
  "rgb(69,198,238)", "#8b5cf6", "rgb(247,150,71)",
];

const TIMEZONES = [
  { value: "Asia/Karachi",     label: "PKT (UTC+5)"  },
  { value: "Asia/Dubai",       label: "GST (UTC+4)"  },
  { value: "Europe/London",    label: "GMT (UTC+0)"  },
  { value: "America/New_York", label: "EST (UTC-5)"  },
  { value: "Asia/Tokyo",       label: "JST (UTC+9)"  },
];

const DAYS  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7→20
const SLOT_H = 40; // px per 30-min slot

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
const timeToMins  = (t) => { if (!t || t === "00:00" || t === "23:59") return 0; const [h,m] = t.split(":").map(Number); return h*60+m; };
const getTopOffset = (st) => Math.max(0, ((timeToMins(st) - 7*60) / 30) * SLOT_H);
const getEvtHeight = (st, et) => Math.max(24, ((timeToMins(et) - timeToMins(st)) / 30) * SLOT_H);
const formatHour   = (h) => `${h > 12 ? h-12 : h === 0 ? 12 : h} ${h >= 12 ? "PM" : "AM"}`;
const toDateStr    = (d) => d.toISOString().split("T")[0];
const isAllDay     = (e) => !e.startTime || e.startTime === "00:00";

const fmtTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h > 12 ? h-12 : h === 0 ? 12 : h}:${String(m).padStart(2,"0")} ${h >= 12 ? "PM" : "AM"}`;
};

const getMemberColor = (name) => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return MEMBER_PALETTE[Math.abs(h) % MEMBER_PALETTE.length];
};
const getInitials = (name) =>
  name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

const generateMonthCells = (year, month) => {
  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const prevMonthEnd = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ date: new Date(year, month-1, prevMonthEnd-i), current: false });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ date: new Date(year, month, d), current: true });
  const rem = 42 - cells.length;
  for (let d = 1; d <= rem; d++)
    cells.push({ date: new Date(year, month+1, d), current: false });
  return cells;
};

const getWeekDays = (dateObj) => {
  const sun = new Date(dateObj);
  sun.setDate(dateObj.getDate() - dateObj.getDay());
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(sun); d.setDate(sun.getDate()+i); return d; });
};

const layoutEvents = (evts) => {
  const sorted = [...evts].sort((a,b) => timeToMins(a.startTime) - timeToMins(b.startTime));
  const lanes = [];
  for (const evt of sorted) {
    let placed = false;
    for (let li = 0; li < lanes.length; li++) {
      const last = lanes[li][lanes[li].length - 1];
      if (timeToMins(evt.startTime) >= timeToMins(last.endTime)) { lanes[li].push(evt); placed = true; break; }
    }
    if (!placed) lanes.push([evt]);
  }
  const n = lanes.length || 1;
  return lanes.flatMap((lane, li) => lane.map(evt => ({ ...evt, _li: li, _n: n })));
};

/* ══════════════════════════════════════════════
   MONTH VIEW
══════════════════════════════════════════════ */
const MonthView = ({ events, activeDate, onDateClick, onEventClick }) => {
  const aDate   = new Date(activeDate + "T00:00:00");
  const cells   = generateMonthCells(aDate.getFullYear(), aDate.getMonth());
  const todayDs = toDateStr(new Date());
  const eventsForDate = (ds) => events.filter(e => e.date === ds);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100 shrink-0">
        {DAYS.map((day, i) => (
          <div key={day} className={`py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 ${i===0||i===6?"bg-gray-100/50":""}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-auto grid grid-cols-7" style={{ gridAutoRows: "minmax(110px, auto)" }}>
        {cells.map(({ date, current }, idx) => {
          const ds = toDateStr(date);
          const dayEvts   = eventsForDate(ds);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isToday   = ds === todayDs;
          const isSelected = ds === activeDate;
          return (
            <div key={idx}
              className={`border-b border-r border-gray-100 p-1.5 cursor-pointer transition-all hover:bg-blue-50/60 ${
                !current ? "bg-gray-50" : isWeekend ? "bg-gray-50/50" : isSelected ? "bg-blue-50/40" : "bg-white"
              }`}
              onClick={() => onDateClick(ds)}
            >
              <div className="flex justify-end mb-1">
                <span className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${isToday?"text-white":current?"text-gray-700":"text-gray-300"}`}
                  style={isToday ? { backgroundColor: "var(--color-blue)" } : {}}>
                  {date.getDate()}
                </span>
              </div>
              <div className="space-y-0.5">
                {dayEvts.slice(0, 3).map(evt => (
                  <Tooltip key={evt.id} title={<div className="text-xs"><div className="font-semibold">{evt.title}</div>{!isAllDay(evt)&&<div>{evt.startTime}–{evt.endTime}</div>}</div>}>
                    <div className="text-[11px] text-white px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-85 leading-tight"
                      style={{ backgroundColor: evt.color }}
                      onClick={e => { e.stopPropagation(); onEventClick(evt); }}>
                      {!isAllDay(evt) ? `${evt.startTime} ${evt.title}` : evt.title}
                    </div>
                  </Tooltip>
                ))}
                {dayEvts.length > 3 && (
                  <Popover
                    title={<span className="text-sm font-bold">{date.toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>}
                    content={
                      <div className="max-w-[220px] space-y-1.5 py-1">
                        {dayEvts.map(evt => (
                          <div key={evt.id} className="flex items-start gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer" onClick={() => onEventClick(evt)}>
                            <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: evt.color }} />
                            <div>
                              <div className="text-xs font-semibold text-gray-800">{evt.title}</div>
                              {!isAllDay(evt)&&<div className="text-[10px] text-gray-400">{evt.startTime}–{evt.endTime}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    }
                    trigger="click" placement="right"
                  >
                    <div className="text-[11px] font-semibold px-1.5 cursor-pointer hover:underline" style={{ color:"var(--color-blue)" }} onClick={e=>e.stopPropagation()}>
                      +{dayEvts.length - 3} more
                    </div>
                  </Popover>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   WEEK VIEW  (with current-time red line)
══════════════════════════════════════════════ */
const WeekView = ({ events, activeDate, onDateClick, onEventClick }) => {
  const aDate    = new Date(activeDate + "T00:00:00");
  const weekDays = getWeekDays(aDate);
  const todayDs  = toDateStr(new Date());
  const gridH    = HOURS.length * SLOT_H * 2; // 1120px

  const [nowTime, setNowTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNowTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const nowMins    = nowTime.getHours() * 60 + nowTime.getMinutes();
  const nowLineTop = ((nowMins - 7 * 60) / 30) * SLOT_H;
  const showLine   = nowLineTop >= 0 && nowLineTop <= gridH;

  const timedForDay  = (ds) => layoutEvents(events.filter(e => e.date === ds && !isAllDay(e)));
  const allDayForDay = (ds) => events.filter(e => e.date === ds && isAllDay(e));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Column headers */}
      <div className="flex shrink-0 border-b border-gray-100 bg-white">
        <div className="w-14 shrink-0 border-r border-gray-100" />
        {weekDays.map((day, i) => {
          const ds = toDateStr(day);
          const isToday   = ds === todayDs;
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          return (
            <div key={i} className={`flex-1 py-2 text-center border-l border-gray-100 cursor-pointer hover:bg-blue-50/50 transition-colors ${isWeekend?"bg-gray-50/60":""}`} onClick={() => onDateClick(ds)}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{day.toLocaleDateString("en-US",{weekday:"short"})}</div>
              <div className={`text-lg font-bold mx-auto w-8 h-8 flex items-center justify-center rounded-full mt-0.5 ${isToday?"text-white":"text-gray-700"}`}
                style={isToday ? { backgroundColor:"var(--color-blue)" } : {}}>
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* All-day row */}
      {weekDays.some(d => allDayForDay(toDateStr(d)).length > 0) && (
        <div className="flex shrink-0 border-b border-gray-100 bg-gray-50/40">
          <div className="w-14 shrink-0 border-r border-gray-100 flex items-center justify-end pr-2">
            <span className="text-[9px] text-gray-400 uppercase tracking-wide">All day</span>
          </div>
          {weekDays.map((day, i) => (
            <div key={i} className="flex-1 border-l border-gray-100 px-0.5 py-0.5 space-y-0.5">
              {allDayForDay(toDateStr(day)).map(evt => (
                <div key={evt.id} className="text-[10px] text-white px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-85"
                  style={{ backgroundColor: evt.color }} onClick={() => onEventClick(evt)}>
                  {evt.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="flex" style={{ height: gridH, minHeight: gridH }}>
          {/* Time labels */}
          <div className="w-14 shrink-0 border-r border-gray-100 relative">
            {HOURS.map((h, i) => (
              <div key={h} className="absolute text-[10px] text-gray-400 text-right pr-2 leading-none" style={{ top: i * SLOT_H * 2 - 6 }}>
                {formatHour(h)}
              </div>
            ))}
          </div>
          {/* Day columns */}
          {weekDays.map((day, ci) => {
            const ds        = toDateStr(day);
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            const dayEvts   = timedForDay(ds);
            return (
              <div key={ci} className={`flex-1 relative border-l border-gray-100 ${isWeekend?"bg-gray-50/30":""}`}>
                {HOURS.map((h, i) => (
                  <div key={h}     className="absolute w-full border-t border-gray-100" style={{ top: i * SLOT_H * 2 }} />
                ))}
                {HOURS.map((h, i) => (
                  <div key={`h${h}`} className="absolute w-full border-t border-gray-50"  style={{ top: i * SLOT_H * 2 + SLOT_H }} />
                ))}
                {/* Current time line */}
                {ds === todayDs && showLine && (
                  <div className="absolute w-full flex items-center" style={{ top: nowLineTop, zIndex: 20 }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" style={{ marginLeft: -5 }} />
                    <div className="flex-1 h-0.5 bg-red-500" />
                  </div>
                )}
                {dayEvts.map(evt => (
                  <Tooltip key={evt.id} title={`${evt.title} • ${evt.startTime}–${evt.endTime}${evt.room?` • ${evt.room}`:""}`}>
                    <div className="absolute rounded-lg shadow-sm px-1.5 py-0.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        top:    getTopOffset(evt.startTime),
                        height: getEvtHeight(evt.startTime, evt.endTime),
                        left:   `calc(${(evt._li/evt._n)*100}% + 2px)`,
                        width:  `calc(${(1/evt._n)*100}% - 4px)`,
                        backgroundColor: evt.color, zIndex: 10,
                      }}
                      onClick={() => onEventClick(evt)}>
                      <div className="text-white text-[11px] font-semibold leading-tight truncate">{evt.title}</div>
                      <div className="text-white/80 text-[9px]">{evt.startTime}</div>
                      {evt.room && getEvtHeight(evt.startTime, evt.endTime) > 50 && (
                        <div className="text-white/70 text-[9px] truncate">{evt.room}</div>
                      )}
                    </div>
                  </Tooltip>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   DAY VIEW
══════════════════════════════════════════════ */
const DayView = ({ events, activeDate, onEventClick }) => {
  const aDate     = new Date(activeDate + "T00:00:00");
  const gridH     = HOURS.length * SLOT_H * 2;
  const allEvts   = events.filter(e => e.date === activeDate);
  const timedEvts = layoutEvents(allEvts.filter(e => !isAllDay(e)));
  const allDayEvts = allEvts.filter(isAllDay);
  const typeCounts = {};
  allEvts.forEach(e => { typeCounts[e.type] = (typeCounts[e.type]||0)+1; });
  const isToday = aDate.toDateString() === new Date().toDateString();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="shrink-0 px-6 py-4 border-b border-gray-100">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{aDate.toLocaleDateString("en-US",{weekday:"long"})}</div>
        <div className="text-2xl font-bold mt-0.5" style={{ color: isToday?"var(--color-blue)":"#111827", fontFamily:"Montserrat,sans-serif" }}>
          {aDate.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
        </div>
        {Object.entries(typeCounts).length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {Object.entries(typeCounts).map(([type, count]) => {
              const cfg = EVENT_TYPE_CONFIG[type];
              return (
                <Tag key={type} style={{ backgroundColor:cfg?.bg, color:cfg?.color, border:`1px solid ${cfg?.color}40`, fontWeight:600 }}>
                  {count} {cfg?.label||type}{count>1?"s":""}
                </Tag>
              );
            })}
          </div>
        )}
        {allDayEvts.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {allDayEvts.map(evt => (
              <div key={evt.id} className="text-xs text-white px-2.5 py-0.5 rounded-full cursor-pointer hover:opacity-85"
                style={{ backgroundColor: evt.color }} onClick={() => onEventClick(evt)}>
                {evt.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex" style={{ height: gridH, minHeight: gridH }}>
          <div className="w-14 shrink-0 border-r border-gray-100 relative">
            {HOURS.map((h, i) => (
              <div key={h} className="absolute text-[10px] text-gray-400 text-right pr-2 leading-none" style={{ top: i*SLOT_H*2-6 }}>{formatHour(h)}</div>
            ))}
          </div>
          <div className="flex-1 relative border-l border-gray-100">
            {HOURS.map((h, i) => (<div key={h}     className="absolute w-full border-t border-gray-100" style={{ top: i*SLOT_H*2 }} />))}
            {HOURS.map((h, i) => (<div key={`h${h}`} className="absolute w-full border-t border-gray-50"  style={{ top: i*SLOT_H*2+SLOT_H }} />))}
            {timedEvts.map(evt => (
              <div key={evt.id} className="absolute rounded-lg shadow-sm px-3 py-1 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                style={{ top:getTopOffset(evt.startTime), height:getEvtHeight(evt.startTime,evt.endTime), left:`calc(${(evt._li/evt._n)*100}% + 4px)`, width:`calc(${(1/evt._n)*100}% - 8px)`, backgroundColor:evt.color, zIndex:10 }}
                onClick={() => onEventClick(evt)}>
                <div className="text-white text-sm font-semibold leading-tight truncate">{evt.title}</div>
                <div className="text-white/80 text-xs mt-0.5">{evt.startTime}–{evt.endTime}</div>
                {evt.room && <div className="text-white/70 text-xs truncate">{evt.room}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   CALENDAR RIGHT SIDEBAR  (320px)
══════════════════════════════════════════════ */
const CalendarRightSidebar = ({ events, schedules, activeDate, onDateChange, sidebarEventTab, onTabChange }) => {
  const todayDs = toDateStr(new Date());

  const tabEvents = (() => {
    if (sidebarEventTab === "today")
      return events.filter(e => e.date === activeDate).slice(0, 8);
    if (sidebarEventTab === "upcoming")
      return [...events].filter(e => e.date >= todayDs)
        .sort((a,b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
        .slice(0, 8);
    if (sidebarEventTab === "interviews")
      return (schedules||[]).filter(s => s.type === "interview").slice(0, 8).map(s => ({
        id: s.id, title: s.title, date: s.date, startTime: s.startTime, color: s.color || "rgb(82,107,177)",
      }));
    return [];
  })();

  return (
    <div className="w-[320px] shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-hidden">
      {/* Mini calendar */}
      <div className="shrink-0 px-2 pt-2">
        <AntCalendar
          fullscreen={false}
          value={dayjs(activeDate)}
          onChange={d => onDateChange(d.format("YYYY-MM-DD"))}
          style={{ padding: 0 }}
        />
      </div>
      <Divider style={{ margin: "4px 0" }} />
      {/* Member filter (cosmetic) */}
      <div className="px-4 pb-3 shrink-0">
        <Select
          defaultValue="all"
          size="small"
          className="w-full"
          options={[
            { value: "all",      label: "All Members" },
            { value: "admin",    label: "Admin"       },
            { value: "teachers", label: "Teachers"    },
            { value: "students", label: "Students"    },
          ]}
        />
      </div>
      {/* Tab bar */}
      <div className="flex border-b border-gray-100 shrink-0 px-2">
        {[
          { key: "today",      label: "Today Event" },
          { key: "upcoming",   label: "Upcoming"    },
          { key: "interviews", label: "Interviews"  },
        ].map(tab => (
          <button key={tab.key}
            className={`flex-1 text-[11px] font-semibold py-2 border-b-2 transition-colors ${
              sidebarEventTab === tab.key
                ? "border-[var(--color-blue)] text-[var(--color-blue)]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Event list */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-2">
        {tabEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
            <InboxOutlined style={{ fontSize: 30, color: "#d1d5db" }} />
            <span className="text-xs text-gray-400">No Events on this day.</span>
          </div>
        ) : (
          <div className="space-y-1 px-3">
            {tabEvents.map(evt => (
              <div key={evt.id} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: evt.color || "rgb(82,107,177)" }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800 truncate">{evt.title}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {new Date(evt.date + "T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                    {evt.startTime && evt.startTime !== "00:00" ? ` • ${evt.startTime}` : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   EVENT DETAIL DRAWER
══════════════════════════════════════════════ */
const EventDetailDrawer = ({ event, open, onClose }) => {
  if (!event) return null;
  const cfg = EVENT_TYPE_CONFIG[event.type] || EVENT_TYPE_CONFIG.event;
  return (
    <Drawer open={open} onClose={onClose} width={400} closable destroyOnClose title={null} styles={{ body:{ padding:0 } }}>
      <div className="px-6 py-5 border-l-4" style={{ backgroundColor: cfg.bg, borderColor: cfg.color }}>
        <Tag style={{ backgroundColor: cfg.color, color:"#fff", border:"none", fontWeight:600 }} className="rounded-full text-xs px-2.5 mb-2">{cfg.label}</Tag>
        <h2 className="text-xl font-bold text-gray-900 leading-snug">{event.title}</h2>
        <div className="text-sm text-gray-500 mt-1">
          {new Date(event.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
        </div>
      </div>
      <div className="px-6 py-5 space-y-4">
        {!isAllDay(event) && (
          <div className="flex items-center gap-3">
            <ClockCircleOutlined style={{ color: cfg.color, fontSize:16 }} />
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Time</div>
              <div className="text-sm font-semibold text-gray-800">{event.startTime} – {event.endTime}</div>
            </div>
          </div>
        )}
        {event.subject && (<><Divider className="my-2"/><div className="flex items-center gap-3"><FileTextOutlined style={{color:cfg.color,fontSize:16}}/><div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Subject</div><div className="text-sm font-semibold text-gray-800">{event.subject}</div></div></div></>)}
        {event.teacher && (<><Divider className="my-2"/><div className="flex items-center gap-3"><UserOutlined style={{color:cfg.color,fontSize:16}}/><div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Teacher</div><div className="text-sm font-semibold text-gray-800">{event.teacher}</div></div></div></>)}
        {event.room    && (<><Divider className="my-2"/><div className="flex items-center gap-3"><EnvironmentOutlined style={{color:cfg.color,fontSize:16}}/><div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Location</div><div className="text-sm font-semibold text-gray-800">{event.room}</div></div></div></>)}
        {event.description && (<><Divider className="my-2"/><div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-1.5">Description</div><div className="text-sm text-gray-700 leading-relaxed">{event.description}</div></div></>)}
        <Divider className="my-2"/>
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-1.5">Visible To</div>
          <div className="flex gap-1.5 flex-wrap">
            {(event.role||[]).map(r => <Tag key={r} className="capitalize rounded-full text-xs font-semibold">{r}</Tag>)}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

/* ══════════════════════════════════════════════
   ADD EVENT MODAL
══════════════════════════════════════════════ */
const AddEventModal = ({ open, onClose, onSubmit }) => {
  const [form]    = Form.useForm();
  const [evtType, setEvtType] = useState("class");
  const handleSubmit = () => {
    form.validateFields().then(vals => {
      onSubmit({
        id: `CAL${Date.now()}`, title: vals.title,
        date: vals.date.format("YYYY-MM-DD"),
        startTime: vals.startTime ? vals.startTime.format("HH:mm") : "09:00",
        endTime:   vals.endTime   ? vals.endTime.format("HH:mm")   : "10:00",
        type: vals.type, subject: vals.subject||null, teacher: vals.teacher||null,
        room: vals.room||null, role: vals.roles||["admin"],
        color: EVENT_TYPE_CONFIG[vals.type]?.color || "rgb(82,107,177)",
        description: vals.description||"",
      });
      form.resetFields(); setEvtType("class");
    });
  };
  const handleClose = () => { form.resetFields(); setEvtType("class"); onClose(); };
  return (
    <Modal open={open} onCancel={handleClose} width={560}
      title={<span className="text-base font-bold text-gray-900">Add New Event</span>}
      footer={<div className="flex justify-end gap-2 pt-1"><Button onClick={handleClose}>Cancel</Button><Button type="primary" onClick={handleSubmit} style={{backgroundColor:"var(--color-blue)",borderColor:"var(--color-blue)"}}>Add Event</Button></div>}
      destroyOnClose>
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item label="Event Title" name="title" rules={[{required:true,message:"Title is required"}]}>
          <Input placeholder="e.g. Mathematics Class" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Event Type" name="type" initialValue="class" rules={[{required:true}]}>
            <Select onChange={setEvtType}>
              {Object.entries(EVENT_TYPE_CONFIG).map(([key,cfg]) => (
                <Select.Option key={key} value={key}><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{backgroundColor:cfg.color}}/>{cfg.label}</span></Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{required:true,message:"Date is required"}]}>
            <DatePicker className="w-full" format="YYYY-MM-DD"/>
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Start Time" name="startTime"><TimePicker className="w-full" format="HH:mm" minuteStep={15}/></Form.Item>
          <Form.Item label="End Time"   name="endTime"><TimePicker className="w-full" format="HH:mm" minuteStep={15}/></Form.Item>
        </div>
        {(evtType==="class"||evtType==="exam"||evtType==="homework") && (
          <Form.Item label="Subject" name="subject"><Input placeholder="e.g. Mathematics"/></Form.Item>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Teacher"        name="teacher"><Input placeholder="e.g. Dr. Sarah Johnson"/></Form.Item>
          <Form.Item label="Room / Location" name="room"><Input placeholder="e.g. Block-B, Room 201"/></Form.Item>
        </div>
        <Form.Item label="Visible To" name="roles" initialValue={["admin","teacher","student"]}>
          <Checkbox.Group options={[{label:"Admin",value:"admin"},{label:"Teacher",value:"teacher"},{label:"Student",value:"student"}]}/>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Optional description…" rows={3}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

/* ══════════════════════════════════════════════
   CREATE SCHEDULE MODAL
══════════════════════════════════════════════ */
const CreateScheduleModal = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then(vals => {
      onSubmit({
        id: `SCH${Date.now()}`, title: vals.title,
        date: vals.date.format("YYYY-MM-DD"),
        startTime: vals.startTime ? vals.startTime.format("HH:mm") : "09:00",
        endTime:   vals.endTime   ? vals.endTime.format("HH:mm")   : "10:00",
        type: vals.type || "meeting", scope: vals.scope || "my",
        description: vals.description || "", tags: [], members: [], attachments: [],
        activityLog: [{ id:`L${Date.now()}`, user:"You", action:"created this schedule", time:new Date().toISOString().slice(0,16).replace("T"," ") }],
        comments: [], color: EVENT_TYPE_CONFIG[vals.type]?.color || "rgb(82,107,177)",
      });
      form.resetFields(); onClose();
    });
  };
  return (
    <Modal open={open} onCancel={() => { form.resetFields(); onClose(); }} width={520}
      title={<span className="text-base font-bold">Create Schedule</span>}
      footer={<div className="flex justify-end gap-2 pt-1"><Button onClick={() => { form.resetFields(); onClose(); }}>Cancel</Button><Button type="primary" onClick={handleSubmit} style={{backgroundColor:"var(--color-blue)"}}>Create</Button></div>}
      destroyOnClose>
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item label="Title" name="title" rules={[{required:true}]}><Input placeholder="Schedule title"/></Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Type" name="type" initialValue="meeting">
            <Select options={[{value:"meeting",label:"Meeting"},{value:"event",label:"Event"},{value:"exam",label:"Exam"},{value:"interview",label:"Interview"},{value:"class",label:"Class"}]}/>
          </Form.Item>
          <Form.Item label="Scope" name="scope" initialValue="my">
            <Select options={[{value:"my",label:"My Schedule"},{value:"team",label:"Team Schedule"}]}/>
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item label="Date" name="date" rules={[{required:true}]}><DatePicker className="w-full" format="YYYY-MM-DD"/></Form.Item>
          <Form.Item label="Start" name="startTime"><TimePicker className="w-full" format="HH:mm" minuteStep={15}/></Form.Item>
          <Form.Item label="End"   name="endTime"><TimePicker className="w-full" format="HH:mm" minuteStep={15}/></Form.Item>
        </div>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Add description…"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

/* ══════════════════════════════════════════════
   SCHEDULE CARD
══════════════════════════════════════════════ */
const ScheduleCard = ({ schedule, isActive, onClick }) => {
  const d        = new Date(schedule.date + "T00:00:00");
  const isToday  = schedule.date === toDateStr(new Date());
  return (
    <div
      className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all border ${isActive?"bg-blue-50 border-blue-200":"bg-white border-transparent hover:border-gray-200 hover:bg-gray-50"}`}
      onClick={onClick}
    >
      {/* Date block */}
      <div className={`shrink-0 w-12 rounded-lg py-1.5 text-center ${isToday?"text-white":"bg-gray-50"}`}
        style={isToday ? { background:"linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))" } : {}}>
        <div className={`text-lg font-bold leading-tight ${isToday?"text-white":"text-gray-800"}`}>{d.getDate()}</div>
        <div className={`text-[10px] font-semibold uppercase tracking-wide ${isToday?"text-white/80":"text-gray-400"}`}>
          {d.toLocaleDateString("en-US",{month:"short"})}
        </div>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-800 truncate leading-snug">{schedule.title}</div>
        <div className="text-xs text-gray-400 mt-0.5">{fmtTime(schedule.startTime)} – {fmtTime(schedule.endTime)}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex -space-x-1.5">
            {(schedule.members||[]).slice(0,3).map(m => (
              <div key={m.id} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
                style={{ backgroundColor: getMemberColor(m.name) }} title={m.name}>
                {getInitials(m.name)}
              </div>
            ))}
            {(schedule.members||[]).length > 3 && (
              <div className="w-5 h-5 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-[8px] font-bold text-white">
                +{schedule.members.length-3}
              </div>
            )}
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor:"rgba(232,19,123,0.12)" }}>
            <RightOutlined style={{ fontSize:9, color:"rgb(232,19,123)" }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   SCHEDULE DETAIL
══════════════════════════════════════════════ */
const ScheduleDetail = ({ schedule }) => {
  const [comment, setComment]         = useState("");
  const [localComments, setLocalComments] = useState(schedule.comments || []);

  const sendComment = () => {
    if (!comment.trim()) return;
    setLocalComments(prev => [...prev, { id:`C${Date.now()}`, user:"You", text:comment.trim(), time:new Date().toISOString().slice(0,16).replace("T"," ") }]);
    setComment("");
  };

  const gradient = SCHEDULE_GRADIENTS[schedule.type] || SCHEDULE_GRADIENTS.meeting;
  const d = new Date(schedule.date + "T00:00:00");

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      {/* Gradient header */}
      <div className="mx-4 mt-4 mb-4 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5" style={{ background: gradient }}>
          <Tag style={{ backgroundColor:"rgba(255,255,255,0.25)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)", fontWeight:600 }} className="text-xs rounded-full mb-3 capitalize">
            {schedule.type}
          </Tag>
          <h2 className="text-xl font-bold text-white leading-snug">{schedule.title}</h2>
          <div className="flex items-center gap-1.5 mt-2 text-white/80 text-sm">
            <CalendarOutlined style={{ fontSize:12 }}/>
            <span>{d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</span>
          </div>
          {schedule.startTime && (
            <div className="flex items-center gap-1.5 mt-1 text-white/80 text-sm">
              <ClockCircleOutlined style={{ fontSize:12 }}/>
              <span>{fmtTime(schedule.startTime)} – {fmtTime(schedule.endTime)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 space-y-5 pb-6">
        {/* Description + tags */}
        {schedule.description && (
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</div>
            <p className="text-sm text-gray-700 leading-relaxed">{schedule.description}</p>
            {(schedule.tags||[]).length > 0 && (
              <div className="flex gap-1.5 flex-wrap mt-2">
                {schedule.tags.map(t => (
                  <Tag key={t} className="rounded-full text-xs font-medium" style={{ backgroundColor:"rgba(82,107,177,0.1)", color:"rgb(82,107,177)", border:"none" }}>#{t}</Tag>
                ))}
              </div>
            )}
          </div>
        )}
        <Divider style={{ margin:0 }}/>

        {/* Attachments */}
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            Attachments ({(schedule.attachments||[]).length})
          </div>
          {(schedule.attachments||[]).length === 0
            ? <div className="text-xs text-gray-400">No attachments</div>
            : <div className="space-y-2">
                {schedule.attachments.map(att => (
                  <div key={att.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ backgroundColor: FILE_COLORS[att.type]||"#6b7280" }}>
                      {FILE_LABELS[att.type]||"FILE"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-800 truncate">{att.name}</div>
                      <div className="text-[10px] text-gray-400">{att.size}</div>
                    </div>
                    <PaperClipOutlined style={{ fontSize:13, color:"#9ca3af" }}/>
                  </div>
                ))}
              </div>
          }
        </div>
        <Divider style={{ margin:0 }}/>

        {/* Members */}
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Members ({(schedule.members||[]).length})</div>
          <div className="space-y-2.5">
            {(schedule.members||[]).map(m => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                  style={{ backgroundColor: getMemberColor(m.name) }}>
                  {getInitials(m.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800">{m.name}</div>
                  <div className="text-[10px] text-gray-400">{m.role}</div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor:"rgba(34,197,94,0.1)" }}>
                    <CheckOutlined style={{ fontSize:10, color:"#22c55e" }}/>
                  </button>
                  <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor:"rgba(239,68,68,0.1)" }}>
                    <CloseOutlined style={{ fontSize:10, color:"#ef4444" }}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Divider style={{ margin:0 }}/>

        {/* Comments */}
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Comments</div>
          <div className="flex gap-2 mb-3">
            <Input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment…"
              className="flex-1 rounded-xl" onPressEnter={sendComment}/>
            <Button type="primary" icon={<SendOutlined/>} onClick={sendComment} className="rounded-xl" style={{ backgroundColor:"var(--color-blue)" }}/>
          </div>
          {localComments.length > 0 && (
            <div className="space-y-2.5">
              {localComments.map(c => (
                <div key={c.id} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: getMemberColor(c.user) }}>
                    {getInitials(c.user)}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl px-3 py-2">
                      <div className="text-[10px] font-bold text-gray-600 mb-0.5">{c.user}</div>
                      <div className="text-xs text-gray-700">{c.text}</div>
                    </div>
                    <div className="text-[10px] text-gray-400 ml-2 mt-0.5">{c.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Divider style={{ margin:0 }}/>

        {/* Activity log */}
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Activity</div>
          <div className="space-y-2.5">
            {(schedule.activityLog||[]).map(log => (
              <div key={log.id} className="flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: getMemberColor(log.user) }}>
                  {getInitials(log.user)}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-gray-700">{log.user} </span>
                  <span className="text-xs text-gray-500">{log.action}</span>
                  <div className="text-[10px] text-gray-400 mt-0.5">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   SCHEDULE TAB VIEW
══════════════════════════════════════════════ */
const ScheduleTabView = ({ schedules, activeScheduleTab, scheduleFilter, activeScheduleId, onTabChange, onFilterChange, onSelectSchedule }) => {
  const todayDs = toDateStr(new Date());
  const filtered = (schedules||[])
    .filter(s => {
      if (activeScheduleTab === "my"   && s.scope !== "my")   return false;
      if (activeScheduleTab === "team" && s.scope !== "team") return false;
      if (scheduleFilter === "past"     && s.date >= todayDs) return false;
      if (scheduleFilter === "today"    && s.date !== todayDs) return false;
      if (scheduleFilter === "upcoming" && s.date <  todayDs) return false;
      return true;
    })
    .sort((a,b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));

  const activeSchedule = (schedules||[]).find(s => s.id === activeScheduleId) || null;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left panel */}
      <div className="w-[420px] shrink-0 border-r border-gray-100 flex flex-col overflow-hidden bg-white">
        {/* Sub-tabs */}
        <div className="flex border-b border-gray-100 shrink-0 px-4 pt-3">
          {[{ key:"my", label:"My Schedules" },{ key:"team", label:"Team Schedules" }].map(t => (
            <button key={t.key}
              className={`mr-6 text-sm font-semibold pb-2.5 border-b-2 transition-colors ${activeScheduleTab===t.key?"border-[var(--color-blue)] text-[var(--color-blue)]":"border-transparent text-gray-400 hover:text-gray-600"}`}
              onClick={() => onTabChange(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Filter pills */}
        <div className="flex gap-2 px-4 py-3 shrink-0">
          {[{key:"past",label:"Past"},{key:"today",label:"Today"},{key:"upcoming",label:"Upcoming"}].map(f => (
            <button key={f.key}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all border ${scheduleFilter===f.key?"text-white border-transparent shadow-sm":"text-gray-500 border-gray-200 bg-white hover:border-gray-300"}`}
              style={scheduleFilter===f.key ? { background:"linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))" } : {}}
              onClick={() => onFilterChange(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        {/* List */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-3 space-y-2">
          {filtered.length === 0
            ? <div className="flex flex-col items-center justify-center h-full py-12 gap-2">
                <InboxOutlined style={{ fontSize:36, color:"#d1d5db" }}/>
                <div className="text-sm text-gray-400 font-medium">No schedules found</div>
                <div className="text-xs text-gray-300">Try a different filter</div>
              </div>
            : filtered.map(s => (
                <ScheduleCard key={s.id} schedule={s} isActive={s.id===activeScheduleId} onClick={() => onSelectSchedule(s.id)}/>
              ))
          }
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col">
        {!activeSchedule
          ? <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor:"rgba(82,107,177,0.1)" }}>
                <CalendarOutlined style={{ fontSize:32, color:"rgb(82,107,177)" }}/>
              </div>
              <div className="text-base font-semibold text-gray-600">Select a schedule</div>
              <div className="text-sm text-gray-400">Click any schedule card to view its details</div>
            </div>
          : <ScheduleDetail key={activeSchedule.id} schedule={activeSchedule}/>
        }
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   CALENDAR TAB VIEW
══════════════════════════════════════════════ */
const CalendarTabView = ({ events, schedules, activeView, activeDate, sidebarEventTab, onPrev, onNext, onToday, onViewChange, onDateClick, onEventClick, onSidebarTabChange }) => {
  const activeDateObj = new Date(activeDate + "T00:00:00");

  const getDateLabel = () => {
    if (activeView === "month") return activeDateObj.toLocaleDateString("en-US",{month:"long",year:"numeric"});
    if (activeView === "week") {
      const wd = getWeekDays(activeDateObj);
      const f = wd[0], l = wd[6];
      const sm = f.getMonth() === l.getMonth();
      return sm
        ? `${f.toLocaleDateString("en-US",{month:"short"})} ${f.getDate()} – ${l.getDate()}, ${l.getFullYear()}`
        : `${f.toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${l.toLocaleDateString("en-US",{month:"short",day:"numeric"})}, ${l.getFullYear()}`;
    }
    return activeDateObj.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Sub-header */}
      <div className="shrink-0 bg-white border-b border-gray-100 px-5 py-2.5 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button icon={<LeftOutlined/>}  size="small" type="text" onClick={onPrev}  className="hover:bg-gray-100"/>
          <Button icon={<RightOutlined/>} size="small" type="text" onClick={onNext}  className="hover:bg-gray-100"/>
          <Button size="small" onClick={onToday} className="ml-1 font-semibold" style={{ color:"var(--color-blue)", borderColor:"var(--color-blue)" }}>Today</Button>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
          <span className="text-sm font-bold text-gray-800">{getDateLabel()}</span>
          <DownOutlined style={{ fontSize:10, color:"#9ca3af" }}/>
        </div>
        <div className="flex-1"/>
        <Radio.Group value={activeView} onChange={e => onViewChange(e.target.value)} optionType="button" buttonStyle="solid" size="small">
          <Radio.Button value="day">Day</Radio.Button>
          <Radio.Button value="week">Week</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
        </Radio.Group>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden p-4 min-w-0">
          {activeView === "month" && <MonthView events={events} activeDate={activeDate} onDateClick={onDateClick} onEventClick={onEventClick}/>}
          {activeView === "week"  && <WeekView  events={events} activeDate={activeDate} onDateClick={onDateClick} onEventClick={onEventClick}/>}
          {activeView === "day"   && <DayView   events={events} activeDate={activeDate} onEventClick={onEventClick}/>}
        </div>
        <CalendarRightSidebar
          events={events} schedules={schedules}
          activeDate={activeDate} onDateChange={onDateClick}
          sidebarEventTab={sidebarEventTab} onTabChange={onSidebarTabChange}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   TOP HEADER
══════════════════════════════════════════════ */
const TopHeader = ({ activeTab, onTabChange, onCreateSchedule }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <div className="shrink-0 bg-white border-b border-gray-100 px-6 flex items-center gap-6" style={{ height:56 }}>
      {/* Tab links */}
      <div className="flex items-center gap-6 h-full">
        {[{key:"calendar",label:"Calendar"},{key:"schedule",label:"Schedule"}].map(tab => (
          <button key={tab.key}
            className={`h-full text-sm font-semibold border-b-2 transition-colors ${activeTab===tab.key?"border-[var(--color-blue)] text-[var(--color-blue)]":"border-transparent text-gray-400 hover:text-gray-600"}`}
            onClick={() => onTabChange(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>
      {/* Center */}
      <div className="flex items-center gap-3 flex-1 justify-center">
        <Select defaultValue="Asia/Karachi" size="small" options={TIMEZONES} style={{ width:140 }}/>
        <Input
          prefix={<SearchOutlined style={{ color:"#9ca3af" }}/>}
          placeholder="Search…" size="small"
          style={{ width: searchFocused ? 240 : 180, transition:"width 300ms ease" }}
          className="rounded-lg"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>
      {/* Right */}
      <div className="flex items-center gap-2.5">
        <Badge count={3} size="small">
          <Button icon={<BellOutlined/>} type="text" size="small" className="hover:bg-gray-100 rounded-lg"/>
        </Badge>
        <Button type="primary" icon={<PlusOutlined/>} size="small" onClick={onCreateSchedule} className="rounded-lg font-semibold"
          style={{ backgroundColor:"var(--color-blue)", borderColor:"var(--color-blue)" }}>
          Create Schedule
        </Button>
        <Button icon={<ShareAltOutlined/>} size="small" className="rounded-lg font-semibold"
          style={{ backgroundColor:"rgb(60,80,140)", borderColor:"rgb(60,80,140)", color:"#fff" }}>
          Share Calendar
        </Button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   SCHEDULE PAGE  (main export)
══════════════════════════════════════════════ */
const SchedulePage = () => {
  const dispatch = useDispatch();
  const events            = useSelector(s => s.calendar.events);
  const activeView        = useSelector(s => s.calendar.activeView);
  const activeDate        = useSelector(s => s.calendar.activeDate);
  const activeRole        = useSelector(s => s.calendar.activeRole);
  const sidebarEventTab   = useSelector(s => s.calendar.sidebarEventTab);
  const schedules         = useSelector(s => s.calendar.schedules);
  const activeScheduleId  = useSelector(s => s.calendar.activeScheduleId);
  const activeScheduleTab = useSelector(s => s.calendar.activeScheduleTab);
  const scheduleFilter    = useSelector(s => s.calendar.scheduleFilter);
  const activeCalendarTab = useSelector(s => s.calendar.activeCalendarTab);

  const [selectedEvent,    setSelectedEvent]    = useState(null);
  const [drawerOpen,       setDrawerOpen]       = useState(false);
  const [addModalOpen,     setAddModalOpen]     = useState(false);
  const [createSchedOpen,  setCreateSchedOpen]  = useState(false);

  const filteredEvents = events.filter(e => (e.role||[]).includes(activeRole));
  const activeDateObj  = new Date(activeDate + "T00:00:00");

  useEffect(() => {
    seedCalendar();
    dispatch(setEvents(getCalendarEventsFromStorage()));
    seedSchedules();
    dispatch(setSchedules(getSchedulesFromStorage()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (events.length > 0) saveCalendarEventsToStorage(events);
  }, [events]);

  const handlePrev = () => {
    const d = new Date(activeDateObj);
    if (activeView === "month") { d.setDate(1); d.setMonth(d.getMonth()-1); }
    else if (activeView === "week") d.setDate(d.getDate()-7);
    else d.setDate(d.getDate()-1);
    dispatch(setActiveDate(toDateStr(d)));
  };
  const handleNext = () => {
    const d = new Date(activeDateObj);
    if (activeView === "month") { d.setDate(1); d.setMonth(d.getMonth()+1); }
    else if (activeView === "week") d.setDate(d.getDate()+7);
    else d.setDate(d.getDate()+1);
    dispatch(setActiveDate(toDateStr(d)));
  };
  const handleToday      = () => dispatch(setActiveDate(toDateStr(new Date())));
  const handleEventClick = evt => { setSelectedEvent(evt); setDrawerOpen(true); };
  const handleAddEvent   = evt => { dispatch(addEvent(evt)); setAddModalOpen(false); };
  const handleCreateSched = sch => { dispatch(addSchedule(sch)); setCreateSchedOpen(false); };

  return (
    <>
      <div className="-mx-3 -mb-3 flex flex-col overflow-hidden bg-gray-50" style={{ height:"calc(100% + 12px)" }}>
        <TopHeader
          activeTab={activeCalendarTab}
          onTabChange={v => dispatch(setActiveCalendarTab(v))}
          onCreateSchedule={() => setCreateSchedOpen(true)}
        />
        {activeCalendarTab === "calendar"
          ? <CalendarTabView
              events={filteredEvents} schedules={schedules}
              activeView={activeView} activeDate={activeDate}
              sidebarEventTab={sidebarEventTab}
              onPrev={handlePrev} onNext={handleNext} onToday={handleToday}
              onViewChange={v => dispatch(setActiveView(v))}
              onDateClick={ds => dispatch(setActiveDate(ds))}
              onEventClick={handleEventClick}
              onSidebarTabChange={t => dispatch(setSidebarEventTab(t))}
              onAddEvent={() => setAddModalOpen(true)}
            />
          : <ScheduleTabView
              schedules={schedules}
              activeScheduleTab={activeScheduleTab}
              scheduleFilter={scheduleFilter}
              activeScheduleId={activeScheduleId}
              onTabChange={t => dispatch(setActiveScheduleTab(t))}
              onFilterChange={f => dispatch(setScheduleFilter(f))}
              onSelectSchedule={id => dispatch(setActiveScheduleId(id))}
            />
        }
      </div>

      <EventDetailDrawer event={selectedEvent} open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
      <AddEventModal     open={addModalOpen}    onClose={() => setAddModalOpen(false)}    onSubmit={handleAddEvent}/>
      <CreateScheduleModal open={createSchedOpen} onClose={() => setCreateSchedOpen(false)} onSubmit={handleCreateSched}/>
    </>
  );
};

export default SchedulePage;
