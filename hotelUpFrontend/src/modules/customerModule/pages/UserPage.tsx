import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import './userPage.css';
import { useEffect } from "react";

function UserPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const userGroups: string[] = Array.isArray(auth.user?.profile['cognito:groups']) 
  ? auth.user?.profile['cognito:groups'] 
  : [];
  
  const signOutRedirect = () => {
    auth.removeUser();
    window.location.href = `${import.meta.env.VITE_COGNITO_DOMAIN}/logout?client_id=${import.meta.env.VITE_COGNITO_CLIENT}&logout_uri=${encodeURIComponent(import.meta.env.VITE_LOGOUT_URI)}`;
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
    }
    console.log(userGroups);
  }, [auth.isAuthenticated, navigate]);

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <div className="welcome-text">Witaj: {auth.user?.profile.email} <button onClick={signOutRedirect}>Wyloguj się</button></div>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>
        <pre>Refresh Token: {auth.user?.refresh_token}</pre>
      </div>
    );
  }
};

export default UserPage;