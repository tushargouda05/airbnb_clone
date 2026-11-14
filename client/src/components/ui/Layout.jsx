import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AuthDialog from "./AuthDialog";

export default function Layout() {
  const { pathname } = useLocation();
  const authMode = pathname === "/register" ? "register" : pathname === "/login" ? "login" : null;

  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {authMode && <AuthDialog mode={authMode} />}

    </div>
  );
}
