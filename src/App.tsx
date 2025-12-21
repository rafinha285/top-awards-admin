import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import {UserProvider} from "./context/UserContext.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {NavigationService} from "./service/NavigationService.tsx";
import {useEffect} from "react";
import {EventCreationPage} from "./pages/creationPages/EventCreationPage.tsx";

const NavigationSetup = () => {
    const navigate = useNavigate();
    useEffect(() => {
        NavigationService.setNavigator(navigate);
    }, [navigate]);
    return null; // Não renderiza nada visualmente
};

function App() {
  return(
    <>
        <Router>
            <NavigationSetup />
            <UserProvider>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/create/event" element={<EventCreationPage type={"event"}/>}/>
                </Routes>
            </UserProvider>
        </Router>
    </>
  )
}

export default App
