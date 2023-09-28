import React, { useState } from "react";

// components
import Day from "./Day";

const Calender = () => {
  const [date, setDate] = useState<Date>(new Date());
  const calendar = generateCalendar(date);
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  // ------------- functions ---------------------------------
  // ---- give list of days of current month -----------------
  function generateDays(currentDate: Date): (Date | null)[] {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const calendarData: (Date | null)[] = [];

    // Fill in empty spaces before the start of the month
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      calendarData.push(null);
    }

    // Fill in the days of the month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      calendarData.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }

    return calendarData;
  }
  // ---- give list of weeks start with sunday -----------------
  function generateCalendar(currentDate: Date) {
    const calendarData = generateDays(currentDate);
    const calendarRows: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];
    calendarData.forEach((day) => {
      if (day === null) {
        currentWeek.push(null);
      } else {
        currentWeek.push(day);
        if (day.getDay() === 6) {
          calendarRows.push(currentWeek);
          currentWeek = [];
        }
      }
    });
    return calendarRows;
  }
  // handler
  const goToPreviousMonth = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      if (newDate.getMonth() === 11) {
        newDate.setFullYear(prevDate.getFullYear() - 1);
      }
      return newDate;
    });
  };
  const goToNextMonth = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      if (newDate.getMonth() === 0) {
        newDate.setFullYear(prevDate.getFullYear() + 1);
      }
      return newDate;
    });
  };
  // ------------- Render ---------------------------------
  return (
    <section className=" max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div className=" w-2/3 my-2 flex flex-row items-center  gap-10">
        <button
          onClick={() => setDate(new Date())}
          className=" px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
        >
          Today
        </button>
        <div className="flex flex-row gap-4">
          <button onClick={goToPreviousMonth}>{"<"}</button>
          <button onClick={goToNextMonth}>{">"}</button>
        </div>
        <div className="flex flex-row gap-2 text-xl text-gray-700">
          <span>{date.toLocaleString("en-US", { month: "long" })}</span>
          <span>{date.getFullYear()}</span>
        </div>
      </div>

      <div className=" flex flex-row">
        {dayNames.map((day) => (
          <Day date={day} />
        ))}
      </div>

      {calendar.map((week) => (
        <div className=" flex flex-row">
          {week.map((day) => (
            <Day date={day} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default Calender;
