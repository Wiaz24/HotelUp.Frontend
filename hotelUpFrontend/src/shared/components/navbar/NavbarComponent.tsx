import { NavLink } from "react-router-dom";

import "./NavbarComponent.css"

function NavbarComponent() {
  return <nav>
    <NavLink to="/" className="main-link">HotelUp</NavLink>
    <ul className="link-list">
      <li>
        <NavLink to="/" className={({ isActive }) => 
            `default-link ${isActive ? "active-link" : ""}`
          }>Oferta</NavLink>
      </li>
      <li>
        <NavLink to="/" className={({ isActive }) => 
            `default-link ${isActive ? "active-link" : ""}`
          }>Logowanie</NavLink>
      </li>
    </ul>
  </nav>
}
export default NavbarComponent;