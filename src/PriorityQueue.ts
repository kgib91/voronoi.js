export interface IPriorityQueueSortFunction<T> {
    (a: T, b: T): number;
}
export class PriorityQueue<T> {
    stack: T[];
    sortFunction: IPriorityQueueSortFunction<T>
    constructor(sortFunction: IPriorityQueueSortFunction<T>) {
        this.stack = [];
        this.sortFunction = sortFunction;
    }
    push(item: T) {
        this.stack.push(item);
        this.stack.sort(this.sortFunction);
    }
    shift() {
        return this.stack.shift();
    }
    pop() {
        return this.stack.pop();
    }
}