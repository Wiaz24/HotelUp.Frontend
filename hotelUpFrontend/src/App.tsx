import './App.css'
import { Route, Routes } from 'react-router-dom'
import InformationTablePage from './modules/InformationModule/pages/InformationTablePage'
import NavbarComponent from './shared/components/navbar/NavbarComponent'


function App() {
  return (<>
    <NavbarComponent/>
      <main>
        <Routes>
          <Route path="/" element={<InformationTablePage/>}/>
        </Routes>
      </main>
  </>)
}

export default App
