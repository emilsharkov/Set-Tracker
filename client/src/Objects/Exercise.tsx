import { Set } from "./Set"

export class Exercise {
    exerciseUUID: string;
    name: string;
    sets: Set[];

    constructor(exerciseUUID: string, name: string, sets: Set[]) {
        this.exerciseUUID = exerciseUUID
        this.name = name
        this.sets = sets
    }
}