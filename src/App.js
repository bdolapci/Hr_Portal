import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import OneUser from "./components/OneUser";
import HrPanel from "./pages/HrPanel";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/adminpanel' element={<AdminPanel />}></Route>
          <Route path='/hrpanel' element={<HrPanel />}></Route>
          <Route path='/oneuser' element={<OneUser />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
