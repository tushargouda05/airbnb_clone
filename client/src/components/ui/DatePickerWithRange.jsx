import { useState } from "react";
import Calendar from "./calender";

export default function DatePickerWithRange({
  value,
  onChange
}) {
  const [range, setRange] = useState(value || {
    from: undefined,
    to: undefined
  });

  function handleSelect(newRange) {
    const updated = newRange || {
      from: undefined,
      to: undefined
    };

    setRange(updated);

    if (onChange) {
      onChange(updated);
    }
  }

  return (
    <div className="border rounded-xl p-4">

      <div className="grid grid-cols-2 gap-3 mb-3">

        <div>
          <p className="text-xs text-gray-500">
            CHECK-IN
          </p>

          <p className="text-sm font-semibold">
            {range.from
              ? range.from.toLocaleDateString()
              : "Add date"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            CHECK-OUT
          </p>

          <p className="text-sm font-semibold">
            {range.to
              ? range.to.toLocaleDateString()
              : "Add date"}
          </p>
        </div>

      </div>

      <Calendar
        mode="range"
        selected={range}
        onSelect={handleSelect}
        disabled={{ before: new Date() }}
      />

    </div>
  );
}