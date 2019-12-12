import React from 'react';
import { connect } from 'react-redux';
import Tree from '../tree/tree';
import TreeDisplay from '../tree/treeDisplay';
import { setMaterials } from '../actions/materialsAction';

export class TreeView extends React.Component {
    state = {
        tree: undefined
    }

    render() {
        return (
            <div className="tree-view">
                <div className="tree-view__container">
                    <div id="tree-view__display" />
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
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
    setMaterials: (materials) => dispatch(setMaterials(materials))
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);