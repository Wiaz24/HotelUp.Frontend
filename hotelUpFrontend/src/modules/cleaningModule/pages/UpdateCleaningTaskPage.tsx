import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router-dom";
import { getCleaningTaskById, updateCleaningTaskStatus } from "../services/cleaningService";
import './../../../shared/components/taskPages.css';
import './../../../shared/components/staff/common.css';
import { CleaningStatus } from "../models/cleaningStatus";

function UpdateCleaningTaskPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedStatus, setSelectedStatus]=useState<string>(CleaningStatus.PENDING);
  const userGroups: string[] = Array.isArray(auth.user?.profile["cognito:groups"])
    ? auth.user?.profile["cognito:groups"]
    : [];

  useEffect(() => {
    if (!auth.isAuthenticated || (!userGroups.includes("Cleaners") && !userGroups.includes("Admins"))) {
      console.log(userGroups);
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  const {data} = useQuery({
    queryKey: ['get-cleaning-task-by-id'],
    queryFn: () => {
      if (id && auth.user?.access_token) {
        return getCleaningTaskById(auth.user.access_token ?? "", id);
      } 
    },
    enabled: !!auth.user?.access_token && !!id,
  });

  const { mutate } = useMutation({
    mutationKey: ['change-cleaning-task-statsu'],
    mutationFn: updateCleaningTaskStatus,
    onSuccess: () => {
      alert("Pomyślnie zmieniono status zadania");
      navigate('/cleaner-details');
    },
    onError: (error) => {
      alert("Nie udało się zmienić statusu zadania" + error.message);
    },
  });

  const handleStatusChange = () => {
    if (id && auth.user?.access_token) {
      const status = selectedStatus;
      const token = auth.user.access_token;
      mutate({token, id, status});
    } 
    
  };

  return(<div className="common-component">{data ? (
    <div className="single-element">
      <div className="details-info">
        <div> 
          Cleaner ID: {data.cleanerId}
        </div>
        <div> 
          ID zadania: {data.id}
        </div>
        <div> 
          Powiązana rezerwacja: {data.reservationId}
        </div>
        <div> 
          Typ zadania: {data.cleaningType}
        </div>
        <div> 
          Data realizacji: {new Date(data.realisationDate).toLocaleDateString()}
        </div>
        <div> 
          Numer pokoju: {data.roomNumber}
        </div>
        <div>
          <label htmlFor="status-select">Ustaw status:</label>
          <select 
            onChange={(e) => setSelectedStatus(e.target.value)} 
            value={selectedStatus}>
            <option value={CleaningStatus.PENDING}>Oczekujące</option>
            <option value={CleaningStatus.INPROGRESS}>W trakcie</option>
            <option value={CleaningStatus.DONE}>Wykonane</option>
          </select>
        </div>
      </div>
      <div >
      <button onClick={handleStatusChange}>Zaktualizuj status</button> 
      </div>
    </div>
  ) : (
    <p>Ładowanie danych...</p>
  )}</div>);
}
export default UpdateCleaningTaskPage;