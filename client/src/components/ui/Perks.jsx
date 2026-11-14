import {
  Wifi,
  Car,
  Tv,
  Utensils,
  Waves,
  Snowflake,
  Coffee,
  Dumbbell,
  Check
} from "lucide-react";

const icons = {
  wifi: Wifi,
  parking: Car,
  tv: Tv,
  kitchen: Utensils,
  pool: Waves,
  ac: Snowflake,
  coffee: Coffee,
  gym: Dumbbell
};

export default function Perks({
  perks = []
}) {
  return (
    <div className="grid grid-cols-2 gap-4">

      {perks.map((perk, index) => {

        const Icon =
          icons[perk.toLowerCase()] || Check;

        return (
          <div
            key={index}
            className="flex items-center gap-3 border rounded-xl p-4"
          >

            <Icon size={20} className="text-rose-500" />

            <span className="text-sm font-medium">
              {perk}
            </span>

          </div>
        );
      })}

    </div>
  );
}