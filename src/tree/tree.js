import Node from './node';

export default class Tree {
    treeModel = undefined;
    root = undefined;

    constructor(treeModel) {
        this.treeModel = treeModel;
        this.root = new Node(treeModel.items[`item-${treeModel.root}`]);
        this.root.setChildren(treeModel);
    }
}