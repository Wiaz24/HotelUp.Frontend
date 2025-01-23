import { useAuth } from 'react-oidc-context';
import './reservationDetailsPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsersReservationsById } from '../services/customerService';
import { useEffect } from 'react';

function ReservationDetailsPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {data} = useQuery({
    queryKey: ['get-reservation-by-id'],
    queryFn: () => {
      if (id && auth.user?.access_token) {
        return getUsersReservationsById(auth.user.access_token ?? "", id);
      } 
    },
    enabled: !!auth.user?.access_token && !!id,
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
    }
  
    if (data) {
      console.log(data);
    } else {
      console.log('data is undefined');
    }
  }, [auth.isAuthenticated, navigate, data]);

  return ( <div className="reservation-details-container">
  <div className="main-info">
      <h2>Szczegóły rezerwacji</h2>
      <h3>Numer rezerwacji: <strong>ABC12345</strong></h3>
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Informacje o lokatorach</div>
      <div className="details-part-content">
        <div className="part-column">
          <h4>Lokator 1</h4>
          <div>
            <div>Imię i nazwisko: {data?.tenants[0].firstName} {data?.tenants[0].lastName}</div>
            <div><span>Dokument:</span> {data?.tenants[0].documentType}</div>
            <div><span>Numer telefonu:</span> {data?.tenants[0].phoneNumber} </div>
            <div><span>Adres email:</span> {data?.tenants[0].email} </div>
            <div><span>Pesel:</span> {data?.tenants[0].pesel} </div>
            <div><span>Status zameldowania:</span> {data?.tenants[0].status} </div>
          </div>
        </div>
        <div className="part-column">
          <h4>Lokator 2</h4>
            <div>
              <div><span>Imię i nazwisko:</span> Jan Kowalski</div>
              <div><span>Dokument:</span> Paszport (AB123456)</div>
              <div><span>Numer telefonu:</span> Ekonomiczna</div>
              <div><span>Adres email:</span> Ekonomiczna</div>
              <div><span>Pesel:</span> Ekonomiczna</div>
              <div><span>Status zameldowania:</span> Ekonomiczna</div>
            </div>
        </div>
      </div>
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Informacje o rezerwacji</div>
    <div className="details-part-content">
      <div className="part-column">
        <h4>Data i godzina zameldowania:</h4>
        <div> {data?.startDate} </div>
      </div>
      <div className="part-column">
        <h4>Data i godzina wymeldowania:</h4>
        <div> {data?.endDate} </div>
      </div>
      
    </div>
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Szczegóły pokoi</div>
      <div className="details-part-content">
      <div className="part-column">
        <h4>Pokój 1</h4>
        <div>
          <div><span>Piętro:</span> {data?.rooms[0].floor} </div>
          <div><span>Dostosowany dla osób ze specjalnymi potrzebami:</span> {data?.rooms[0].withSpecialNeeds} </div>
          <div><span>Numer pokoju:</span> {data?.rooms[0].id} </div>
          <div><span>Typ pokoju:</span> {data?.rooms[0].type} </div>
        </div>
      </div>
      <div className="part-column">
        <h4>Pokój 2</h4>
        <div>
          <div><span>Piętro:</span> 1x23 kg</div>
          <div><span>Dostosowany dla osób ze specjalnymi potrzebami:</span>Tak</div>
          <div><span>Numer pokoju:</span> 1x23 kg</div>
          <div><span>Typ pokoju:</span> 1x23 kg</div>
        </div>
      </div>
      <div className="part-column">
        <h4>Pokój 3</h4>
        <div>
          <div><span>Piętro:</span> 1x23 kg</div>
          <div><span>Dostosowany dla osób ze specjalnymi potrzebami:</span>Tak</div>
          <div><span>Numer pokoju:</span> 1x23 kg</div>
          <div><span>Typ pokoju:</span> 1x23 kg</div>
        </div>
      </div>
      </div>
      
      {/* <div className="section-title">Pokój 1</div>
      <div className="details">
      <div><span>Liczba osób:</span> 1x10 kg</div>
        <div><span>Dostosowany dla osób ze specjalnymi potrzebami:</span> 1x23 kg</div>
        <div><span>Numer pokoju:</span> 1x23 kg</div>
        <div><span>Typ pokoju:</span> 1x23 kg</div>
      </div>
      <div className="section-title">Pokój 2</div>
      <div className="details">
        <div><span>Liczba osób:</span> 1x10 kg</div>
        <div><span>Piętro:</span> 1x23 kg</div>
        <div><span>Dostosowany dla osób ze specjalnymi potrzebami:</span> 1x23 kg</div>
        <div><span>Numer pokoju:</span> 1x23 kg</div>
        <div><span>Typ pokoju:</span> 1x23 kg</div>
      </div>
      <div className="section-title">Pokój 3</div>
      <div className="details">
      <div><span>Liczba osób:</span> 1x10 kg</div>
        <div><span>Piętro:</span> 1x23 kg</div>
        <div><span>Dostosowany dla osób ze specjalnymi potrzebami:</span> 1x23 kg</div>
        <div><span>Numer pokoju:</span> 1x23 kg</div>
        <div><span>Typ pokoju:</span> 1x23 kg</div>
      </div> */}
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Opłaty</div>
      <div className="details-part-content">
        <div className="part-column">
          <h4>Cena zakwaterowania:</h4>
          <div> {data?.bill.accommodationPrice} </div>
        </div>
        <div className="part-column">
          <h4>Dodatkowe koszta:</h4>
          <div> {} </div>
        </div>
        <div className="part-column">
          <h4>Status płatności:</h4>
          <div> {} </div>
        </div>
        <div className="part-column">
        <h4>Dodatkowy koszt 1</h4>
        <div>Cena: abc</div>
      </div>
      <div className="part-column">
        <h4>Dodatkowy koszt 2</h4>
        <div>Cena: def</div>
      </div>
    </div>  
  </div>

  <div className="reservation-actions">
    <button>Zamów sprzątanie</button>
    <button>Anuluj rezerwację</button>
  </div>

  <footer>
      © 2025, HotelUp. W razie pytań, skontaktuj się z nami: help@hotelup.com
  </footer>
</div>);
}

export default ReservationDetailsPage;