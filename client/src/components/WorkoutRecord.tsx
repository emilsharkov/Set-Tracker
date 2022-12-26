import React, { useEffect, useState, useRef } from "react";
import { Workout } from "../Objects/Workout";
import { Exercise } from "../Objects/Exercise";
import { RepSet } from "../Objects/RepSet"
import { getAllWorkouts, getWorkout, addWorkout, editWorkout, deleteWorkout } from "../requests/WorkoutRequests"
import WorkoutDropdown from "./WorkoutDropdown";
import StatusModal from "./StatusModal";
import { CoachMark, ICoachProps } from "react-coach-mark"
import "./styling/component-styling.scss"

const WorkoutRecord = (props: any) => {
  const initialWorkouts: [number,Workout][] = []
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [userID, setUserID] = useState(-1)
  const [errorMessage, setErrorMessage] = useState("")  
  const [getStartedModal, setGetStartedModal] = useState(false)
  const unregisteredIndex = useRef(-1)

  //coach mark
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [rerender, setRerender] = useState(0)
  const [activatedNumber, setActivateNumber] = useState(0)
  const [renderCoachMark,setRenderCoachMark] = useState(false)


  useEffect(() => {
    if(props.userID !== -1 && props.userID !== undefined){
      setUserID(props.userID)
    }
  },[props.userID])

  useEffect(() => { /* needed so that ref gets updates value to be passed as prop */
    setRerender(rerender + 1);
  }, [ref1.current])

  useEffect(() => {
    const fetchWorkouts = async () => {
      if(userID === -1) { return }
      
      let fetchedWorkouts = await getAllWorkouts(userID)
      if(fetchedWorkouts!.data === '"User Not Found"'){ 
        setGetStartedModal(true)
        return 
      }
  
      let dbWorkouts: [number,Workout][] = []
      let databaseEntries = JSON.parse(fetchedWorkouts!.data)
      
      databaseEntries.forEach((databaseEntry: any) => {
        let dbWorkout: Workout = JSON.parse(databaseEntry.workout_details)
        dbWorkouts!.push([databaseEntry.workout_id,dbWorkout])
      });

      console.log(dbWorkouts.length)
      setWorkouts(sortList(dbWorkouts))
    }
    fetchWorkouts()
  },[userID])

  const sortList = (dbWorkouts: [number,Workout][]): [number,Workout][] => {
    return dbWorkouts.sort((a: [number,Workout], b: [number,Workout]) => {
      return b[0] - a[0]
    })
  }

  const addWorkoutToList = () => {
    let emptyWorkout: Workout = {exercises: [new Exercise("",[new RepSet(0,0)])]}
    setWorkouts([[unregisteredIndex.current,emptyWorkout],...workouts])
    unregisteredIndex.current--
  }

  const updateWorkouts = async (workout: Workout, workoutNum: number, workoutID: number, remove: boolean) => {
    let copy = [...workouts]
    let modifyIndex = workouts.length - workoutNum
    if(remove){
      copy.splice(modifyIndex,1)
      if(workoutID >= 0){
        deleteWorkout(userID,workoutID)
      }
    } else{
      let response = workoutID < 0 ? await addWorkout(userID,workout): await editWorkout(userID, workoutID, workout)
      let returnedEntry = JSON.parse(response!.data)
      copy[modifyIndex] = [returnedEntry.workout_id,workout]
    }
    setWorkouts(copy)
  }

  const updateError = (message: string) => {
    setErrorMessage(message)
  }

  const ErrorModal = () => {
    return(
      <div className="error-modal" >
        <p className="error-message-p">{errorMessage}</p>
      </div>
    )
  }
  
  const closeGetStartedModal = () => {
    setGetStartedModal(false)
    setRenderCoachMark(true)
  }

  const LetsGetStartedModal = () => {
    return(
      <div>
        <StatusModal 
          open={getStartedModal} 
          icon={false}
          modalTitle={"Your Fitness Progress Awaits"}
          modalDescription={
            "Welcome to our platform where you can track your workout progress. Here you may log the weight and number of repititions of your exercises for each and every one of your workout sessions!"
          }
          children={
              <>
                <button className="lets-get-started" onClick={closeGetStartedModal}>Lets Get Started</button>
              </>
          }/>
      </div>
    )
  }

  const currCoach = ():ICoachProps => {
    const NextButton = <button className="coach-mark-button" onClick={() => setActivateNumber(activatedNumber + 1)}>Got It</button>;
    const coachList: Array<ICoachProps> = [
      {
          activate: activatedNumber === 0,
          component: <div className="coach-mark-div"><div className="coach-mark-message">This is where you will find all your workouts</div> {NextButton} </div>,
          reference: ref1,
          tooltip: { position: 'bottom' }
      },
      {
        activate: activatedNumber === 1,
        component: <div className="coach-mark-div"><div className="coach-mark-message">Try clicking here to log your first workout</div>{NextButton} </div>,
        reference: ref2,
        tooltip: { position: 'bottom' }
    },
    ]
    const coach = coachList[activatedNumber]
    return coach
  }

  return (
    <>
      {<LetsGetStartedModal/>}
      <div className="page-container-workout">
        <div className="logout-button-div">
          <button className= "add-workout-button workout-theme" onClick={props.logout}>Logout</button>
        </div>
        <div ref={ref1} className="records-container">
          <div className="title-button-container">
            <div className="title-container">
              <p style={{color:'#455a64'}}>Your Workouts</p>
            </div>
            <div className="add-workout-div">
              <button ref={ref2} className="add-workout-button workout-theme" onClick={addWorkoutToList}>
                Add Workout
              </button>
            </div>
          </div>
          {workouts.map((workoutPair,i) => {
            return (
              <div className="accordian-spacing">
                <WorkoutDropdown 
                  workoutPair={workoutPair} 
                  updateWorkouts={updateWorkouts} 
                  day={workouts.length-i}
                  updateError={updateError}
                />
              </div>)
          })}
        </div>
      </div>
      {renderCoachMark ? <CoachMark {...currCoach()}/>: null}
    </>
  );
};

export default WorkoutRecord;