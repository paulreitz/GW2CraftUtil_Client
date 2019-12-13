import React from 'react';
import { connect } from 'react-redux';
import Tree from '../tree/tree';
import TreeDisplay from '../tree/treeDisplay';
import Dragger from '../utils/dragger';
import { setMaterials } from '../actions/materialsAction';

export class TreeView extends React.Component {
    state = {
        tree: undefined,
        treeX: 0,
        treeY: 0
    }
    

    render() {
        return (
            <div className="tree-view">
                <div className="tree-view__container" id="tree-view__container">
                    <div id="tree-view__display" style={{left:this.state.treeX,top:this.state.treeY}} />
                </div>
            </div>
            )
    }

    updateTreeViewLocation = (x, y) => {
        const moveX = isNaN(x) ? 0 : x;
        const moveY = isNaN(y) ? 0 : y;
        this.setState((previousState) => ({
            treeX: previousState.treeX + moveX,
            treeY: previousState.treeY + moveY
        }));
    }

    componentDidMount() {
        const tree = new Tree(this.props.recipe.recipe);
        this.setState(() => ({tree}));
        const mats = tree.getBaseMaterials();
        const materials = [];
        for (const key in mats) {
            materials.push(mats[key]);
        }
        this.props.setMaterials(materials);
        const treeDisplay = new TreeDisplay(tree);
        treeDisplay.buildTree();
        const treeDisplayView = document.getElementById('tree-view__display');
        const container = document.getElementById('recipe-page__content').clientWidth / 2;
        const center = treeDisplay.rootX;
        const left = container - center;
        this.setState(() => {
            return {
                treeX: left
            }
        });
        const dragger = new Dragger();
        dragger.makeElementDraggable('tree-view__display', this.updateTreeViewLocation);
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
    setMaterials: (materials) => dispatch(setMaterials(materials))
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);