import React from 'react';
import { connect } from 'react-redux';
import ItemDisplay from './ItemDisplay';

export class MainPage extends React.Component {
    // state = {
    //     items: []
    // }
    
    render() {
        console.log(this.props);
        return (
            <div className="main-page">
                {this.props.search.results.map((item) => (<ItemDisplay key={item.id} {...item}/>))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        search: state.search
    }
};

export default connect(mapStateToProps)(MainPage);