import { Login } from "../interfaces/Login"
import { User } from "../interfaces/User"

async function login(): Promise<{data: string} | undefined> {
    let login: Login = {
        email: "yomama@gmail.com",
        password: "password"
    }

    try {
        const response = await fetch("http://localhost:5000/user/" + encodeURIComponent(JSON.stringify(login)), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json()
        console.log(data)
        return { data: JSON.stringify(data, null, '\t')}
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message)
        }
    }
} 

async function createAccount(): Promise<{data: string} | undefined> {
  let newUser: User = {
    firstName: "Yo",
    lastName: "Mama",
    email: "yomama@gmail.com",
    username: "yomama",
    password: "password"
  }

  try {
      const response = await fetch("http://localhost:5000/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {newUser} ) 
      });
      const data = await response.json()
      console.log(data)
      return { data: JSON.stringify(data, null, '\t')}
  } catch (err) {
      if(err instanceof Error){
        console.log(err.message)
      }
  }
}

async function updateAccount(): Promise<{data: string} | undefined> {
  let userID = 2
  let updatedUser: User = {
    firstName: "Yo1",
    lastName: "Mama1",
    email: "yomama1@gmail.com",
    username: "yomama1",
    password: "password1"
  }

  try {
      const response = await fetch("http://localhost:5000/user/" + userID, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {updatedUser} ) 
      });
      const data = await response.json()
      console.log(data)
      return { data: JSON.stringify(data, null, '\t')}
  } catch (err) {
      if(err instanceof Error){
          console.log(err.message)
      }
  }
}

async function deleteAccount(): Promise<{data: string} | undefined>{ 
  let userID = 2

  try {
      const response = await fetch("http://localhost:5000/user/" + userID, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json()
      console.log(data)
      return { data: JSON.stringify(data, null, '\t')}
  } catch (err) {
      if(err instanceof Error){
          console.log(err.message)
      }
  }
}

export {login, createAccount, updateAccount, deleteAccount}