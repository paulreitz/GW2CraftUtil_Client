import * as d3 from 'd3';
import { rarityColors } from '../utils/colors';

export default class TreeDisplay {
    tree = undefined;
    baseWidth = 0;
    baseHeight = 0;
    rootX = 0;

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
    }

    adjustNode(node) {
        node.data.x = node.x;
        node.data.y = node.y;
        if (!node.parent) {
            node.data.y += 25;
        }
        else {
            if (node.data.parentIndex && node.data.parentIndex % 2 === 1){
                node.data.y = node.y - node.data.height * 1.5;
            }
            if (this.isCenterItem(node)) {
                // node.data.x = node.parent.x;
            }
        } 
    }

    isCenterItem(node) {
        if (!node.parent || !node.data.parentIndex) {
            return false;
        }
        if (node.parent.children.length % 2 === 0) {
            return false;
        }
        const center = Math.ceil(node.parent.children.length / 2);
        return false;
    }

    buildTree() {
        const width = (this.baseWidth || 1) * 35;
        const height = (this.baseHeight || 1) * 200;
        const data = this.tree.getDetails();
        const treemap = d3.tree().size([width, height]);
        const root = d3.hierarchy(data, (d) => {
            return d.children;
        });

        const nodes = treemap(root);

        const svg = d3.select('#tree-view__display').append('svg')
            .attr('width', width + 50)
            .attr('height', height + 50);

        const link = svg.append('g')
            .attr('fill', 'none')
            .attr('stroke', '#666')
            .selectAll('path')
            .data(root.links())
            .join('path')
            .attr('d', d => {
                this.adjustNode(d.source);
                this.adjustNode(d.target);
                if (!d.source.parent) {
                    this.rootX = d.source.data.x;
                }
                const str = `M${d.target.data.x},${d.target.data.y}C${(d.target.data.x+d.source.data.x)/2},${d.target.data.y} ${(d.target.data.x+d.source.data.x)/2},${d.source.data.y} ${d.source.data.x},${d.source.data.y}`
                return str;
            });
            
        const node = svg.selectAll('.node')
            .data(nodes.descendants())
            .enter().append('g')
            .attr('class', d => {
                return `node ${d.children? 'node-internal' : 'node-leaf'}`
            });
        
        node.append('svg:image')
            .attr('x', d => d.data.x - 16)
            .attr('y', d => d.data.y - 16)
            .attr('width', 32)
            .attr('height', 32)
            .attr('class', d => `${d.data.item.rarity.toLowerCase()}-border`)
            .attr('xlink:href', d => {
                return d.data.item.icon;
            });
            
    }
}