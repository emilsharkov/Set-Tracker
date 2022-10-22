import { Exercise } from "./Exercise";
export class Workout {
    workoutUUID: string;
    exercises: Map<string, Exercise>

    constructor(workoutUUID: string, exercises: Map<string, Exercise>) {
        this.workoutUUID = workoutUUID
        this.exercises = exercises
    }
}