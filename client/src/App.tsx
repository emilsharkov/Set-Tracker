import React from 'react';
import './App.css';
import LoginModal from './components/LoginModal'
import WorkoutRecord from './components/WorkoutRecord';
import RestApiTest from './components/RestApiTest';

function App() {
  return (
    <>
      <WorkoutRecord/>
      <LoginModal/>
    </>
  );
}

export default App;
