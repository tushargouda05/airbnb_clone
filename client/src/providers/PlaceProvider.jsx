import {
  createContext,
  useEffect,
  useState
} from "react";

import { api } from "../lib/api";

export const PlaceContext = createContext({});

export function PlaceProvider({ children }) {
  const [places, setPlaces] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  async function fetchPlaces() {
    setError("");

    try {
      const data = await api("/places");

      setPlaces(data.places || []);

    } catch (err) {
      console.error("Error fetching places:", err);
      setError(err.message);

    } finally {
      setReady(true);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, []);

  function addPlace(newPlace) {
    setPlaces(prev => [
      newPlace,
      ...prev
    ]);
  }

  function updatePlace(updatedPlace) {
    setPlaces(prev =>
      prev.map(place =>
        place._id === updatedPlace._id
          ? updatedPlace
          : place
      )
    );
  }

  function removePlace(id) {
    setPlaces(prev =>
      prev.filter(place => place._id !== id)
    );
  }

  return (
    <PlaceContext.Provider
      value={{
        places,
        setPlaces,
        ready,
        error,
        fetchPlaces,
        addPlace,
        updatePlace,
        removePlace
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
}