import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function Calendar({
  selected,
  onSelect,
  mode = "single",
  disabled,
  ...props
}) {
  return (
    <div className="bg-white rounded-xl p-3">

      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        showOutsideDays
        {...props}
      />

    </div>
  );
}