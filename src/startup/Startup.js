import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { setState } from '../actions/stateAction';
import { setSearchResults } from '../actions/searchActions';
import State from '../utils/state';
import { serverCall } from '../services/requestService';
import Application from '../components/Application';

export default class Startup {

    constructor() {
        const store = configureStore();
        store.dispatch(setState());

        const app = (
            <Provider store={store}>
                <Application />
            </Provider>
        )

        ReactDOM.render(app, document.getElementById('app'));
        this.setInitialSearchResults(store);
    }

    setInitialSearchResults(store) {
        store.dispatch(setState(State.SEARCHING));
        const searchData = {
            types: ['Weapon','Armor'],
            rarities: [],
            minLevel: 0,
            maxLevel: 80,
            text:''
        }
        serverCall('items/search', searchData).then((data) => {
            store.dispatch(setSearchResults(data.results));
            store.dispatch(setState(State.DISPLAY_RESULTS));
        })
    }
}