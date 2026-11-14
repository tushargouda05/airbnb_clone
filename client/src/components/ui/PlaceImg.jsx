import Image from "./Image";

export default function PlaceImg({
  place,
  className = ""
}) {
  const image =
    place?.photos?.[0] ||
    "https://placehold.co/600x400?text=Property";

  return (
    <Image
      src={image}
      alt={place?.title || "Property"}
      className={`rounded-xl w-full h-full ${className}`}
    />
  );
}