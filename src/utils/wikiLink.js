import { addSpaces } from './addSpaces';

export const getWikiLink = (item) => {
    let itemName = addSpaces(item);
    itemName = itemName.replace(' ', '_');
    return `https://wiki.guildwars2.com/wiki/${itemName}`;
} 