import { Routes, Route } from "react-router-dom";

import IndexPages from "./pages/IndexPages";
import NotFoundPage from "./pages/NotFoundPage";

import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage";
import SingleBookedPlace from "./pages/SingleBookedPlace";
import Layout from "./components/ui/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

      <Route path="/" element={<IndexPages />} />

      <Route path="/login" element={<IndexPages />} />

      <Route path="/register" element={<IndexPages />} />

      <Route path="/account" element={<ProfilePage />} />

      <Route
        path="/account/places/new"
        element={<PlacePage />}
      />

      <Route
        path="/account/places/:id/edit"
        element={<PlacesFormPage />}
      />

      <Route path="/places" element={<PlacesPage />} />

      <Route
        path="/place/:id"
        element={<SingleBookedPlace />}
      />

      <Route path="*" element={<NotFoundPage />} />
      </Route>

    </Routes>
  );
}
