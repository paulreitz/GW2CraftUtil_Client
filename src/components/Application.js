import React from 'react';
import Header from './Header';
import SearchFilter from './SearchFilter';
import Content from './Content';
import MaterialList from './MaterialList';

class Application extends React.Component {
    render() {
        return (
            <div className="application">
                <Header />
                <div className="application__viewport">
                    <SearchFilter />
                    <Content />
                    <MaterialList />
                </div>
            </div>
        )
    }
};

export default Application;