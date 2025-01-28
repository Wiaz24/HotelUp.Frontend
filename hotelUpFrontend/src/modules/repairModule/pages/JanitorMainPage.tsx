import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { UserGroups } from "../../../shared/models/userGroups";
import { getRepairTasks } from "../services/repairService";
import './../../../shared/components/staff/common.css';
import { RepairTask } from "../models/repairTaskInterfaces";

function JanitorMainPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const userGroups: string[] = Array.isArray(auth.user?.profile["cognito:groups"])
    ? auth.user?.profile["cognito:groups"]
    : [];
  
  useEffect(() => {
    if (!auth.isAuthenticated || (!userGroups.includes(UserGroups.JANITORS) && !userGroups.includes(UserGroups.ADMINS))) {
      console.log(userGroups);
      navigate('/');
    }
    console.log('wita');
  }, [auth.isAuthenticated, navigate]);

  const { data } = useQuery({
    queryKey: ['get-repair-tasks'],
    queryFn: () => getRepairTasks(auth.user?.access_token ?? ""),
    enabled: !!auth.user?.access_token,
  });

  const handleRedirect = (task: RepairTask) => {
    console.log('siema', task.id);
    navigate(`/repair-task-details/${task.id}`, { state: { task } });
  };

  return(
    <div className='common-component'> 
      <div className='title'>Przydzielone zadania naprawy:</div>
      <div className="elements-list">
        {data ? (
          data.map((task, index) => (
            <div key={index} className="single-element"> 
              <div className="details-info">
                <div>Nazwa: {task.title}</div>
                <div>Zlecono na: {new Date(task.deadline).toLocaleDateString()}</div>
                <div>Data utworzenia: {new Date(task.created_at).toLocaleDateString()}</div>
                <div>Status: {task.status}</div>
              </div>
              <div><button onClick={() => handleRedirect(task)}>Szczegóły</button></div>
            </div>
          ))
        ) : (
          <p>Ładowanie danych...</p>
        )}
      </div>
    </div>
  );
}
export default JanitorMainPage;