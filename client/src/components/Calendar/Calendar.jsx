import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Import your custom styles

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const wateredDates = [new Date(2024, 1, 5), new Date(2024, 1, 10)]; // Example dates when watering occurred

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isWatered = wateredDates.some((d) => d.toDateString() === date.toDateString());

      return isWatered ? <span className="watered-icon">💧</span> : null; // Water drop icon
    }

    return null;
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Irregation Calendar</h1>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        calendarType="US" // Change to 'ISO 8601' for Monday as the first day of the week
      />
    </div>
  );
};

export default CalendarPage;
