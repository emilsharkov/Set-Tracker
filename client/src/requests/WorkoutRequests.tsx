import { Workout } from "../interfaces/Workout"

async function getAllWorkouts(): Promise<{data: string} | undefined> {
    let userID = 1;
    
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID, {
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

async function getWorkout(): Promise<{data: string} | undefined> {
    let userID = 1;
    let workoutID = 6;
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID + "/" + workoutID, {
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

async function addWorkout(): Promise<{data: string} | undefined> {
    let userID = 1;
    let newWorkout: Workout = {
        exercises: []
    }
    
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( {newWorkout} ) 
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

async function editWorkout(): Promise<{data: string} | undefined> {
    let userID = 1;
    let workoutID = 6;
    let updatedWorkout: Workout = {
        exercises: [{name:"lat pulldown", sets: [ { weight:195, reps:8} ] }]
    }
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID + "/" + workoutID, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( {updatedWorkout} ) 
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

async function deleteWorkout(): Promise<{data: string} | undefined> {
    let userID = 1;
    let workoutID = 6;
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID + "/" + workoutID, {
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

export {getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout}