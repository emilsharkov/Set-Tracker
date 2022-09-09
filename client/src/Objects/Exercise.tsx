import { Set } from "./Set"

export class Exercise {
    name: string;
    sets: Set[]

    constructor(name: string, sets: Set[]) {
        this.name = name
        this.sets = sets
    }
}