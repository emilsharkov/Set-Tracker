import { Exercise } from "./Exercise";
export class Workout {
    workoutID: number;
    exercises: Exercise[];

    constructor(workoutID: number, exercises: Exercise[]) {
        this.workoutID = workoutID
        this.exercises = exercises
    }
}