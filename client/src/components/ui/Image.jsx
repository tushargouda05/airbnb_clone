export default function Image({
  src,
  alt = "Property image",
  className = "",
  ...props
}) {
  return (
    <img
      src={src || "https://placehold.co/600x400?text=No+Image"}
      alt={alt}
      loading="lazy"
      className={`object-cover ${className}`}
      {...props}
    />
  );
}