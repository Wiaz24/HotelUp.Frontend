import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router-dom";
import { getCleaningTaskById } from "../services/cleaningService";

function UpdateCleaningTaskPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedStatus, setSelectedStatus]=useState<string>("");

  const {data} = useQuery({
    queryKey: ['get-cleaning-task-by-id'],
    queryFn: () => {
      if (id && auth.user?.access_token) {
        return getCleaningTaskById(auth.user.access_token ?? "", id);
      } 
    },
    enabled: !!auth.user?.access_token && !!id,
  });

  return(<>{data ? (
    <>
      <div>
        <p>Cleaner ID: {data.cleanerId}</p>
        <select 
          onChange={(e) => setSelectedStatus(e.target.value)} 
          value={selectedStatus}>
          <option value="pending">Oczekujące</option>
          <option value="completed">Wykonane</option>
          <option value="In progress">W trakcie</option>
        </select>
        <button>
          Zaktualizuj status
        </button>
      </div>
    </>
  ) : (
    <p>Ładowanie danych...</p>
  )}</>);
}
export default UpdateCleaningTaskPage;