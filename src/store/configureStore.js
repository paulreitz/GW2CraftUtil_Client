import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import StateReducer from '../reducers/stateReducer';
import SearchReducer from '../reducers/searchReducer';
import MaterialsReducer from '../reducers/materialsReducer';
import RecipeReducer from '../reducers/recipeReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            state: StateReducer,
            search: SearchReducer,
            materials: MaterialsReducer,
            recipe: RecipeReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
