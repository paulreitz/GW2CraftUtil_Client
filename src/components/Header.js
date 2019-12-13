import React from 'react';
import { connect } from 'react-redux';
import State from '../utils/state';
import { setState } from '../actions/stateAction';

export class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <div className="header__container">
                    <div className="header__content">
                        <img src="https://render.guildwars2.com/file/AEEF1CF774EE0D5917D5E1CF3AAC269FEE5EC03A/102460.png" className="header__icon" />
                        <h2 className="header__title">GW2 Craft Utility</h2>
                    </div>
                    <div onClick={this.onClick} className="header--info">
                        <div className="header--info__circle">
                            <div className="header--info__icon">?</div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    onClick = (e) => {
        this.props.setState(State.DISPLAY_ABOUT);
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    setState: (state) => dispatch(setState(state))
});

export default connect(null, mapDispatchToProps)(Header);