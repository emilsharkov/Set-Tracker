import React, { useEffect, useState } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import "./styling/component-styling.scss"

const ExerciseCard = (props: any) => {
  const [exercise, setExercise] = useState(props.exercise)
  const [editing, setEditing] = useState(false)

  return (
    <>

    </>
  );
};

export default ExerciseCard;