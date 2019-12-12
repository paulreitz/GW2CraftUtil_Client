import React from 'react';
import { connect } from 'react-redux';
import { setSearchResults } from '../actions/searchActions';
import { setState } from '../actions/stateAction';
import State from '../utils/state';
import { serverCall } from '../services/requestService';
import { addSpaces } from '../utils/addSpaces';
import { unsetMaterials } from '../actions/materialsAction';

export class SearchFilter extends React.Component {

    state = {
        types: [],
        rarities: [],
        minLevel: 0,
        maxLevel: 80
    };

    onFilterUpdate = (e) => {
        e.preventDefault();
        this.props.setState(State.SEARCHING);
        const minLevel = e.target.minLevel.value;
        const maxLevel = e.target.maxLevel.value;

        const typesFull = this.state.types.map((type) => {
            if (e.target[type].checked) {
                return type;
            }
            return undefined;
        });
        const types = typesFull.filter(val => !!val);

        const raritiesFull = this.state.rarities.map((rarity) => {
            if (e.target[rarity].checked) {
                return rarity;
            }
            return undefined;
        });
        const rarities = raritiesFull.filter(val => !! val);

        const data = {
            minLevel,
            maxLevel,
            types,
            rarities
        };

        serverCall('items/search', data)
        .then((results) => {
            this.props.setSearchResults(results.results);
            this.props.setState(State.DISPLAY_RESULTS);
            this.props.unsetMaterials();
        });
    }

    getTypes() {
        serverCall(`meta/types`).then((data) => {
            this.setState(() => {
                return {
                    types: data.types
                }
            });
            this.getRarities();
        });
    }

    getRarities() {
        serverCall('meta/rarities').then((data) => {
            this.setState(() => {
                return {
                    rarities: data.rarities
                }
            });
        });
    }

    isValidNumber(num) {
        const validators = [
            !!(num == '' || !isNaN(num)),
            !!(!isNaN(num) && num >= 0),
            !!(!isNaN(num) && num <= 80)
        ];
        return validators.every(val => val);
    }

    onMinLevelChange = (e) => {
        const val = e.target.value;
        if (this.isValidNumber(val)) {
            this.setState(() => ({
                minLevel: val
            }));
        }
    }

    onMaxLevelChange = (e) => {
        const val = e.target.value;
        if (this.isValidNumber(val)) {
            this.setState(() => ({
                maxLevel: val
            }));
        }
    }

    componentDidMount() {
        this.getTypes();
    }

    render() {
        return (
            <aside className="search-filter">
                <div className="search-filter__container">
                    <h3>Search Filters</h3>
                    <form onSubmit={this.onFilterUpdate} className="search-filter__form">
                        <div className="search-filter__form-group">
                            <input type="text" placeholder="Text Search Disabled" />
                        </div>
                        <div className="search-filter__form-group">
                            <div><label className="search-filter__form-label">Min Level: </label><input onChange={this.onMinLevelChange} name="minLevel" type="number" value={this.state.minLevel} /></div>
                            <div><label className="search-filter__form-label">Max Level: </label><input onChange={this.onMaxLevelChange} name="maxLevel" type="number" value={this.state.maxLevel} /></div>
                        </div>
                        <div className="search-filter__form-group">
                            <label className="search-filter__form-label">Filter by Type:</label>
                            {this.state.types.map((type) => (<span key={type}><input type="checkbox" name={type} value={type}/>{addSpaces(type)}</span>))}
                        </div>
                        <div className="search-filter__form-group">
                        <label className="search-filter__form-label">Filter by Rarity:</label>
                            {this.state.rarities.map((rarity) => (<span key={rarity}><input type="checkbox" name={rarity} value={rarity} />{rarity}</span>))}
                        </div>
                        <button className="button">Update Filters</button>
                    </form>
                </div>
            </aside>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSearchResults: (results) => dispatch(setSearchResults(results)),
    setState: (state) => dispatch(setState(state)),
    unsetMaterials: () => dispatch(unsetMaterials())
});

export default connect(undefined, mapDispatchToProps)(SearchFilter)