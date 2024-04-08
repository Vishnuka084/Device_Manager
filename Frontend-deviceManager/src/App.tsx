import './App.css'
import Header from "./components/header/Header.tsx";
import LoginView from "./view/LoginView.tsx";
import SignUpView from "./view/SignUpView.tsx";
import AddLocationView from "./view/AddLocationView.tsx";
import AddDeviceView from "./view/AddDeviceView.tsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import DashBoardView from "./view/DashBoardView.tsx";



function App() {
  const [islog, setIslog] = useState(false)


  useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            setIslog(false)
        } else {
            setIslog(true)
        }
    }, []);

  return (
    <BrowserRouter>
          <Header log={islog} loginFunction={setIslog}/>
          <Routes>
              <Route path={'/login'} element={<LoginView isLogin={setIslog}/>}/>
              <Route path={'/signup'} element={<SignUpView/>}/>
              <Route path={'/'} element={<DashBoardView/>}/>
              <Route path={"/addLocation"} element={<AddLocationView/>}/>
              <Route path={"/addDevice"} element={<AddDeviceView/>}/>


          </Routes>

    </BrowserRouter>


  )
}

export default App
