import { useState } from "react";
import { DocumentType } from "../models/documentTypes";

import './tenantFormComponent.css'
import { createReservation } from "../services/customerService";
import { RoomProps } from "../models/roomTypes";
import { useAuth } from "react-oidc-context";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Tenant } from "../models/tenantTypes";
import { TenantStatus } from "../models/tenantStaus";

function TenantFormComponent (props: RoomProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  const [tenants, setTenants] = useState<Tenant[]>(Array(props.room.capacity).fill({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pesel: '',
    documentType: DocumentType.ID_CARD,
    status: TenantStatus.PENDING,
  }));

  const handleTenantChange = (index: number, field: keyof Tenant, value: string) => {
    setTenants((prevTenants) =>
      prevTenants.map((tenant, i) =>
        i === index ? { ...tenant, [field]: value } : tenant
      )
    );
  };


  const { mutate } = useMutation({
    mutationKey: ['create-reservation'],
    mutationFn: createReservation,
    onSuccess: () => {
      alert("Pomyślnie utworzono rezerwację :)");
      navigate('/account');
    },
    onError: () => {
      alert("Wystąpił błąd podczas tworzenia rezerwacji");
    },
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.user?.id_token) {
      const token = auth.user.id_token;
      const startDate = props.startDate;
      const endDate = props.endDate;
      const roomNumbers = [props.room.id];
      mutate({ roomNumbers, tenantsData: tenants, startDate, endDate, token  });
      console.log(auth.user.id_token);
    }
  };

  if (auth.isAuthenticated) {
    return (<form onSubmit={handleSubmit}>
      {tenants.map((tenant, index) => (
        <div key={index}>
          <h3>Lokator {index + 1}</h3>
          <label htmlFor={`firstName-${index}`}>Imię:</label>
          <input
            type="text"
            id={`firstName-${index}`}
            value={tenant.firstName}
            onChange={(e) => handleTenantChange(index, 'firstName', e.target.value)}
            placeholder="Wprowadź imię"
            required
          />
          
          <label htmlFor={`lastName-${index}`}>Nazwisko:</label>
          <input
            type="text"
            id={`lastName-${index}`}
            value={tenant.lastName}
            onChange={(e) => handleTenantChange(index, 'lastName', e.target.value)}
            placeholder="Wprowadź nazwisko"
            required
          />
          
          <label htmlFor={`pesel-${index}`}>PESEL:</label>
          <input
            type="text"
            id={`pesel-${index}`}
            value={tenant.pesel}
            onChange={(e) => handleTenantChange(index, 'pesel', e.target.value)}
            placeholder="Wprowadź PESEL"
            pattern="\d{11}"
            title="PESEL musi składać się dokładnie z 11 cyfr"
            maxLength={11}
            required
          />
          
          <label htmlFor={`phoneNumber-${index}`}>Numer telefonu:</label>
          <input
            type="tel"
            id={`phoneNumber-${index}`}
            value={tenant.phoneNumber}
            onChange={(e) => handleTenantChange(index, 'phoneNumber', e.target.value)}
            placeholder="Wprowadź numer telefonu"
            pattern="\d{9}"
            title="Numer telefonu musi składać się dokładnie z 9 cyfr"
            required
          />
          
          <label htmlFor={`email-${index}`}>Adres email:</label>
          <input
            type="email"
            id={`email-${index}`}
            value={tenant.email}
            onChange={(e) => handleTenantChange(index, 'email', e.target.value)}
            placeholder="Wprowadź adres email"
            required
          />
          
          <label>Typ dokumentu:</label>
          <select
            value={tenant.documentType}
            onChange={(e) => handleTenantChange(index, 'documentType', e.target.value as DocumentType)}
          >
            <option value={DocumentType.ID_CARD}>Dowód osobisty</option>
            <option value={DocumentType.PASSPORT}>Paszport</option>
          </select>
        </div>
      ))}
      <button type="submit">Rezerwuję pokój</button>
    </form>)
  }
  else {
    return (
      <button className="log-button" onClick={() => auth.signinRedirect()}>Logowanie</button> 
    );
  }
}

export default TenantFormComponent;