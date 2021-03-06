import React from 'react';
import { connect } from 'react-redux';
import TreeView from './TreeView';
import State from '../utils/state';
import { setState } from '../actions/stateAction';
import { unsetRecipe } from '../actions/recipeActions';
import { unsetMaterials } from '../actions/materialsAction';

export class RecipePage extends React.Component {
    render() {
        const item = this.props.recipe.status ? this.props.recipe.recipe.items[`item-${this.props.recipe.recipe.root}`] : {};
        // console.log(this.props.recipe.recipe.root);
        return (
            <div className="recipe-page">
                <div className="recipe-page__container">
                    <div onClick={this.onBack} className="recipe-page__header"><span>&larr;</span><span>Back</span>
                        <span className={`recipe-page__header-name ${item.rarity ? item.rarity.toLowerCase() : 'basic'}`}>
                            {item.name ? item.name.replace(/\&lsquo;/g, `'`) : ''}
                        </span>
                    </div>
                    <div className="recipe-page__content" id="recipe-page__content">
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
            </div>
        )
    }

    onBack = () => {
        this.props.setState(State.DISPLAY_RESULTS);
        this.props.unsetMaterials();
        this.props.unsetRecipe();
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
    setState: (state) => dispatch(setState(state)),
    unsetRecipe: () => dispatch(unsetRecipe()),
    unsetMaterials: () => dispatch(unsetMaterials())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);