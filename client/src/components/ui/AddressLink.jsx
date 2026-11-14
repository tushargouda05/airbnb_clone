import { MapPin } from "lucide-react";

export default function AddressLink({
  children,
  className = ""
}) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(children || "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm text-gray-500 underline ${className}`}
    >
      <MapPin size={15} />
      {children}
    </a>
  );
}