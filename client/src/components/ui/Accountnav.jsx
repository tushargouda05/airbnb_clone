import { NavLink } from "react-router-dom";
import {
  User,
  Home,
  PlusCircle
} from "lucide-react";

export default function Accountnav() {
  const links = [
    {
      to: "/account",
      label: "My profile",
      icon: User
    },
    {
      to: "/account/places",
      label: "My listings",
      icon: Home
    },
    {
      to: "/account/places/new",
      label: "Add new place",
      icon: PlusCircle
    }
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-3 mb-8">

      {links.map(({ to, label, icon: Icon }) => (

        <NavLink
          key={to}
          to={to}
          end={to === "/account"}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium ${
              isActive
                ? "bg-rose-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`
          }
        >

          <Icon size={17} />
          {label}

        </NavLink>

      ))}

    </nav>
  );
}