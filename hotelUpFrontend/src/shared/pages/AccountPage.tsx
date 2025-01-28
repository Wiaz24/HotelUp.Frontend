import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import './accountPage.css';

function AccountPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  const signOutRedirect = () => {
    auth.removeUser();
    window.location.href = `${import.meta.env.VITE_COGNITO_DOMAIN}/logout?client_id=${import.meta.env.VITE_COGNITO_CLIENT}&logout_uri=${encodeURIComponent(import.meta.env.VITE_LOGOUT_URI)}`;
  };

  const userGroups: string[] = Array.isArray(auth.user?.profile['cognito:groups']) 
  ? auth.user?.profile['cognito:groups'] 
  : [];

  const rolePaths: Record<string, string> = {
    Admins: "/receptionist-details",
    Receptionists: "/receptionist-details",
    Clients: "/client-details",
    Cooks: "/cook-details/",
    Cleaners: "/cleaner-details/",
    Janitors: "/janitor-details/",
  };

  const buttonTexts: Record<string, string> = {
    Admins: "Panel admina",
    Receptionists: "Panel recepcjonisty",
    Clients: "Podgląd Twoich rezerwacji",
    Cooks: "Panel kucharza",
    Cleaners: "Panel ekipy sprzątającej",
    Janitors: "Panel serwisu naprawczego",
  };

  const renderRoleButtons = (roles: string[]) => {
    return roles.map((role) => {
      if (rolePaths[role]) {
        return (
          <button
            key={role}
            onClick={() => navigate(rolePaths[role])}>
            {buttonTexts[role]}
          </button>
        );
      }
      return null;
    });
  };

  
  return (
    <div className="user-page">
      <h3>Witaj: {auth.user?.profile.email} <button onClick={signOutRedirect}>Wyloguj się</button></h3>
      
      <h3>Możliwe akcje:</h3>
      {auth.isAuthenticated ? (
        userGroups.length > 0 ? (
          <div>
            {renderRoleButtons(userGroups)}
          </div>
        ) : (
          <p>Nie masz przypisanych ról.</p>
        )
      ) : (
        <p>Proszę się zalogować...</p>
      )}
  </div>
  );
}
export default AccountPage;