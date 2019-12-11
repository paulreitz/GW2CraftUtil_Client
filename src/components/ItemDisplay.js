import React from 'react';
import CurrencyDisplay from './CurrencyDisplay';
import { addSpaces } from '../utils/addSpaces';

export default class ItemDisplay extends React.Component {
    detailsClassName = "item-dipslay__details";

    render() {
        const imageSize = 52;
        return (
            <div className={`item-display ${this.props.rarity.toLowerCase()}-border`}>
                <div className="item-display__action-area">
                    <div className="item-display__header">
                        <img src={this.props.icon} width={imageSize} height={imageSize} className={`${this.props.rarity.toLowerCase()}-border`} />
                        <h3 className={this.props.rarity.toLowerCase()}>{this.props.name.replace(/\&lsquo;/g, `'`)}</h3>
                    </div>
                    <div className="item-display__details">
                        {this.getDisplayDetails(this.props)}
                    </div>
                </div>
                <div>
                    <div>Rarity: {this.props.rarity}</div>
                    <CurrencyDisplay value={this.props.vendor_value} />
                    <div className="item-display__chat-link">Chat Link: {this.props.chat_link}</div>
                </div>
            </div>
        )
    }

    getDisplayDetails() {
        switch(this.props.type) {
            case 'CraftingMaterial':
                return this.getCraftingMaterial();
            case 'UpgradeComponent':
                return this.getUpgradComponent();
            case 'Trinket':
                return this.getTrinket();
            case 'Trophy':
                return this.getTrophy();
            case 'Consumable':
                return this.getConsumable();
            case 'Weapon':
                return this.getWeapon();
            case 'Bag':
                return this.getBag();
            case 'Container':
                return this.getContainer();
            case 'Gizmo':
                return this.getGizmo();
            case 'Tool':
                return this.getTool();
            case 'Armor':
                return this.getArmor();
            case 'Back':
                return this.getBack();
            default:
                return (<div></div>)
        }
    }

    getCraftingMaterial() {
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName}>
                <div className="item-display--crafting-material__label">Crafting Material</div>
                <Flags flags={flags} />
            </div>
        )
    }

    getUpgradComponent() {
        const details = JSON.parse(this.props.details);
        return (
            <div className={this.detailsClassName}>
                <div>Upgrade Component</div>
                <Flags flags={details.flags} />
            </div>
        )
    }

    getTrinket() {
        const flags = JSON.parse(this.props.flags);
        const details = JSON.parse(this.props.details);
        return (
            <div className={this.detailsClassName}>
                <div>{details.type}</div>
                <Upgrades attributes={details.infix_upgrade.attributes} />
                <div className="item-display--trinket__flags">
                    <Flags flags={flags} />
                </div>
            </div>
        )
    }

    getTrophy() {
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName}>
                <div>Trophy</div>
                <div>
                    <Flags flags={flags} />
                </div>
            </div>
        )
    }

    getConsumable() {
        const details = JSON.parse(this.props.details);
        const attributes = details.description ? details.description.split(/\n/) : [];
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName}>
                <div>{details.type}</div>
                <div>
                    {attributes.map((attribute, i) => (
                        <div className="item-display__upgrade" key={`attribute-${i}`}>
                            {attribute}
                        </div>
                    ))}
                </div>
                <div>
                    <Flags flags={flags} />
                </div>
            </div>
        )
    }

    getWeapon() {
        const details = JSON.parse(this.props.details);
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName}>
                <div>{details.type}</div>
                <div>Power: {details.min_power} - {details.max_power}</div>
                <Upgrades attributes={details.infix_upgrade.attributes} />
                <Infusions infusions={details.infusion_slots} />
                <div>
                    <Flags flags={flags} />
                </div>
            </div>
        )
    }

    getBag() {
        const details = JSON.parse(this.props.details);
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName}>
                <div>{details.size} Slot Bag</div>
                <Flags flags={flags} />
            </div>
        )
    }

    getContainer() {
        const details = JSON.parse(this.props.details);
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName} >
                <div>{details.type === 'Default' ? 'Consumable' : details.type}</div>
                <div>
                    <Flags flags={flags} />
                </div>
            </div>
        )
    }
    
    getGizmo() {
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName}>
                <Flags flags={flags} />
            </div>
        )
    }
    
    getTool() {
        const flags = JSON.parse(this.props.flags);
        return (
            <div className={this.detailsClassName}>
                <Flags flags={flags} />
            </div>
        )
    }
    
    getArmor() {
        const details = JSON.parse(this.props.details);
        const flags = JSON.parse(this.props.flags);
        const attributes = details.infix_upgrade.attributes;
        return (
            <div className={this.detailsClassName}>
                <div>
                    <div>Defense: {details.defense}</div>
                    <Upgrades attributes={attributes} />
                    <div>{details.type}</div>
                    <div>{details.weight_class} Armor</div>
                    <Infusions infusions={details.infusion_slots} />
                    <div>
                        <Flags flags={flags} />
                    </div>
                </div>
            </div>
        )
    }
    
    getBack() {
        const details  = JSON.parse(this.props.details);
        console.log(details);
        return (
            <div className={this.detailsClassName}>
                <div>Back Item</div>
                <Infusions infusions={details.infusion_slots} />
            </div>
        )
    }
}

const flagIsOK = (flag) => {
    const noGo = [
        'HideSuffix',
        'DeleteWarning',
        'NoSell',
        'NoSalvage',
        'BulkConsume',
        'NoUnderwater',
        'NotUpgradeable',
        'NoMysticForge',
        'ShortBow',
        'HeavyArmor',
        'LightArmor',
        'Dagger',
        'MediumArmor',
        'Focus',
        'Greatsword',
        'Hammer',
        'Trinket',
        'Harpoon',
        'Mace',
        'Pistol',
        'Rifle',
        'Scepter',
        'Shield',
        'Speargun',
        'Axe',
        'Staff',
        'Sword',
        'Torch',
        'Trident',
        'Warhorn',
        'LongBow'
    ];
    return noGo.indexOf(flag) === -1;
}

const Flags = (props) => {
    return (
        <div>
            {props.flags.map((flag) => {
                if (flagIsOK(flag)) {
                    return (
                        <div className="item-display__flag" key={flag}>
                            {addSpaces(flag)}
                        </div>
                    )
                }
                return undefined;
            })}
        </div>
    )
}

const Upgrades = (props) => {
    return (
        <div>
            {props.attributes.map((attribute) => (
                <div className="item-display__upgrade" key={attribute.attribute} >
                    +{attribute.modifier} {addSpaces(attribute.attribute)}
                </div>
            ))}
        </div>
    )
}

const Infusions = (props) => {
    return (
        <div>
            {props.infusions.map((slot, i) => {
                return (
                    <div className="item-display__infusion-container" key={`infusion-${i}`}>
                        <div className="item-display__infusion">
                            <div></div>
                        </div>
                        <span>Infusion Slot</span>
                    </div>
                )
            })}
        </div>
    );
}

