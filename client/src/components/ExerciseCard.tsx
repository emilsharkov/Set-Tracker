import React, { useEffect, useState, useRef } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import "./styling/component-styling.scss"

const ExerciseCard = (props: any) => {
  const [exercise, setExercise] = useState(props.exercise)
  const exerciseBeforeEdit = useRef(new Exercise(exercise.name, [...exercise.sets]))
  const [editing, setEditing] = useState(false)

  const updateExerciseName = (e: React.ChangeEvent<HTMLInputElement>, i: number, element: string) => {
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

  const generateSet = (set: RepSet, i: number) => {
    return(
        <div className="repset-container">
            <div className="repset-input">
                {editing ? <input type="number" value={set.weight} className="repset-input-box" onChange={(e) => updateExerciseName(e,i,"weight")}/>: <p>{set.weight} lbs</p>}
            </div>
            <div className="repset-input">
                {editing ? <input type="number" value={set.reps} className="repset-input-box" onChange={(e) => updateExerciseName(e,i,"reps")}/>: <p> x {set.reps}</p>}
            </div>
        </div>
    )
  }

  const editClicked = () => {
    setEditing(!editing)
  }

  const saveClicked = () => {
    setEditing(!editing)
    exerciseBeforeEdit.current = new Exercise(exercise.name, [...exercise.sets])
  }

  const cancelClicked = () => {
    setEditing(!editing)
    console.log(exerciseBeforeEdit.current)
    setExercise(exerciseBeforeEdit.current)
  }

  return (
    <>
        <div className="exercise-title-container">
            <div className="exercise-title">
                {editing ? <input type="text" value={exercise.name} onChange={(e) => updateExerciseName(e,-1,"name")}/>: <p>{exercise.name}</p>}
            </div>
            <div className="exercise-button-container">
                {editing ? <><button className="save-cancel-button" onClick={saveClicked}>Save</button> <button className="save-cancel-button" onClick={cancelClicked}>Cancel</button></>: 
                    <button className="edit-button" onClick={editClicked}>Edit</button>}
            </div>
        </div>
        {exercise.sets.map((set: RepSet, i: number) => generateSet(set,i))}
    </>
  );
};

export default ExerciseCard;