import React, { useState } from "react";
import {login, createAccount, updateAccount, deleteAccount} from "../requests/UserRequests"

const LoginModal = () => {

  const [text, setText] = useState("Before Test")
  const [userID, setUserID] = useState("")

  
  async function createAccountNow() {
    const promise = await createAccount()
    setText(promise!.data)
  }
  
  return (
    <>
      
      <button onClick={() => createAccountNow()}>Login</button>
      <div><h1>{text}</h1></div>
    </>
  );
};

export default LoginModal;