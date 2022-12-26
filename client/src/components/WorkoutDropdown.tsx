import React, { useEffect, useState, useRef } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CoachMark, ICoachProps } from "react-coach-mark"
import ExerciseCard from "./ExerciseCard";
import StatusModal from "./StatusModal";
import "./styling/component-styling.scss"

const WorkoutDropdown = (props: any) => {
  const [workout, setWorkout] = useState(new Workout([]))
  const [workoutID, setWorkoutID] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editedIndex, setEditedIndex] = useState(-1)
  const [editedExercise, setEditedExercise] = useState(new Exercise("",[]))

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [rerender, setRerender] = useState(0)
  const [activatedNumber, setActivateNumber] = useState(0)

  useEffect(() => {
    setWorkoutID(props.workoutPair[0])
    setWorkout(props.workoutPair[1])
  }, [props.workoutPair])

  useEffect(() => { /* needed so that ref gets updates value to be passed as prop */
    setRerender(rerender + 1);
  }, [ref1.current])

  useEffect(() => {
    let copy = new Workout([...workout.exercises])
    if(editedIndex === -1 || editedExercise.name === "" || editedExercise.sets.length === 0){
      return
    } else{
      copy.exercises[editedIndex] = editedExercise
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
          icon={true}
          onClose={() => setModalOpen(false)} 
          modalTitle={"Are you sure?"}
          modalDescription={"Do you want to delete this workout? You cannot undo this action."}
          children={
              <>
                <button className="keep-working-modal-button" onClick={() => setModalOpen(false)}>Keep Working</button>
                <button className="delete-exercise-modal-button" onClick={deleteWorkout}>Delete</button>
              </>
          }/>
      </div>
    )
  }

  const isNewSet = (exercise: Exercise): boolean => {
    return exercise.name === "" && exercise.sets.some((set: RepSet) => { return set.reps === 0 && set.weight === 0})
  }

  const addDisabled = (): boolean => {
    let disabled = false;
    workout.exercises.forEach(exercise => {
      disabled = disabled || exercise.name === "" || exercise.sets.length === 0 
        || exercise.sets.some((repSet: RepSet) => (isNaN(repSet.reps) || isNaN(repSet.weight) || repSet.weight <= 0 || repSet.reps <= 0))
    })
    console.log(disabled)
    return disabled
  }

  const currCoach = ():ICoachProps => {
    const NextButton = <button className="coach-mark-button" onClick={() => setActivateNumber(activatedNumber + 1)}>Got It</button>;
    const coachList: Array<ICoachProps> = [
      {
          activate: activatedNumber === 0,
          component: <div><div className="coach-mark-message">Try clicking here to log your workout</div>{NextButton} </div>,
          reference: ref1,
          tooltip: { position: 'bottom' }
      },
    ]
    const coach = coachList[activatedNumber]
    return coach
  }

  const renderCoachMark = (props.day === 1 && workout.exercises.length === 1 && workout.exercises[0].name === ""
  && workout.exercises[0].sets.length === 1 && workout.exercises[0].sets[0].weight === 0
    && workout.exercises[0].sets[0].reps === 0)

  return (
    <>
      <Accordion ref={ref1} className="workout-theme" style={{width: '100%'}}>
          <AccordionSummary style={{color:'#455a64'}} expandIcon={<ExpandMoreIcon/>}>
            Day {props.day}
          </AccordionSummary>
          <AccordionDetails style={{color:'#455a64'}}>
            <>
              <DeleteWorkoutModal/>
              {workout.exercises.map((exercise: Exercise, i: number) => {
                return(
                  <div className="exercise-card-container">
                    <ExerciseCard 
                      editable={isNewSet(exercise)} 
                      exercise={exercise} 
                      handleExerciseUpdate={handleExerciseUpdate} 
                      index={i}
                      updateError={props.updateError}
                    />
                  </div>
                )
              })}
              <div className="split-div-container">
                <div className="split-div"><button className="workout-theme add-exercise" disabled={addDisabled()} onClick={addExercise}>Add Exercise</button></div>
                <div className="split-div flex-end"><button className="workout-theme add-exercise"onClick={showDeleteModal}>Delete Workout</button></div>
              </div>
            </>
          </AccordionDetails>
      </Accordion>
      {renderCoachMark ? <CoachMark {...currCoach()}/>: null}
    </>
  );
};

export default WorkoutDropdown;