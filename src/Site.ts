import { Vector2 } from "./Vector2";

export class Site {
    id: number;
    position: Vector2;
    constructor(id: number, position: Vector2) {
        this.id = id;
        this.position = position;
    }
}