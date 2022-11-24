import { RepSet } from "./RepSet"

export class Exercise {
    name: string;
    sets: RepSet[];

    constructor(name: string, sets: RepSet[]) {
        this.name = name
        this.sets = sets
    }
}