import * as d3 from 'd3';

export default class TreeDisplay {
    tree = undefined;
    baseWidth = 0;
    baseHeight = 0;

    constructor(tree) {
        this.tree = tree;
        const dims = tree.getDimensionObject();
        for (let key in dims) {
            if (this.baseWidth < dims[key].count) {
                this.baseWidth = dims[key].count;
            }
            if (this.baseHeight < dims[key].depth) {
                this.baseHeight = dims[key].depth;
            }
        }
        console.log('width ', this.baseWidth);
        console.log('height ', this.baseHeight);
    }

    buildTree() {
        const width = (this.baseWidth || 1) * 50;
        const height = (this.baseHeight || 1) * 200;
        const data = this.tree.getDetails();
        const treemap = d3.tree().size([width, height]);
        const root = d3.hierarchy(data, (d) => {
            return d.children;
        });

        const nodes = treemap(root);

        // let svg = d3.select('#tree-view__display').append('svg')
        //     .attr('width', width + 50)
        //     .attr('height', height + 50);
    }
}