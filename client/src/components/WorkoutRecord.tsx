import React, { useState } from "react";
import { Button, Card } from '@mui/material';
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { Set } from "../Objects/Set"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"
import {v4 as generateID} from "uuid";


const WorkoutRecord = () => {
  const initialWorkouts = new Map<string, Workout>()
  const [workouts, setWorkouts] = useState(initialWorkouts)
  // const [tempWorkoutID, setWorkoutTempID] = useState(0) //workout_id of edited workout

  function addWorkout() {
    let workoutID = generateID()
    let exerciseID = generateID()
    let newExercise = new Exercise(exerciseID, "Exercise 1", [new Set(0,0)])
    let emptyWorkout: Workout = new Workout(workoutID, new Map().set(exerciseID, newExercise))
    setWorkouts(map => new Map(workouts.set(workoutID, emptyWorkout)))
  }

  function addExercise(workoutID: string) {
    let exerciseID = generateID()
    let newExercise: Exercise = new Exercise(exerciseID, "Exercise 1", [new Set(0,0)])
    let thisWorkout = workouts.get(workoutID)
    thisWorkout?.exercises.set(exerciseID, newExercise)
    setWorkouts(map => new Map(workouts.set(workoutID, thisWorkout!)))
  }

  function addSet(workoutID: string, exerciseID: string){
    let workout = workouts.get(workoutID)
    let exercise = workout?.exercises.get(exerciseID)
    exercise?.sets.push(new Set(0,0))
    setWorkouts(map => new Map(workouts.set(workoutID, workout!)))
  }

  function generateWorkouts() {
    let workoutFromMap = Array.from(workouts.values())
    console.log(workoutFromMap)
    return(
      <>
        {workoutFromMap.map(generateWorkout)}
        <Button variant="text" onClick={() => addWorkout()}>Add Workout</Button>
      </>
    )
  }

  function generateWorkout(workout: Workout){
    
    return(
      <>
        <div>
          <>
            {workout.workoutUUID}
            {Array.from(workout.exercises).map( ([_, value]) => generateExercise(value, workout.workoutUUID) )}
            <Button variant="text" onClick={() => addExercise(workout.workoutUUID)}>Add Exercise</Button>
          </>
        </div>
      </>
    )
  }

  function generateExercise(exercise: Exercise, workoutUUID: string){
    return(
      <>
        <form>
          <input type="text" name="exerciseName" placeholder="Exercise Name"  />
        </form>
        {exercise.sets.map(generateSet)}
        <Button variant="text" onClick={() => addSet(workoutUUID, exercise.exerciseUUID)}>Add Set</Button>
      </>
    )
  }

  function generateSet(set: Set){
    
    return(
      <>
        <form>
          <input type="text" name="reps" placeholder="Reps" value={set.reps} />
          <input type="text" name="weight" placeholder="Weight" value={set.weight} />
        </form>
        
      </>
    )
  }

  return (
    <>
      <div className="page-container">
          <>
          {/* {JSON.stringify(Object.fromEntries(workouts))} */}
          {generateWorkouts()}
          </>
          
      </div>
    </>
  );
};

export default WorkoutRecord;