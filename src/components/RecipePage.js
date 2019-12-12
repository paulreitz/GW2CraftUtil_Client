import React from 'react';
import { connect } from 'react-redux';
import TreeView from './TreeView';
import State from '../utils/state';
import { setState } from '../actions/stateAction';

export class RecipePage extends React.Component {
    render() {
        return (
            <div className="recipe-page">
                <div onClick={this.onBack} className="recipe-page__header"><span>&larr;</span><span>Back</span></div>
                <div className="recipe-page__content">
                    {this.props.recipe.status 
                        ? (<TreeView />)
                        : (<div className="recipe-page--no-recipe">
                                <div className="recipe-page--no-recipe__message">
                                <div>The selected item is a base material</div>
                                <div>There is no crafting recipe for this item</div>
                            </div>
                        </div>)}
                </div>
            </div>
        )
    }

    onBack = () => {
        this.props.setState(State.DISPLAY_RESULTS);
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
    setState: (state) => dispatch(setState(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);