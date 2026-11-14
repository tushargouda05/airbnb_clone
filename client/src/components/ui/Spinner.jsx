import { LoaderCircle } from "lucide-react";

export default function Spinner({
  size = 32,
  className = ""
}) {
  return (
    <div className={`flex justify-center items-center p-6 ${className}`}>
      <LoaderCircle
        size={size}
        className="animate-spin text-rose-500"
      />
    </div>
  );
}