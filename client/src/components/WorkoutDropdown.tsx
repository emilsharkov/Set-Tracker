import React, { useEffect, useState } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"
import { Accordion } from '@mui/material';
import "./styling/login-modal.scss"

const WorkoutDropdown = (props: any) => {
  const initialWorkouts: Workout[] = []
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [errorMessage, setErrorMessage] = useState("")

  return (
    <>
      <div>
        {JSON.stringify(props.workout)}
      </div>
    </>
  );
};

export default WorkoutDropdown;