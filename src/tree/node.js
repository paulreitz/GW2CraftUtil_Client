import uuid from 'uuid';

export default class Node {
    item = undefined;
    itemId = -1;
    children = [];
    id = '';

    constructor(item) {
        this.item = item;
        this.itemId = item.id;
        console.log(this.itemId);
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
}