import { Vector2 } from "./Vector2";

export class HalfEdge {
    vertex: Vector2;
    leftHalfEdge: HalfEdge;
    twin: HalfEdge;
}