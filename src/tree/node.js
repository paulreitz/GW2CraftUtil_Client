import uuid from 'uuid';

export default class Node {
    item = undefined;
    itemId = -1;
    children = [];
    id = '';

    constructor(item) {
        this.item = item;
        this.itemId = item.id;
        this.id = uuid();
    }

    setChildren(treeModel) {
        const childData = treeModel.nodes[`node-${this.itemId}`];
        if (childData) {
            childData.ingredients.forEach((ingredient) => {
                for (let i = 0; i < ingredient.count; i++) {
                    const child = new Node(treeModel.items[`item-${ingredient.item_id}`]);
                    this.children.push(child);
                    child.setChildren(treeModel);
                }
            });
        }
    }

    getBaseMaterials(mats) {
        if (this.children.length) {
            this.children.forEach((child) => {
                child.getBaseMaterials(mats);
            });
        }
        else {
            const matKey = `mat-${this.itemId}`;
            mats[matKey] = mats[matKey] || {
                item: this.item,
                count: 0
            };
            mats[matKey].count = mats[matKey].count + 1;
        }
    }

    setDimension(dim, parentDepth) {
        const depth = parentDepth + 1;
        const depthKey = `depth-${depth}`;
        dim[depthKey] = dim[depthKey] || {
            depth: depth,
            count: 0
        }
        dim[depthKey].count = dim[depthKey].count + 1;
        this.children.forEach((child) => {
            child.setDimension(dim, depth);
        })
    }

    getDetails(parent) {
        const data = {
            id: this.id,
            item: this.item
        }
        if (parent) {
            data.parent = parent;
        }
        if (this.children.length) {
            data.children = [];
            this.children.forEach((child) => {
                data.children.push(child.getDetails(this.id));
            })
        }
        return data;
    }
}