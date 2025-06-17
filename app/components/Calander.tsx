import React, { useState } from "react";

// Define the type for the onDateSelect callback
interface CalendarProps {
  onDateSelect?: (date: number) => void; // Callback function that receives a number (day)
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date); // Callback to parent component
    }
  };

  // Example for a 30-day month
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-2 bg-gray-50 p-4 rounded-lg shadow-inner">
      {daysInMonth.map((day) => (
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`py-2 text-center cursor-pointer rounded-lg ${
            selectedDate === day
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-200"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
