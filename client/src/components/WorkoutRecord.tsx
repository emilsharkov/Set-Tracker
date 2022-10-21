import React, { useState } from "react";
import { Button, Card } from '@mui/material';
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { Set } from "../Objects/Set"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"

const WorkoutRecord = () => {
  const initialWorkouts: Workout[] = []
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [tempWorkoutID, setWorkoutTempID] = useState(0) //workout_id of edited workout

  function addWorkout() {
    let newWorkout: Workout = new Workout(tempWorkoutID, [])
    setWorkouts([...workouts, newWorkout])
  }

  function addExercise(workoutID: number) {
    let newExercise: Exercise = new Exercise('', [])
    for (let i = 0; i < workouts.length; i++) {
      if(workouts[i].workoutID === workoutID){
        let workoutsCopy = [...workouts]
        workoutsCopy[i].exercises.push(newExercise)
        setWorkouts(workoutsCopy)
      }
    }
  }

  function generateWorkouts() {
    return(
      <>
        {workouts.map(generateWorkout)}
        <Button variant="text" onClick={() => addWorkout()}>Add Workout</Button>
      </>
    )
  }

  function generateWorkout(workout: Workout){
    
    return(
      <>
        <div>
          {workout.workoutID}
          {workout.exercises.map(generateExercise)}
        </div>
      </>
    )
  }

  function generateExercise(exercise: Exercise){
    
    return(
      <>
        <form>
          <input type="text" name="exerciseName" placeholder="Exercise Name"  />
        </form>
        {exercise.name}
        {exercise.sets.map(generateSet)}
      </>
    )
  }

  function generateSet(set: Set){
    
    return(
      <>
        <input type="text" name="reps" placeholder="Reps" value={set.reps} />
        <input type="text" name="weight" placeholder="Weight" value={set.weight} />
        {"reps " + set.reps}
        {"weight " + set.weight}
      </>
    )
  }

  return (
    <>
      <div className="page-container">
          {JSON.stringify(workouts)}
          {generateWorkouts()}
          <div>
            <Button variant="text" onClick={() => addExercise(0)}>Add Exercise</Button>
          </div>
      </div>
    </>
  );
};

export default WorkoutRecord;