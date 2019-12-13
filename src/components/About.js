import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import State from '../utils/state';
import { setState } from '../actions/stateAction';

export class About extends React.Component {
    state = {
        sections: []
    }

    render() {
        return (
            <div className="about">
                <div className="about__container">
                    <div className="about__header" onClick={this.onBack}>
                        <span>&larr;</span><span>Back</span>
                        <span className="about__header-title">About This Project</span>
                    </div>
                    <div className="about__content">
                        {this.state.sections.map((section) => (
                            <div className="about__section" key={section.title}>
                                <div className="about__section-header">
                                    {section.title}
                                </div>
                                <div className="about__section-content">
                                {/*I could not find a single markdown library that worked the way I want with React.
                                    If you happen to be reading this and know of a good one, message me
                                    ~ thanks */}
                                    {ReactHtmlParser(section.content)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const sections = []
        sections.push({title: 'Disclaimers', content: this.getDisclaimer()});
        sections.push({title: 'What is GW2', content: this.getWhatIs()});
        sections.push({title: 'Why I Made This', content: this.getWhy()});
        sections.push({title: 'Project Details', content: this.getProjectDetails()});

        this.setState(() => ({
            sections
        }))
    }

    onBack = () => {
        this.props.setState(this.props.state.previous);
    }

    getDisclaimer() {
        return `
            This project was built for fun and practice, and as a demo of my skills.<br/>
            This is not intended to be usable product.<br/>
            I make no claims about the accuracy or usability of this site. 
            Nor do I make any promises to keep the database up to date.
            <p>
            I am not affiliated with Guild Wars 2 or Arenanet in anyway.
            </p>
            <p>
            Art and information used on this site &copy; Arenanet LLC - Used with permission.
            </p>
        `
    }

    getWhatIs() {
        return `
            GW2 is a commonly used acronym for Guild Wars 2, a massive multiplayer online fantasy game made by Arenanet. 
            For more information visit the <a href="https://www.guildwars2.com/en/" target="_BLANK">Guild Wars 2 website</a>
        `
    }

    getWhy() {
        return `
            GW2, like most online fantasy games, includes a sophisticated crafting system. In order to create the best armor and weapons in the game, players are required to 
            gather base materials and make a series of components in order to make the final item. These materials are found throughout the game or collected 
            as drops from certain monsters.<br/>
            The complexity of this system of components makes it difficult to figure out how many of what base materials are needed.
            <p>
            This utility makes it simple to see, at a glance, what base materials are needed for a given item
            </p>
        `
    }

    getProjectDetails() {
        return `
            This project consists of three parts:
            <h3>Scrubber</h3>
            The information used in this project exists in the GW2 API, but is not in a usable or searchable form. 
            The scrubber is used to pull the information from the API and store it in a database in a form that can be used by this site.
            <h3>Server</h3>
            This is an express server used to run searches, pull information from the database and format the data in a way usable by this site.
            <h3>Client</h3>
            (What you're looking at) Displays the information to the user.
            <p>
            All three parts of this project are pinned to my profile page on github: <a href="https://github.com/paulreitz" target="_BLANK">https://github.com/paulreitz</a>
            </p>
        `
    }
}

const mapStateToProps = (state) => ({
    state: state.state
});

const mapDispatchToProps = (dispatch) => ({
    setState: (state) => dispatch(setState(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);