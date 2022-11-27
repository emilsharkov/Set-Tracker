import React, { useEffect, useState } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExerciseCard from "./ExerciseCard";
import "./styling/component-styling.scss"

const WorkoutDropdown = (props: any) => {
  const [workout, setWorkout] = useState(new Workout(-1,[]))
  const [errorMessage, setErrorMessage] = useState("")
  const [editedIndex, setEditedIndex] = useState(-1)
  const [editedExercise, setEditedExercise] = useState(new Exercise("",[]))
  const [workoutID, setWorkoutID] = useState(props.workoutID)

  useEffect(() => {
    setWorkout(props.workout)
  }, [props.workout])

  useEffect(() => {
    let copy = new Workout(workout.workoutID,[...workout.exercises])
    if(editedIndex === -1 || editedExercise.name === "" || editedExercise.sets.length === 0){
      return
    } else{
      copy.exercises[editedIndex] = editedExercise
    }
    setWorkout(copy)
  }, [editedIndex, editedExercise])

  const handleExerciseUpdate = (exercise: Exercise, exerciseNum: number) => {
    setEditedIndex(exerciseNum)
    setEditedExercise(exercise)
  }

  return (
    <>
      <Accordion style={{width: '100%'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>Day {props.day}</AccordionSummary>
          <AccordionDetails >
            {workout.exercises.map((exercise: Exercise, i: number) => {
              return(
                <div className="exercise-card-container">
                  <ExerciseCard editable={workout.workoutID < 0} exercise={exercise} handleExerciseUpdate={handleExerciseUpdate} index={i}/>
                </div>
              )
            })}
          </AccordionDetails>
      </Accordion>
    </>
  );
};

export default WorkoutDropdown;