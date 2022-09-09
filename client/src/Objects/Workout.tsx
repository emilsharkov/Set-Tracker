import { Exercise } from "./Exercise";
export class Workout {
    exercises: Exercise[];

    constructor(exercises: Exercise[]) {
        this.exercises = exercises
    }
}