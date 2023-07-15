export interface ILinkedListNode {
    previous: ILinkedListNode | null;
    next: ILinkedListNode | null;
}
export class LinkedList<T extends ILinkedListNode> {
    first: T | null;
    last: T | null;
    constructor() {
        this.first = null;
    }
    push(item: T) {
        if(!this.first) {
            this.first = item;
        }
        if(!this.last) {
            this.last = item;
        } else {
            item.previous = this.last;
            this.last.next = item;
            this.last = item;
        }
    } 
    remove(item: T) {
        if(item != this.first && item.previous != null) {
            item.previous.next = item.next;
        }
        if(item != this.last && item.next != null) {
            item.next.previous = item.previous;
        }
    }
    insertBefore(next: T, item: T) {
        item.next = next;
        item.previous = next.previous;
        next.previous = item;
    }
}