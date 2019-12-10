export const addSpaces = (name) => {
    return name ? name.replace(/([A-Z]+)*([A-Z][a-z])/g, ' $2').trim() : '';
}