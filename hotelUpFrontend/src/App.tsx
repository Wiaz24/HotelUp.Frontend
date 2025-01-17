import './App.css'
import { Route, Routes } from 'react-router-dom'
import InformationTablePage from './modules/InformationModule/pages/InformationTablePage'
import NavbarComponent from './shared/components/navbar/NavbarComponent'
import UserPage from './modules/userModule/pages/UserPage'



function App() {
  return (<>
    <NavbarComponent/>
      <main>
        <Routes>
          <Route path="/" element={<InformationTablePage/>}/>
          <Route path="/account" element={<UserPage/>}/>
        </Routes>
      </main>
  </>)
}

export default App
