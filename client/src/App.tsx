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
    console.log(userID)
    navigate("/my-workouts")
  }
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<AccountLogin loginWithUserID={loginWithUserID}/>}/>
        {userID !== -1 ? <Route path="/my-workouts" element={<WorkoutRecord userID={userID} />} /> : null}
        <Route path="*" element={<Navigate to="/login"/>} />
      </Routes>
    </>
  );
}

export default App;
