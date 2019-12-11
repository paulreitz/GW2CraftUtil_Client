import React from 'react';
import CurrencyDisplay from './CurrencyDisplay';
import { addSpaces } from '../utils/addSpaces';

const detailsClassName = "item-dipslay__details";

export default (props) => {
    const imageSize = 52;
    return (
        <div className={`item-display ${props.rarity.toLowerCase()}-border`}>
            <div className="item-display__action-area">
                <div className="item-display__header">
                    <img src={props.icon} width={imageSize} height={imageSize} className={`${props.rarity.toLowerCase()}-border`} />
                    <h3 className={props.rarity.toLowerCase()}>{props.name.replace(/\&lsquo;/g, `'`)}</h3>
                </div>
                <div className="item-display__details">
                    {getDisplayDetails(props)}
                </div>
            </div>
            <div>
                <div>Rarity: {props.rarity}</div>
                <CurrencyDisplay value={props.vendor_value} />
                <div className="item-display__chat-link">Chat Link: {props.chat_link}</div>
            </div>
        </div>
    )
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
        'NoMysticForge'
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

const Infusions = (props) => (
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
)

const getDisplayDetails = (props) => {
    switch(props.type) {
        case 'CraftingMaterial':
            return getCraftingMaterial(props);
        case 'UpgradeComponent':
            return getUpgradComponent(props);
        case 'Trinket':
            return getTrinket(props);
        case 'Trophy':
            return getTrophy(props);
        case 'Consumable':
            return getConsumable(props);
        case 'Weapon':
            return getWeapon(props);
        case 'Bag':
            return getBag(props);
        case 'Container':
            return getContainer(props);
        case 'Gizmo':
            return getGizmo(props);
        case 'Tool':
            return getTool(props);
        case 'Armor':
            return getArmor(props);
        case 'Back':
            return getBack(props);
        default:
            return (<div></div>)
    }
};

const getCraftingMaterial = (props) => {
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName}>
            <div className="item-display--crafting-material__label">Crafting Material</div>
            <Flags flags={flags} />
        </div>
    )
}

const getUpgradComponent = (props) => {
    const details = JSON.parse(props.details);
    return (
        <div className={detailsClassName}>
            <div>Upgrade Component</div>
            <Flags flags={details.flags} />
        </div>
    )
}

const getTrinket = (props) => {
    const flags = JSON.parse(props.flags);
    const details = JSON.parse(props.details);
    console.log(flags)
    return (
        <div className={detailsClassName}>
            <div>{details.type}</div>
            <Upgrades attributes={details.infix_upgrade.attributes} />
            <div className="item-display--trinket__flags">
                <Flags flags={flags} />
            </div>
        </div>
    )
}

const getTrophy = (props) => {
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName}>
            <div>Trophy</div>
            <div>
                <Flags flags={flags} />
            </div>
        </div>
    )
}

const getConsumable = (props) => {
    const details = JSON.parse(props.details);
    const attributes = details.description ? details.description.split(/\n/) : [];
    console.log(attributes);
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName}>
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

const getWeapon = (props) => {
    const details = JSON.parse(props.details);
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName}>
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

const getBag = (props) => {
    const details = JSON.parse(props.details);
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName}>
            <div>{details.size} Slot Bag</div>
            <Flags flags={flags} />
        </div>
    )
}

const getContainer = (props) => {
    const details = JSON.parse(props.details);
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName} >
            <div>{details.type === 'Default' ? 'Consumable' : details.type}</div>
            <div>
                <Flags flags={flags} />
            </div>
        </div>
    )
}

const getGizmo = (props) => {
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName}>
            <Flags flags={flags} />
        </div>
    )
}

const getTool = (props) => {
    const flags = JSON.parse(props.flags);
    return (
        <div className={detailsClassName}>
            <Flags flags={flags} />
        </div>
    )
}

const getArmor = (props) => {
    const details = JSON.parse(props.details);
    const flags = JSON.parse(props.flags);
    const attributes = details.infix_upgrade.attributes;
    return (
        <div className={detailsClassName}>
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

const getBack = (props) => {
    const details  = JSON.parse(props.details);
    console.log(details);
    return (
        <div className={detailsClassName}>
            <div>Back Item</div>
            <Infusions infusions={details.infusion_slots} />
        </div>
    )
}

