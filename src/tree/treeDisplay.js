import * as d3 from 'd3';
import { rarityColors } from '../utils/colors';

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
        console.log(`name: ${node.data.item.name}index: ${node.data.parentIndex}, center: ${center}`);
        return false;
    }

    buildTree() {
        const width = (this.baseWidth || 1) * 50;
        const height = (this.baseHeight || 1) * 100;
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
                // console.log(d);
                this.adjustNode(d.source);
                this.adjustNode(d.target);
                // console.log(`source x: ${d.source.data.x}, target x: ${d.target.data.x}`);
                const str = `M${d.target.data.x},${d.target.data.y}C${(d.target.data.x+d.source.data.x)/2},${d.target.data.y} ${(d.target.data.x+d.source.data.x)/2},${d.source.data.y} ${d.source.data.x},${d.source.data.y}`
                // console.log(str);
                return str;
            });
            // "M" + d.x + "," + d.y+ "C" + (d.x + d.parent.x) / 2 + "," + d.y + " " + (d.x + d.parent.x) / 2 + "," + d.parent.y + " " + d.parent.x + "," + d.parent.y;

        const node = svg.selectAll('.node')
            .data(nodes.descendants())
            .enter().append('g')
            .attr('class', d => {
                return `node ${d.children? 'node-internal' : 'node-leaf'}`
            });

        // node.append('rect')
        //     .attr('x', d => d.x - (d.data.width/2))
        //     .attr('y', d => d.data.y)
        //     .attr('width', d => d.data.width)
        //     .attr('height', d => d.data.height)
        //     .attr('style', d => {
        //         const col = d.data.parentIndex % 2 == 1 ? d3.color('#666') : d3.color('#bbb')
        //         return `fill:${col};strok-width:3;stroke:${d3.color(rarityColors[d.data.item.rarity])}`
                
        //         // `fill:white;strok-width:3;stroke:${rarityColors[d.data.item.rarity]}`;
        //     })
        
        node.append('svg:image')
            .attr('x', d => d.data.x - 16)
            .attr('y', d => d.data.y - 16)
            .attr('width', 32)
            .attr('height', 32)
            .attr('class', d => `${d.data.item.rarity.toLowerCase()}-border`)
            .attr('xlink:href', d => {
                return d.data.item.icon;
            });

        // node.append('text')
        //     .attr('x', d => d.x - (d.data.width/2) + 38)
        //     .attr('y', d => d.data.y + d.data.height / 2)
        //     .style('text-anchor', 'left')
        //     .attr('stroke', d => `${d3.color(rarityColors[d.data.item.rarity])};`)
        //     .text(d => d.data.item.name.replace(/\&lsquo;/g, '\''))
            
    }
}