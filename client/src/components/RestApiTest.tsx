import React, { useState } from "react";

const RestApiTest = () => {

    const [text, setText] = useState("Before Test")

    interface User {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
    }

    async function testFetch(){
      let newUser: User = {
        firstName: "Yo",
        lastName: "Mama",
        email: "yomama@gmail.com",
        username: "yomama",
        password: "password"
      } 
      const body = { newUser }
      
        try {
            const response = await fetch("http://localhost:5000/user", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify( body ) 
            });
            const data = await response.json()
            console.log(data)
            setText(JSON.stringify(data, null, '\t'))
            // setText(data)
        } catch (err) {
            if(err instanceof Error){
                console.log(err.message)
            }
        }
    } 
  

  return (
    <>
      <button onClick={() => testFetch()}>Click</button>
      <div><h1>{text}</h1></div>
    </>
  );
};

export default RestApiTest;