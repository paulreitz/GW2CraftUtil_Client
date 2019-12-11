import React from 'react';
import { connect } from 'react-redux';
import ItemDisplay from './ItemDisplay';

export class MainPage extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className="main-page">
                {this.props.search.results && this.props.search.results.length
                    ? this.props.search.results.map((item) => (<ItemDisplay key={item.id} {...item}/>))
                    : (
                        <div className="main-page--no-results">
                            <div className="main-page--no-results__message">
                            <div>No results for the current fitler.</div><div> Please adjust your filters and try again.</div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
};

export default connect(mapStateToProps)(MainPage);