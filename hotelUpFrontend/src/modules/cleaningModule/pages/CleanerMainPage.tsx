import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { getCleanerTasks } from "../services/cleaningService";
import './../../../shared/components/userElements/common.css';

function CleanerMainPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const userGroups: string[] = Array.isArray(auth.user?.profile["cognito:groups"])
    ? auth.user?.profile["cognito:groups"]
    : [];
  
  useEffect(() => {
    if (!auth.isAuthenticated || (!userGroups.includes("Cleaners") && !userGroups.includes("Admins"))) {
      console.log(userGroups);
      navigate('/');
    }
    console.log('wita');
  }, [auth.isAuthenticated, navigate]);

  const { data } = useQuery({
    queryKey: ['get-cleaning-tasks'],
    queryFn: () => getCleanerTasks(auth.user?.access_token ?? ""),
    enabled: !!auth.user?.access_token,
  });

  return(
    <div className='common-component'> 
      <div className='title'>Przydzielone zadania sprzątania:</div>
      <div className="elements-list">
        {data ? (
          data.map((task, index) => (
            <div key={index} className="single-element"> 
              <div className="details-info">
                <div>Zlecone na: {task.realisationDate}</div>
                <div>Status: {task.status}</div>
              </div>
              <div><button>Szczegóły</button></div>
            </div>
          ))
        ) : (
          <p>Ładowanie danych...</p>
        )}
      </div>
    </div>
  );
}
export default CleanerMainPage;