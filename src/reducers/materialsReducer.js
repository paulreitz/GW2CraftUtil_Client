const defaultMaterials = {materials: []};

export default (state = defaultMaterials, action) => {
    switch (action.type) {
        case 'SET_MATERIALS':
            return {
                materials: action.materials
            };
        case 'UNSET_MATERIALS':
            return {
                materials: []
            };
        default: 
            return state;
    }
}