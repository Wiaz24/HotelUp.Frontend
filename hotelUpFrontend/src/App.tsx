import './App.css'
import { Route, Routes } from 'react-router-dom'
import InformationTablePage from './modules/InformationModule/pages/InformationTablePage'


function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<InformationTablePage/>}/>
      </Routes>
    </main>
  )
}

export default App
