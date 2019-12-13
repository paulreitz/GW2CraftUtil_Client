import React from 'react';
import { connect } from 'react-redux';

export class MaterialList extends React.Component {
    render() {
        const mats = this.props.materials.materials;
        const imageSize = 32;
        return (
            <aside className="materials-list">
                <div className="materials-list__container">
                    <div className="materials-list__content">
                    <h3 className="materials-list__title">
                        Base Materials
                    </h3>
                    {mats.length 
                        ? (<div className="materials-list--mats">
                            {mats.map((mat) => (
                                <div className={`materials-list--mats__container ${mat.item.rarity.toLowerCase()}-border`} key={mat.item.id}>
                                    <div className="materials-list--mats__count">
                                        {mat.count}
                                    </div>
                                    <div className={`materials-list--mats__display ${mat.item.rarity.toLowerCase()}${mat.item.rarity === 'Basic'? '-inverse' : ''}`}>
                                        <img src={mat.item.icon} className={`materials-list--mats__icon ${mat.item.rarity.toLowerCase()}-border`} width={imageSize} height={imageSize} />
                                        <div className="materials-list--mats__name">
                                            {mat.item.name.replace(/\&lsquo;/g, `'`)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>)
                        : (<div className="materials-list--no-mats">
                            <div className="materials-list--no-mats__message">
                                <div>There are currently no materials to show.</div>
                                <div>Select an item to view the base materials needed.</div>
                            </div>    
                        </div>)}
                    </div>
                </div>
            </aside>
        );
    }
}

const mapStateToProps = (state) => ({
    materials: state.materials
});

export default connect(mapStateToProps)(MaterialList);