import React, { useState } from "react";
import "./styling/login-modal.scss"
import {login, createAccount, updateAccount, deleteAccount} from "../requests/UserRequests"
import Card from '@mui/material/Card';
import { User } from "../Objects/User"
import { Login } from "../Objects/Login";

const LoginModal = () => {

  const [text, setText] = useState("")
  const [userID, setUserID] = useState(1)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  
  async function handleAccountCreation() {
    if(firstName && lastName && username && email && password){
      const promise = await createAccount(new User(firstName, lastName, username, email, password))
      let user = JSON.parse(promise!.data)
      
      if(typeof user === 'string'){
        setErrorMessage("Your email is already being used by another account. Please sign in")
      } else{
        setUserID(user.userID)
      }
    } else{
      setErrorMessage("Fill All Fields")
    }
  }

  async function handleLogin() {
    if(email && password){
      const promise = await login(new Login(email, password))
      let user = JSON.parse(promise!.data)
      
      if(typeof user === 'string'){
        setErrorMessage("User Not Found")
      } else{
        setUserID(user.userID)
      }
    } else{
      setErrorMessage("Enter Login")
    }
  }

  function handleInput(name: string, e: React.ChangeEvent<HTMLInputElement>): void {
    let value = e.target.value
    switch(name){
      case("firstName"):
        setFirstName(value)
        break
      case("lastName"):
        setLastName(value)
        break
      case("username"):
        setUsername(value)
        break
      case("email"):
        setEmail(value)
        break
      case("password"):
        setPassword(value)
        break
    }
  }

  return (
    <>
      {errorMessage}
      {email}
      {password}
      {firstName}
      {lastName}
      {username}
      <div className="page-container">
        <Card className='login-card' variant="outlined">
          <form>
            <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => handleInput("email", e)} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => handleInput("password", e)}/>
            <button type="button" onClick={() => handleLogin()}>Login</button>
          </form>

          <form>
            <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => handleInput("firstName", e)} />
            <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => handleInput("lastName", e)} />
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => handleInput("username", e)} />
            <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => handleInput("email", e)} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => handleInput("password", e)}/>

            <button type="button" onClick={() => handleAccountCreation()}>Create Account</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginModal;