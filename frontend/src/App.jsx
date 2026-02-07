import './App.css'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Home from './pages/customers/Home';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} exact path='/'/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function ProtectedRoute({children}){
    const id=1;
    return id? ({children}):(<Navigate to="/login" replace />)
}

export default App;


