import React from 'react';
import { connect } from 'react-redux';
import Tree from '../tree/tree';
import { setMaterials } from '../actions/materialsAction';

export class TreeView extends React.Component {
    state = {
        tree: undefined
    }

    render() {
        return (
            <div>
                this is a tree
                {this.state.tree && (<div>The tree will be displayed</div>)}
            </div>
            )
    }

    componentDidMount() {
        const tree = new Tree(this.props.recipe.recipe);
        this.setState(() => ({tree}));
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
    setMaterials: (materials) => dispatch(setMaterials(materials))
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);