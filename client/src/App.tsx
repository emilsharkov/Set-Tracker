import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import AccountLogin from './components/AccountLogin'
import WorkoutRecord from './components/WorkoutRecord';


function App() {
  const [userID, setUserID] = useState(-1)
  const navigate = useNavigate()

  const loginWithUserID = (userID: number) => {
    setUserID(userID)
    navigate("/my-workouts")
  }

  const logout = () => {
    setUserID(-1)
    navigate("/login")
  }
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<AccountLogin loginWithUserID={loginWithUserID}/>}/>
        {userID !== -1 ? <Route path="/my-workouts" element={<WorkoutRecord userID={userID} logout={logout}/>} /> : null}
        <Route path="*" element={<Navigate to="/login"/>} />
      </Routes>
    </>
  );
}

export default App;
