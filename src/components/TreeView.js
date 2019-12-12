import React from 'react';
import { connect } from 'react-redux';
import Tree from '../tree/tree';
import TreeDisplay from '../tree/treeDisplay';
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
        const center = document.getElementById('tree-view__display').clientWidth / 2;
        const left = container - center;
        this.setState(() => {
            return {
                treeX: left
            }
        })
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
    setMaterials: (materials) => dispatch(setMaterials(materials))
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);