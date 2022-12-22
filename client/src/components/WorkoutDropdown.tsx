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
import StatusModal from "./StatusModal";
import "./styling/component-styling.scss"

const WorkoutDropdown = (props: any) => {
  const [workout, setWorkout] = useState(new Workout([]))
  const [workoutID, setWorkoutID] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editedIndex, setEditedIndex] = useState(-1)
  const [editedExercise, setEditedExercise] = useState(new Exercise("",[]))

  useEffect(() => {
    setWorkoutID(props.workoutPair[0])
    setWorkout(props.workoutPair[1])
  }, [props.workoutPair])

  useEffect(() => {
    let copy = new Workout([...workout.exercises])
    if(editedIndex === -1 || editedExercise.name === "" || editedExercise.sets.length === 0){
      return
    } else{
      copy.exercises[editedIndex] = editedExercise
      console.log(copy)
      console.log(editedIndex)
    }
    props.updateWorkouts(copy,props.day,workoutID,false)
  }, [editedIndex, editedExercise])

  const handleExerciseUpdate = (exercise: Exercise, exerciseNum: number, remove: boolean) => {
    if(remove) {
      let exercisesCopy = [...workout.exercises]
      exercisesCopy.splice(exerciseNum,1)
      let copy = new Workout(exercisesCopy)
      props.updateWorkouts(copy,props.day,workoutID,false)
      if(copy.exercises.length === 0) {
        setModalOpen(true)
      }
    } else{
      setEditedIndex(exerciseNum)
      setEditedExercise(exercise)
      console.log(exercise)
    }
  }

  const addExercise = () => {
    setWorkout(new Workout([...workout.exercises,new Exercise("",[new RepSet(0,0)])]))
  }

  const deleteWorkout = () => {
    props.updateWorkouts(workout,props.day,workoutID,true)
    setModalOpen(false)
  }

  const showDeleteModal = () => {
    setModalOpen(true)
  }

  const DeleteWorkoutModal = () => {
    return(
      <div>
        <StatusModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          modalTitle={"Are you sure you want to delete this workout?"}
          modalDescription={"You cannot undo this action"}
          children={
              <>
                <button onClick={() => setModalOpen(false)}>Keep Working</button>
                <button onClick={deleteWorkout}>Delete</button>
              </>
          }/>
      </div>
    )
  }

  const isNewSet = (exercise: Exercise): boolean => {
    return exercise.name === "" && exercise.sets.some((set: RepSet) => { return set.reps === 0 && set.weight === 0})
  }

  return (
    <>
      <Accordion style={{width: '100%'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>Day {props.day}</AccordionSummary>
          <AccordionDetails>
            <>
              <DeleteWorkoutModal/>
              {workout.exercises.map((exercise: Exercise, i: number) => {
                return(
                  <div className="exercise-card-container">
                    <ExerciseCard editable={isNewSet(exercise)} exercise={exercise} handleExerciseUpdate={handleExerciseUpdate} index={i}/>
                  </div>
                )
              })}
              <div>
                <div><button onClick={addExercise}>Add Exercise</button></div>
                <div><button onClick={showDeleteModal}>Delete Workout</button></div>
              </div>
            </>
          </AccordionDetails>
      </Accordion>
    </>
  );
};

export default WorkoutDropdown;