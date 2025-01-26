import './App.css'
import { Route, Routes } from 'react-router-dom'
import InformationTablePage from './modules/InformationModule/pages/InformationTablePage'
import NavbarComponent from './shared/components/navbar/NavbarComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserPage from './modules/customerModule/pages/UserPage'
import OfferPage from './modules/customerModule/pages/OfferPage'
import ReserveRoomPage from './modules/customerModule/pages/ReserveRoomPage'
import ReservationDetailsPage from './modules/customerModule/pages/ReservationDetailsPage'
import CreateCleaningTaskPage from './modules/cleaningModule/pages/CreateCleaningTaskPage'
import AccountPage from './shared/pages/AccountPage'
import ReceptionistPage from './modules/customerModule/pages/ReceptionistPage'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarComponent/>
        <main>
          <Routes>
            <Route path="/" element={<InformationTablePage/>}/>
            <Route path="/account" element={<AccountPage/>}/>
            <Route path="/offer" element={<OfferPage/>}/>
            <Route path="/create-reservation" element={<ReserveRoomPage/>}/>
            <Route path="/reservation-details/:id" element={<ReservationDetailsPage/>}/>
            <Route path="/add-cleaning-task" element={<CreateCleaningTaskPage/>}/>
            <Route path="/client-details" element={<UserPage/>}></Route>
            <Route path="receptionist-details" element={<ReceptionistPage/>}></Route>
          </Routes>
        </main>
    </QueryClientProvider>    
  )
}

export default App
