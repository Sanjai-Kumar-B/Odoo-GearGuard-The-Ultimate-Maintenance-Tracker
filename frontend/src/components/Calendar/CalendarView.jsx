import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/requests");
      const data = await response.json();

      // Convert requests to calendar events
      const calendarEvents = data
        .filter(
          (request) => request.scheduledDate && request.type === "Preventive"
        )
        .map((request) => ({
          id: request._id,
          title: `${request.subject} - ${request.equipmentName}`,
          start: new Date(request.scheduledDate),
          end: new Date(request.scheduledDate),
          resource: request,
        }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectEvent = (event) => {
    navigate(`/requests/edit/${event.id}`);
  };

  const handleSelectSlot = ({ start }) => {
    const scheduledDate = format(start, "yyyy-MM-dd");
    navigate("/requests/new", { state: { scheduledDate, type: "Preventive" } });
  };

  const eventStyleGetter = (event) => {
    const request = event.resource;
    let backgroundColor = "#3b82f6"; // blue

    if (request.stage === "Repaired") {
      backgroundColor = "#10b981"; // green
    } else if (request.stage === "Scrap") {
      backgroundColor = "#ef4444"; // red
    } else if (request.priority === "High" || request.priority === "Critical") {
      backgroundColor = "#f59e0b"; // orange
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">
            Preventive Maintenance Calendar
          </h1>
          <p className="text-gray-600">
            Click on a date to schedule new preventive maintenance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
          style={{ height: "700px" }}
        >
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            views={["month", "week", "day", "agenda"]}
            defaultView="month"
          />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 bg-white rounded-lg shadow p-4"
        >
          <h3 className="font-semibold mb-2">Legend:</h3>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm">Normal Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm">High/Critical Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm">Repaired</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-sm">Scrapped</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarView;
