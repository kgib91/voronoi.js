export interface BinaryTreeNode<U, T> {
    x: number;
    parent: BinaryTreeNode<U, T> | null;
    left: BinaryTreeNode<U, T> | null;
    right: BinaryTreeNode<U, T> | null;
    strategy: U;
    data: T;
};