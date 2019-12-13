import React from 'react';
import { connect } from 'react-redux';
import MainPage from './MainPage';
import LoadingScreen from './LoadingScreen';
import RecipePage from './RecipePage';
import About from './About';
import State from '../utils/state';

export class Content extends React.Component {
    render() {
        return (
            <div className="content">
                {this.getDisplay()}
            </div>
        );
    }

    getDisplay() {
        switch(this.props.state.current) {
            case State.DISPLAY_RESULTS:
                return (<MainPage />);
            case State.INIT:
                return (<LoadingScreen message="Initializing App, Please wait..."/>);
            case State.SEARCHING:
                return (<LoadingScreen message="Fetching Search Results..." />);
            case State.SEARCHING_RECIPE: 
                return (<LoadingScreen message="Getting Item Base Materials" />);
            case State.DISPLAY_TREE: 
                return (<RecipePage />);
            case State.DISPLAY_ABOUT:
                return (<About />);
            default:
                return (<div>Unhandled State...</div>)
        }
    }
}

const mapStateToProps = (state) => ({
    state: state.state
});

export default connect(mapStateToProps)(Content);