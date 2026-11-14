import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { money } from "../../lib/api";
import PlaceImg from "./PlaceImg";

export default function PlaceCard({ place }) {
  return (
    <Link
      to={`/place/${place._id}`}
      className="group block"
    >

      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <PlaceImg
          place={place}
          className="group-hover:scale-105 transition duration-300"
        />

        <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold">
          Guest favourite
        </span>
      </div>

      <div className="flex justify-between mt-3 gap-2">

        <h3 className="font-semibold truncate">
          {place.title}
        </h3>

        <span className="flex items-center gap-1 text-sm">
          <Star size={14} fill="black" />
          4.9
        </span>

      </div>

      <p className="text-gray-500 text-sm truncate">
        {place.address}
      </p>

      <p className="mt-2 text-sm">
        <b>{money(place.price)}</b>
        <span className="text-gray-500"> / night</span>
      </p>

    </Link>
  );
}