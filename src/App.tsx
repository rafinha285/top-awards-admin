import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import {UserProvider} from "./context/UserContext.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {NavigationService} from "./service/NavigationService.tsx";
import {useEffect} from "react";
import {EventCreationPage} from "./pages/creationPages/EventCreationPage.tsx";
import {EventEditPage} from "./pages/editPages/EventEditPage.tsx";
import {EventListPage} from "./pages/listPages/EventListPage.tsx";
import {CategoryListPage} from "./pages/listPages/CategoryListPage.tsx";
import {CategoryCreationPage} from "./pages/creationPages/CategoryCreationPage.tsx";
import {CategoryEditPage} from "./pages/editPages/CategoryEditPage.tsx";
import {NomineeListPage} from "./pages/listPages/NomineeListPage.tsx";
import {NomineeEditPage} from "./pages/editPages/NomineeEditPage.tsx";
import {NomineeCreationPage} from "./pages/creationPages/NomineeCreationPage.tsx";
import {UserListPage} from "./pages/listPages/UserListPage.tsx";
import {UserEditPage} from "./pages/editPages/UserEditPage.tsx";

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

                    <Route path="/edit/event" element={<EventListPage/>}/>
                    <Route path="/create/event" element={<EventCreationPage/>}/>
                    <Route path="/edit/event/:id" element={<EventEditPage/>}/>

                    <Route path="/edit/category" element={<CategoryListPage/>}/>
                    <Route path="/create/category" element={<CategoryCreationPage/>}/>
                    <Route path="/edit/category/:id" element={<CategoryEditPage/>}/>

                    <Route path="/edit/nominee" element={<NomineeListPage/>}/>
                    <Route path="/edit/nominee/:id" element={<NomineeEditPage/>}/>
                    <Route path="/create/nominee" element={<NomineeCreationPage/>}/>

                    <Route path="/moderate/users" element={<UserListPage/>}/>
                    <Route path="/edit/users/:id" element={<UserEditPage/>}/>
                </Routes>
            </UserProvider>
        </Router>
    </>
  )
}

export default App
