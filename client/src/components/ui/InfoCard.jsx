import { Info } from "lucide-react";

export default function InfoCard({
  title = "Information",
  description,
  children
}) {
  return (
    <div className="border rounded-xl p-5 my-4">

      <div className="flex items-center gap-2 mb-3">
        <Info className="text-rose-500" size={20} />

        <h3 className="font-semibold">
          {title}
        </h3>
      </div>

      {description && (
        <p className="text-sm text-gray-500 mb-3">
          {description}
        </p>
      )}

      {children}

    </div>
  );
}