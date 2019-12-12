import Node from './node';

export default class Tree {
    treeModel = undefined;
    root = undefined;

    constructor(treeModel) {
        this.treeModel = treeModel;
        this.root = new Node(treeModel.items[`item-${treeModel.root}`]);
        this.root.setChildren(treeModel);
    }

    getBaseMaterials() {
        let mats = {};
        this.root.getBaseMaterials(mats);
        return mats;
    }

    getDimensionObject() {
        let dims = {};
        this.root.setDimension(dims, 0);
        return dims;
    }

    getDetails() {
        return this.root.getDetails();
    }
}