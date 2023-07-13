import { BinaryTree } from "./BinaryTree";
import { BinaryTreeNode } from "./BinaryTreeNode";

export class BinaryTreeHelper {
    static setRoot<U, T>(tree: BinaryTree<U, T>, node: BinaryTreeNode<U, T> | null): void {
        if (node != null) {
            node.parent = null;
        }
        tree.root = node;
    }
    static detach<U, T>(node: BinaryTreeNode<U, T> | null): void {
        if (node != null) {
            if (node.parent != null) {
                if (node.parent.left == node) {
                    node.parent.left = null;
                }
                if (node.parent.right == node) {
                    node.parent.right = null;
                }
                node.parent = null;
            }
        }
    }
    static setLeftOf<U, T>(parent: BinaryTreeNode<U, T> | null, node: BinaryTreeNode<U, T> | null): void {
        if (node != null && parent != null) {
            node.parent = parent;
            if (node.parent.left != null) {
                this.detach(node.parent.left);
            }
            node.parent.left = node;
        }
    }
    static setRightOf<U, T>(parent: BinaryTreeNode<U, T> | null, node: BinaryTreeNode<U, T> | null): void {
        if (node != null && parent != null) {
            node.parent = parent;
            if (node.parent.right != null) {
                this.detach(node.parent.right);
            }
            node.parent.right = node;
        }
    }
}