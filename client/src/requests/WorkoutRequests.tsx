import { Workout } from "../Objects/Workout"

async function getAllWorkouts(userID: number): Promise<{data: string} | undefined> {    
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID, {
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

async function getWorkout(userID: number, workoutID: number): Promise<{data: string} | undefined> {
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID + "/" + workoutID, {
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

async function addWorkout(userID: number, newWorkout: Workout): Promise<{data: string} | undefined> {
    
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( {newWorkout} ) 
        });
        const data = await response.json()
        
        return { data: JSON.stringify(data, null, '\t')}
    } catch (err) {
        if(err instanceof Error){
            
        }
    }
}

async function editWorkout(userID: number, workoutID: number, updatedWorkout: Workout): Promise<{data: string} | undefined> {
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID + "/" + workoutID, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( {updatedWorkout} ) 
        });
        const data = await response.json()
        
        return { data: JSON.stringify(data, null, '\t')}
    } catch (err) {
        if(err instanceof Error){
            
        }
    }
} 

async function deleteWorkout(userID: number, workoutID: number): Promise<{data: string} | undefined> {
    try {
        const response = await fetch("http://localhost:5000/workout/" + userID + "/" + workoutID, {
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

export {getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout}