import { useState } from "react";

const availablePerks = [
  "WiFi",
  "Parking",
  "TV",
  "Kitchen",
  "Pool",
  "AC",
  "Coffee",
  "Gym",
  "Washer",
  "Garden"
];

export default function PerksWidget({
  selected = [],
  onChange
}) {
  const [perks, setPerks] = useState(selected);

  function toggle(perk) {
    const updated = perks.includes(perk)
      ? perks.filter(item => item !== perk)
      : [...perks, perk];

    setPerks(updated);

    if (onChange) {
      onChange(updated);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">

      {availablePerks.map(perk => (

        <label
          key={perk}
          className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:bg-gray-50"
        >

          <input
            type="checkbox"
            checked={perks.includes(perk)}
            onChange={() => toggle(perk)}
            className="accent-rose-500"
          />

          <span className="text-sm">
            {perk}
          </span>

        </label>

      ))}

    </div>
  );
}