import { BinaryTree, BinaryTreeStrategy } from "./BinaryTree";
import { BinaryTreeHelper } from "./BinaryTreeHelper";
import { BinaryTreeNode } from "./BinaryTreeNode";

export interface RedBlackStrategyData {
  red: boolean;
}

export function createDefaultRedBlackStrategyData(): RedBlackStrategyData {
  return { red: true };
}

export class RedBlackStrategy<T> implements BinaryTreeStrategy<RedBlackStrategyData, T> {
  public insert(tree: BinaryTree<RedBlackStrategyData, T>, node: BinaryTreeNode<RedBlackStrategyData, T>): BinaryTreeNode<RedBlackStrategyData, T> {
    node.strategy = createDefaultRedBlackStrategyData();
    if (!tree.root) {
      BinaryTreeHelper.setRoot(tree, node);
      this.insertFixup(tree, node);
      return node;
    } else {
      let currentNode: BinaryTreeNode<RedBlackStrategyData, T> | null = tree.root;
      let parentNode: BinaryTreeNode<RedBlackStrategyData, T> | null = null;
      while (currentNode !== null) {
        parentNode = currentNode;
        currentNode = node.x > currentNode.x ? currentNode.right : currentNode.left;
      }
      if (parentNode != null) {
        if (node.x > parentNode.x) {
          BinaryTreeHelper.setRightOf(parentNode, node);
        } else {
          BinaryTreeHelper.setLeftOf(parentNode, node);
        }
      }
      this.insertFixup(tree, node);
      return node;
    }
  }
  public remove(tree: BinaryTree<RedBlackStrategyData, T>, node: BinaryTreeNode<RedBlackStrategyData, T>): void {
    if (node.left == null && node.right != null) {
      tree.transplant(node, node.right);
      if (!node.strategy.red) {
        this.removeFixup(tree, node);
      }
    }
    else if (node.right == null && node.left != null) {
      tree.transplant(node, node.left);
      if (!node.strategy.red) {
        this.removeFixup(tree, node);
      }
    } else if (node.right != null && node.left != null) {
      let min = tree.min(node.right);
      if (min != null) {
        tree.transplant(min, min.left);
      }
      tree.transplant(node, min);
      BinaryTreeHelper.setLeftOf(min, node.left);
      BinaryTreeHelper.setRightOf(min, node.right);
      if (min != null && !min.strategy.red) {
        this.removeFixup(tree, node);
      }
    }
  }
  private insertFixup(tree: BinaryTree<RedBlackStrategyData, T>, node: BinaryTreeNode<RedBlackStrategyData, T>): void {
    if (node === null) {
      return;
    }
    while (node.parent && node.parent.strategy.red) {
      if (node.parent.parent && node.parent === node.parent.parent.left) {
        let y = node.parent.parent.right;
        if (y && y.strategy.red) {
          node.parent.strategy.red = false;
          y.strategy.red = false;
          node.parent.parent.strategy.red = true;
          node = node.parent.parent;
          //console.log('Z.uncle - red');
        }
        else if (!y || (y && !y.strategy.red)) {
          if (node === node.parent.right) {
            node = node.parent;
            tree.rotateLeft(node);
            //console.log('Z.uncle - black (triangle)');
          }
          if (node.parent != null) {
            if (node.parent.parent != null) {
              //console.log('Z.uncle - black (line)');
              node.parent.strategy.red = false;
              node.parent.parent.strategy.red = true;
              tree.rotateRight(node.parent.parent);
            }
          }
        }
      }
      else if (node.parent.parent && node.parent === node.parent.parent.right) {
        let y = node.parent.parent.left;
        if (y && y.strategy.red) {
          node.parent.strategy.red = false;
          y.strategy.red = false;
          node.parent.parent.strategy.red = true;
          node = node.parent.parent;
          //console.log('Z.uncle - red - flipped');
        }
        else if (!y || (y && !y.strategy.red)) {
          if (node === node.parent.left) {
            node = node.parent;
            tree.rotateRight(node);
            //console.log('Z.uncle - black (triangle) - flipped');
          }
          if (node.parent != null) {
            if (node.parent.parent != null) {
              //console.log('Z.uncle - black (line) - flipped');
              node.parent.strategy.red = false;
              node.parent.parent.strategy.red = true;
              tree.rotateLeft(node.parent.parent);
            }
          }
        }
      }
      if (node === tree.root) {
        break;
      }
    }
    if (tree.root != null) {
      tree.root.strategy.red = false;
    }
  }
  private removeFixup(tree: BinaryTree<RedBlackStrategyData, T>, node: BinaryTreeNode<RedBlackStrategyData, T> | null): void {
    let w: BinaryTreeNode<RedBlackStrategyData, T> | null = null;
    let k = 0;
    while (node != tree.root && (node != null && !node.strategy.red)) {
      if (k++ > 100) {
        break;
      }
      if (node.parent != null && node === node.parent.left) {
        w = node.parent.right;
        if (w != null) {
          // type 1
          if (w.strategy.red) {
            console.log('type 1');
            w.strategy.red = false;
            node.parent.strategy.red = true;
            tree.rotateLeft(node.parent);
            w = node.parent.right;
          }
          if (w != null) {
            // type 2
            if (w.left && !w.left.strategy.red && w.right && !w.right.strategy.red) {
              console.log('type 2');
              w.strategy.red = true;
              node = node.parent;
            } else {
              // type 3
              if (w.right && !w.right.strategy.red) {
                console.log('type 3');
                if (w.left != null) {
                  w.left.strategy.red = false;
                }
                w.strategy.red = true;
                tree.rotateRight(w);
                w = node.parent.right;
              }
              if (w != null) {
                // type 4
                console.log('type 4');
                w.strategy.red = node.parent.strategy.red;
                node.parent.strategy.red = false;
                if (w.right != null) {
                  w.right.strategy.red = false;
                }
                tree.rotateLeft(node.parent);
                node = tree.root;
              }
            }
          }
        }
      }
    }
    if (node != null) {
      node.strategy.red = false;
    }
  };
}