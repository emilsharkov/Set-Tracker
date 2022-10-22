import React, { useState } from "react";
import {login, createAccount, updateAccount, deleteAccount} from "../requests/UserRequests"
import {getWorkout, getAllWorkouts, addWorkout, editWorkout, deleteWorkout} from "../requests/WorkoutRequests"

const RestApiTest = () => {

  const [text, setText] = useState("Before Test")
  const [userID, setUserID] = useState("")

  async function testFetch(){
    const promise = await getAllWorkouts(0)
    setText(promise!.data)
  } 

  return (
    <>
      <button onClick={() => testFetch()}>Click</button>
      <div><h1>{text}</h1></div>
    </>
  );
};

export default RestApiTest;