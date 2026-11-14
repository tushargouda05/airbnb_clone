import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    navigate(
      `/?search=${encodeURIComponent(destination)}`
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center border rounded-full shadow-sm p-2 max-w-xl w-full"
    >

      <input
        type="text"
        placeholder="Search destinations"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        className="flex-1 border-none outline-none px-4"
      />

      <button
        type="submit"
        className="bg-rose-500 text-white rounded-full p-3"
      >
        <Search size={18} />
      </button>

    </form>
  );
}