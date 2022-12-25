import React, { useEffect, useState, useRef } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"
import WorkoutDropdown from "./WorkoutDropdown";
import "./styling/component-styling.scss"

const WorkoutRecord = (props: any) => {
  const initialWorkouts: [number,Workout][] = []
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [userID, setUserID] = useState(-1)
  const [errorMessage, setErrorMessage] = useState("")
  const unregisteredIndex = useRef(-1)

  useEffect(() => {
    if(props.userID !== -1 && props.userID !== undefined){
      setUserID(props.userID) 
    }
  },[props.userID])

  useEffect(() => {
    // const resetErrorMessage = async () => {
    //   const timeout = async() => {
    //     return new Promise(resolve => setTimeout(resolve, 10))
    //   }
    //   await timeout()
    //   setErrorMessage("")
    // }

    // if(errorMessage === ""){ return }
    // resetErrorMessage()
  },[errorMessage])

  useEffect(() => {
    const fetchWorkouts = async () => {
      if(userID === -1) { return }
      
      let fetchedWorkouts = await getAllWorkouts(userID)
      if(fetchedWorkouts!.data === '"User Not Found"'){ return }
  
      let dbWorkouts: [number,Workout][] = []
      let databaseEntries = JSON.parse(fetchedWorkouts!.data)
      
      databaseEntries.forEach((databaseEntry: any) => {
        let dbWorkout: Workout = JSON.parse(databaseEntry.workout_details)
        dbWorkouts!.push([databaseEntry.workout_id,dbWorkout])
      });

      setWorkouts(sortList(dbWorkouts))
    }
    fetchWorkouts()
  },[userID])

  const sortList = (dbWorkouts: [number,Workout][]): [number,Workout][] => {
    return dbWorkouts.sort((a: [number,Workout], b: [number,Workout]) => {
      return b[0] - a[0]
    })
  }

  const addWorkoutToList = () => {
    let emptyWorkout: Workout = {exercises: [new Exercise("",[new RepSet(0,0)])]}
    setWorkouts([[unregisteredIndex.current,emptyWorkout],...workouts])
    unregisteredIndex.current--
  }

  const updateWorkouts = async (workout: Workout, workoutNum: number, workoutID: number, remove: boolean) => {
    let copy = [...workouts]
    let modifyIndex = workouts.length - workoutNum
    if(remove){
      copy.splice(modifyIndex,1)
      if(workoutID >= 0){
        deleteWorkout(userID,workoutID)
      }
    } else{
      let response = workoutID < 0 ? await addWorkout(userID,workout): await editWorkout(userID, workoutID, workout)
      let returnedEntry = JSON.parse(response!.data)
      copy[modifyIndex] = [returnedEntry.workout_id,workout]
    }
    setWorkouts(copy)
  }

  const updateError = (message: string) => {
    setErrorMessage(message)
  }

  const ErrorModal = () => {
    return(
      <div className="error-modal" >
        <p className="error-message-p">{errorMessage}</p>
      </div>
    )
  }

  return (
    <>
      <div className="page-container-workout">
        <div className="logout-button-div">
          <button className= "add-workout-button workout-theme" onClick={props.logout}>Logout</button>
        </div>
        <div className="records-container">
          <div className="title-button-container">
            <div className="title-container">
              <p style={{color:'#455a64'}}>Your Workouts</p>
            </div>
            <div className="add-workout-div">
              <button className="add-workout-button workout-theme" onClick={addWorkoutToList}>
                Add Workout
              </button>
            </div>
          </div>
          {workouts.map((workoutPair,i) => {
            return (
              <div className="accordian-spacing">
                <WorkoutDropdown 
                  workoutPair={workoutPair} 
                  updateWorkouts={updateWorkouts} 
                  day={workouts.length-i}
                  updateError={updateError}
                />
              </div>)
          })}
        </div>
        {errorMessage !== "" ? <ErrorModal/>: null}
      </div>
    </>
  );
};

export default WorkoutRecord;