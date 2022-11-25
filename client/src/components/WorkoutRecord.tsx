import React, { useEffect, useState } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"
import WorkoutDropdown from "./WorkoutDropdown";
import "./styling/component-styling.scss"


const WorkoutRecord = () => {
  const initialWorkouts: Workout[] = []
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [userID, setUserID] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchWorkouts = async () => {
      let fetchedWorkouts = await getAllWorkouts(userID)
      if(fetchedWorkouts!.data === '"User Not Found"'){ return }

      let dbWorkouts: Workout[] = []
      let databaseEntries = JSON.parse(fetchedWorkouts!.data)
      databaseEntries.forEach((databaseEntry: any) => {
        console.log(JSON.parse(databaseEntry.workout_details))
        dbWorkouts!.push(JSON.parse(databaseEntry.workout_details))
      });
      setWorkouts(dbWorkouts)
    }
    fetchWorkouts()
  },[])

  return (
    <>
      <div className="page-container">
        <div className="records-container">
          <div className="title-button-container">
            <div className="title-container">
              <p>Your Workouts</p>
            </div>
            <div className="add-workout-div">
              <button className="add-workout-button" onClick={() => setWorkouts([...workouts,new Workout([])])}>
                Add Workout
              </button>
            </div>
          </div>
          
          {workouts.slice(0,25).map((workout,i) => {
            return (<div className="accordian-spacing">
                      <WorkoutDropdown workout={workout} day={i+1}/>
                    </div>)
          })}
        </div>
      </div>
    </>
  );
};

export default WorkoutRecord;