import { HalfEdge } from "./HalfEdge";

export class Arc {
    next: Arc;
    prev: Arc;
    leftHalfEdge: HalfEdge | null;
    rightHalfEdge: HalfEdge | null;
}