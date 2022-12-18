import React, { useEffect, useState, useRef } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import StatusModal from "./StatusModal"
import "./styling/component-styling.scss"

const ExerciseCard = (props: any) => {
  const [exercise, setExercise] = useState(props.exercise)
  const [editing, setEditing] = useState(props.editable)
  const [modalOpen, setModalOpen] = useState(false)


  const updateExercise = (e: React.ChangeEvent<HTMLInputElement>, i: number, element: string) => {
    let copy: Exercise = {name: exercise.name, sets: [...exercise.sets]}
    switch(element){
        case 'name':
            copy.name = e.target.value
            break
        case 'weight':
            copy.sets[i].weight = e.target.valueAsNumber
            console.log(copy.sets[i].weight)
            break
        case 'reps':
            copy.sets[i].reps = e.target.valueAsNumber
            break
    }
    setExercise(copy)
  }

  const addSet = () => {
    let copy: Exercise = {name: exercise.name, sets: [...exercise.sets, new RepSet(0,0)]}
    setExercise(copy)
  }

  const removeSet = (index: number) => {
    let copy: Exercise = {name: exercise.name, sets: [...exercise.sets]}
    copy.sets.splice(index,1)
    setExercise(copy)
  }

  const saveExercise = () => {
    if(exercise.name === "" || exercise.sets.length === 0 || exercise.sets.some((repSet: RepSet) => (isNaN(repSet.reps) || isNaN(repSet.weight) || repSet.weight === 0 || repSet.reps === 0))){
      return
    }
    setEditing(!editing)
    props.handleExerciseUpdate(exercise,props.index, false)
  }

  const editExercise = () => {
    setEditing(!editing)
  }

  const removeExercise = () => {
    let copy: Exercise = {name: exercise.name, sets: [...exercise.sets, new RepSet(0,0)]}
    props.handleExerciseUpdate(exercise,props.index,true)
    setModalOpen(false)
  }

  const generateSet = (set: RepSet, i: number) => {
    return(
      <>
        <div className="repset-container">
            <div className="repset-input">
                {editing ? <input type="number" value={set.weight} className="repset-input-box" 
                  onChange={(e) => updateExercise(e,i,"weight")}/>: <p>{set.weight} lbs</p>}
            </div>
            <div className="repset-input">
                {editing ? <><input type="number" value={set.reps} className="repset-input-box" onChange={(e) => updateExercise(e,i,"reps")} />
                  <button className="repset-input-box" onClick={() => removeSet(i)}>X</button></> : <p> x {set.reps}</p>}
            </div>
        </div>
      </>
    )
  }

  const showRemoveModal = () => {
    setModalOpen(true)
  }

  const RemoveExerciseModal = () => {
    return(
      <div>
        <StatusModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          modalTitle={"Are you sure you want to delete this exercise?"}
          modalDescription={"You cannot undo this action"}
          children={
              <>
                <button onClick={() => setModalOpen(false)}>Keep Working</button>
                <button onClick={removeExercise}>Delete</button>
              </>
          }/>
      </div>
    )
  }

  return (
    <>
      <RemoveExerciseModal/>
      <div className="exercise-title-container">
          <div className="exercise-title">
              {editing ? <input type="text" value={exercise.name} onChange={(e) => updateExercise(e,-1,"name")}/>: <p>{exercise.name}</p>}
          </div>
          <div className="exercise-button-container">
              {editing ? <><button className="save-remove-button" onClick={saveExercise}>Save</button> <button className="save-remove-button" onClick={showRemoveModal}>Remove</button></>: 
                <button className="edit-button" onClick={editExercise}>Edit</button>}
          </div>
      </div>
      {exercise.sets.map((set: RepSet, i: number) => generateSet(set,i))}
      {editing ? <div><button onClick={addSet}>+</button></div>: null}
    </>
  );
};

export default ExerciseCard;