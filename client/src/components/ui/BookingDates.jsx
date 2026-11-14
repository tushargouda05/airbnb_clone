export default function BookingDates({
  checkIn,
  checkOut
}) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const nights = Math.max(
    0,
    Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="grid grid-cols-2 gap-4 border rounded-xl p-4">

      <div>
        <p className="text-xs text-gray-500">
          CHECK-IN
        </p>

        <p className="font-semibold">
          {start.toLocaleDateString()}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500">
          CHECK-OUT
        </p>

        <p className="font-semibold">
          {end.toLocaleDateString()}
        </p>
      </div>

      <p className="col-span-2 text-sm text-gray-500">
        {nights} nights
      </p>

    </div>
  );
}