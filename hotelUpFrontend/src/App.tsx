import './App.css'
import { Route, Routes } from 'react-router-dom'
import InformationTablePage from './modules/InformationModule/pages/InformationTablePage'
import NavbarComponent from './shared/components/navbar/NavbarComponent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserPage from './modules/customerModule/pages/UserPage'
import OfferPage from './modules/customerModule/pages/OfferPage'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarComponent/>
        <main>
          <Routes>
            <Route path="/" element={<InformationTablePage/>}/>
            <Route path="/account" element={<UserPage/>}/>
            <Route path="/offer" element={<OfferPage/>}/>
          </Routes>
        </main>
    </QueryClientProvider>    
  )
}

export default App
