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
  const [workout, setWorkout] = useState(props.workout)
  const [errorMessage, setErrorMessage] = useState("")
  const [editedIndex, setEditedIndex] = useState(-1)
  const [editedExercise, setEditedExercise] = useState({})

  useEffect(() => {
    if(Object.keys(editedExercise).length === 0){
      workout.exercises.splice(editedIndex,1)
    } else{
      workout.exercises[editedIndex] = editedExercise
    }
    setWorkout(workout)
  }, [editedIndex, editedExercise])

  const handleExerciseUpdate = (exercise: Exercise, exerciseNum: number) => {
    setEditedIndex(exerciseNum)
    setEditedExercise(exercise)
  }

  const generateExercise = (exercise: Exercise) => {
    return(
      <div>
        <ExerciseCard exercise={exercise} handleExerciseUpdate={handleExerciseUpdate}/>
      </div>
    )
  }

  return (
    <>
            <Accordion style={{width: '100%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>Day {props.day}</AccordionSummary>
                <AccordionDetails >
                  {workout.exercises.map(generateExercise)}
                </AccordionDetails>
            </Accordion>
    </>
  );
};

export default WorkoutDropdown;