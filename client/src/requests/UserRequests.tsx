import { Login } from "../Objects/Login"
import { User } from "../Objects/User"

async function login(login: Login): Promise<{data: string} | undefined> {
    try {
        const response = await fetch("http://localhost:5000/user/" + encodeURIComponent(JSON.stringify(login)), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json()
        
        return { data: JSON.stringify(data, null, '\t')}
    } catch (err) {
        if(err instanceof Error){
            
        }
    }
} 

async function createAccount(newUser: User): Promise<{data: string} | undefined> {
  try {
      const response = await fetch("http://localhost:5000/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {newUser} ) 
      });
      const data = await response.json()
      
      return { data: JSON.stringify(data, null, '\t')}
  } catch (err) {
      if(err instanceof Error){
        
      }
  }
}

async function updateAccount(userID: number, updatedUser: User): Promise<{data: string} | undefined> {
  try {
      const response = await fetch("http://localhost:5000/user/" + userID, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {updatedUser} ) 
      });
      const data = await response.json()
      
      return { data: JSON.stringify(data, null, '\t')}
  } catch (err) {
      if(err instanceof Error){
          
      }
  }
}

async function deleteAccount(userID: number): Promise<{data: string} | undefined>{ 
  try {
      const response = await fetch("http://localhost:5000/user/" + userID, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json()
      
      return { data: JSON.stringify(data, null, '\t')}
  } catch (err) {
      if(err instanceof Error){
          
      }
  }
}

export {login, createAccount, updateAccount, deleteAccount}