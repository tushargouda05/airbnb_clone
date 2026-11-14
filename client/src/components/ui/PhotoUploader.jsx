import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function PhotoUploader({
  photos = [],
  onChange
}) {
  const [images, setImages] = useState(photos);

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);

    const urls = files.map(file =>
      URL.createObjectURL(file)
    );

    const updated = [...images, ...urls];

    setImages(updated);

    if (onChange) {
      onChange(updated, [...files]);
    }
  }

  function removeImage(index) {
    const updated = images.filter(
      (_, i) => i !== index
    );

    setImages(updated);

    if (onChange) {
      onChange(updated);
    }
  }

  return (
    <div className="space-y-4">

      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:bg-gray-50">

        <Upload
          size={32}
          className="text-rose-500 mb-3"
        />

        <span className="font-semibold">
          Upload property photos
        </span>

        <span className="text-sm text-gray-500">
          Select images from your device
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />

      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {images.map((image, index) => (

          <div
            key={index}
            className="relative h-28"
          >

            <img
              src={image}
              alt={`Property ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
            >
              <X size={16} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}