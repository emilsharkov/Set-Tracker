import React, { useEffect, useState, useRef } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import "./styling/component-styling.scss"

const ExerciseCard = (props: any) => {
  const [exercise, setExercise] = useState(props.exercise)
  const [editing, setEditing] = useState(props.editable)

  const updateExerciseName = (e: React.ChangeEvent<HTMLInputElement>, i: number, element: string) => {
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

  const save = () => {
    if(exercise.name === "" || exercise.sets.length === 0 || exercise.sets.some((repSet: RepSet) => (isNaN(repSet.reps) || isNaN(repSet.weight)))){
      return
    }
    setEditing(!editing)
    props.handleExerciseUpdate(exercise,props.index)
  }

  const edit = () => {
    setEditing(!editing)
  }

  const generateSet = (set: RepSet, i: number) => {
    return(
        <div className="repset-container">
            <div className="repset-input">
                {editing ? <input type="number" value={set.weight} className="repset-input-box" 
                  onChange={(e) => updateExerciseName(e,i,"weight")}/>: <p>{set.weight} lbs</p>}
            </div>
            <div className="repset-input">
                {editing ? <><input type="number" value={set.reps} className="repset-input-box" onChange={(e) => updateExerciseName(e,i,"reps")} />
                  <button className="repset-input-box" onClick={() => removeSet(i)}>X</button></> : <p> x {set.reps}</p>}
            </div>
        </div>
    )
  }

  return (
    <>
        <div className="exercise-title-container">
            <div className="exercise-title">
                {editing ? <input type="text" value={exercise.name} onChange={(e) => updateExerciseName(e,-1,"name")}/>: <p>{exercise.name}</p>}
            </div>
            <div className="exercise-button-container">
                {editing ? <><button className="save-remove-button" onClick={save}>Save</button> <button className="save-remove-button"></button></>: 
                  <button className="edit-button" onClick={edit}>Edit</button>}
            </div>
        </div>
        {exercise.sets.map((set: RepSet, i: number) => generateSet(set,i))}
        {editing ? <div><button onClick={addSet}>+</button></div>: null}
    </>
  );
};

export default ExerciseCard;