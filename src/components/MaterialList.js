import React from 'react';
import { connect } from 'react-redux';

export class MaterialList extends React.Component {
    render() {
        const mats = this.props.materials.materials;
        return (
            <aside className="materials-list">
                <h3 className="materials-list__title">
                    Base Materials
                </h3>
                {mats.length 
                    ? (<div>This will be the mats list for {mats.length} items</div>)
                    : (<div className="materials-list--no-mats">
                        <div className="materials-list--no-mats__message">
                            <div>There are currently no materials to show.</div>
                            <div>Select an item to view the base materials needed.</div>
                        </div>    
                    </div>)}
            </aside>
        );
    }
}

const mapStateToProps = (state) => ({
    materials: state.materials
});

export default connect(mapStateToProps)(MaterialList);