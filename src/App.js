import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanelUsers from "./pages/AdminPanelUsers";
import AdminPanelHR from "./pages/AdminPanelHr";
import AdminPanelJobs from "./pages/AdminPanelJobs";
import AdminPanel from "./pages/AdminPanel";
import OneUser from "./components/OneUser";
import HrPanel from "./pages/HrPanel";
import PostJob from "./pages/PostJob";
import Applicants from "./pages/Applicants";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HrPanelHome from "./pages/HrPanelHome";
import Jobs from "./pages/Jobs";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import jwt_decode from "jwt-decode";
import Application from "./pages/Application";
function App() {
  
  // var token = localStorage.getItem("User");
  // var decoded = jwt_decode(token);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/adminpanel/users' element={<AdminPanelUsers />}></Route>
          <Route path='/adminpanel/hr' element={<AdminPanelHR />}></Route>
          <Route path='/adminpanel/jobs' element={<AdminPanelJobs />}></Route>
          <Route path='/adminPanel' element={<AdminPanel />}></Route>
          <Route path='/application/:id' element={<Application />}></Route>

          {/* <Route path='/hrpanel' element={<HrPanel />}></Route> */}
          <Route path='/oneuser' element={<OneUser />}></Route>
          <Route path='hrPanel/jobs/Postjob' element={<PostJob />}></Route>
          <Route
            path='/hrPanel/applicants/:id'
            element={<Applicants />}
          ></Route>
          <Route path='/hrPanel/home' element={<HrPanelHome />}></Route>
          <Route path='/hrPanel/jobs' element={<Jobs />}></Route>
          <Route path='/hrPanel/jobs/EditJob/:id' element={<EditJob />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
