import Image from "./Image";

export default function PlaceGallery({ place }) {
  const photos = place?.photos || [];

  if (!photos.length) {
    return (
      <div className="rounded-2xl bg-gray-100 h-72 flex items-center justify-center">
        No photos available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[350px] overflow-hidden rounded-2xl">

      {photos.slice(0, 5).map((photo, index) => (

        <Image
          key={index}
          src={photo}
          alt={`${place.title} ${index + 1}`}
          className={`w-full h-full ${
            index === 0
              ? "col-span-2 row-span-2"
              : ""
          }`}
        />

      ))}

    </div>
  );
}