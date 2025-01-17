import { NavLink } from "react-router-dom";
import { useAuth } from "react-oidc-context";

import "./NavbarComponent.css"

function NavbarComponent() {
  const auth = useAuth();
  return <nav>
    <NavLink to="/" className="main-link">HotelUp</NavLink>
    <ul className="link-list">
      <li>
        <NavLink to="/offer" className={({ isActive }) => 
            `default-link ${isActive ? "active-link" : ""}`
          }>Oferta</NavLink>
      </li>
      <li>
        {auth.isAuthenticated ? (
          <NavLink to="/account" className={({ isActive }) => 
            `default-link ${isActive ? "active-link" : ""}`
          }>Konto</NavLink>
        ) : (
          <button className="log-button" onClick={() => auth.signinRedirect()}>Logowanie</button>  
        )} 
      </li>
    </ul>
  </nav>
}
export default NavbarComponent;