import React, { useState } from "react";
import { login, createAccount, updateAccount, deleteAccount } from "../requests/UserRequests"
import { User } from "../Objects/User"
import { Login } from "../Objects/Login";
import "./styling/component-styling.scss"
const TrakaLogo = require('./../utils/logo-png.png')

const LoginModal = (props: any) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [displayLogin, setDisplayLogin] = useState(true)

  async function handleAccountCreation() {
    if (firstName && lastName && username && email && password) {
      const promise = await createAccount(new User(firstName, lastName, email, username, password))
      let user = JSON.parse(promise!.data)

      if (typeof user === 'string') {
        setErrorMessage("Your email is already being used by another account. Please sign in")
      } else {
        props.loginWithUserID(user.user_id)
      }
    } else {
      setErrorMessage("Fill All Fields")
    }
  }

  async function handleLogin() {
    if (email && password) {
      const promise = await login(new Login(email, password))
      let user = JSON.parse(promise!.data)

      if (typeof user === 'string') {
        setErrorMessage("User Not Found")
      } else {
        props.loginWithUserID(user.user_id)
      }
    } else {
      setErrorMessage("Enter Login")
    }
  }

  function handleInput(name: string, e: React.ChangeEvent<HTMLInputElement>): void {
    let value = e.target.value
    switch (name) {
      case ("firstName"):
        setFirstName(value)
        break
      case ("lastName"):
        setLastName(value)
        break
      case ("username"):
        setUsername(value)
        break
      case ("email"):
        setEmail(value)
        break
      case ("password"):
        setPassword(value)
        break
    }
  }

  function createAccountModal(){
    return(
      <>
        <div className="login create-account">
          <img src={TrakaLogo} className="logo-create-account"/>
          <input type="text"className="login-input" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => handleInput("firstName", e)} />
          <input type="text" className="login-input" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => handleInput("lastName", e)} />
          <input type="text" className="login-input" name="username" placeholder="Username" value={username} onChange={(e) => handleInput("username", e)} />
          <input type="text" className="login-input" name="email" placeholder="Email" value={email} onChange={(e) => handleInput("email", e)} />
          <input type="password" className="login-input" name="password" placeholder="Password" value={password} onChange={(e) => handleInput("password", e)} />
          {errorMessage === "" ? null: <p className="error"> {errorMessage} </p>}
          <button type="button" className="login-button" onClick={() => handleAccountCreation()}>Create Account</button>
          <button className="sign-up-in-button" onClick={() => { setDisplayLogin(!displayLogin); setErrorMessage("") }}>Sign In</button>
        </div>
      </>
    )
  }

  function signInModal(){
    return(
      <>
        <div className="login sign-in">
          <div className="logo-container"></div>
          <img src={TrakaLogo} className="logo-login"/>
          <input type="text" className="login-input" name="email" placeholder="Email" value={email} onChange={(e) => handleInput("email", e)} />
          <input type="password" className="login-input" name="password" placeholder="Password" value={password} onChange={(e) => handleInput("password", e)} />
          {errorMessage === "" ? null: <p className="error"> {errorMessage} </p>}
          <button type="button" className="login-button" onClick={() => handleLogin()}>Sign In</button>
          <button className="sign-up-in-button" onClick={() => { setDisplayLogin(!displayLogin); setErrorMessage("")}}>Create Account</button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="page-container-account">
        {displayLogin ? signInModal(): createAccountModal()}
      </div>
    </>
  );
};

export default LoginModal;