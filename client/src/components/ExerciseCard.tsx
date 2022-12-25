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

  useEffect(() => {
    setExercise(props.exercise)
    setEditing(props.editable)
  }, [props])

  const updateExercise = (e: React.ChangeEvent<HTMLInputElement>, i: number, element: string) => {
    let copy: Exercise = {name: exercise.name, sets: [...exercise.sets]}
    switch(element){
        case 'name':
            copy.name = e.target.value
            break
        case 'weight':
            copy.sets[i].weight = e.target.valueAsNumber
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

  const saveDisabled = (): boolean => {
    let containsInvalid = exercise.sets.some((repSet: RepSet) => (isNaN(repSet.reps) || isNaN(repSet.weight) || repSet.weight === 0 || repSet.reps === 0))
    
    return exercise.name === "" || exercise.sets.length === 0 || containsInvalid
  }

  const saveExercise = () => {
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
            <li>
              <div className="list-item">
                <div className="repset-input">
                    {editing ? <input placeholder="Weight (lbs)" type="number" value={set.weight !== 0 ? set.weight: ""} className="repset-input-box workout-theme" 
                      onChange={(e) => updateExercise(e,i,"weight")}/>: <p>{set.weight} lbs</p>}
                </div>
                <div className="repset-input">
                    {editing ? <><input placeholder="Repetitions" type="number" value={set.reps !== 0 ? set.reps: ""} className="repset-input-box workout-theme" onChange={(e) => updateExercise(e,i,"reps")} />
                      <button className="repset-input-box delete-set-button workout-theme" onClick={() => removeSet(i)}>X</button></> : <p style={{marginLeft:'.3rem'}}>x {set.reps}</p>}
                </div>
              </div>
                
            </li>
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
              {editing ? <input placeholder="Exercise Name" className="exercise-title-input workout-theme" type="text" value={exercise.name} onChange={(e) => updateExercise(e,-1,"name")}/>: exercise.name}
          </div>
          <div className="exercise-button-container">
              {editing ? <><button className="save-remove-button workout-theme" disabled={saveDisabled()} onClick={saveExercise}>Save</button> <button className="save-remove-button workout-theme" onClick={showRemoveModal}>Remove</button></>: 
              <button className="edit-button workout-theme" onClick={editExercise}>Edit</button>}
          </div>
      </div>
      <ul className={editing ? 'unorder-list-editing': 'unorder-list-not-editing'}>{exercise.sets.map((set: RepSet, i: number) => generateSet(set,i))}</ul>
      {editing ? <div><button className="add-set-button workout-theme" onClick={addSet}>+</button></div>: null}
    </>
  );
};

export default ExerciseCard;