import React, { useEffect, useState, useRef } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import "./styling/component-styling.scss"

const ExerciseCard = (props: any) => {
  const [exercise, setExercise] = useState(props.exercise)
  const exerciseBeforeEdit = useRef(exercise)
  const [editing, setEditing] = useState(true)

  const updateExerciseName = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    let copy: Exercise = {name: exercise.name, sets: [...exercise.sets]}
    switch(name ){

    }
    
    copy.name = e.target.value
    setExercise(copy)
  }

  const generateEditableSet = (set: RepSet, i: number) => {
    return(
        <div className="repset-container">
            <div className="repset-input">
                {/* <input type="text" value={set.weight} className="repset-input-box" /> */}
            </div>
            <div className="repset-input">
                {/* <input type="text" value={set.reps} className="repset-input-box" /> */}
            </div>
        </div>
    )
  }

  const generateUneditableSet = (set: RepSet, i: number) => {
    return(
        <div className="repset-container">
            <div className="repset-input">
                <p>{set.weight} lbs</p>
            </div>
            <div className="repset-input">
                <p> x {set.reps}</p>
            </div>
        </div>
    )
  }

  return (
    <>
        <div>
            {editing ? <input type="text" value={exercise.name} onChange={(e) => updateExerciseName(e,0)}/>: <p>{exercise.name}</p>}
        </div>
        {editing ? exercise.sets.map((set: RepSet, i: number) => generateEditableSet(set,i)): 
            exercise.sets.map((set: RepSet, i: number) => generateUneditableSet(set,i))}
    </>
  );
};

export default ExerciseCard;