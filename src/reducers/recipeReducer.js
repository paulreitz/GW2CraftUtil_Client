const defaultRecipeState = {
    status: 0,
    tree: {}
};

/* With status set to 0, the tree should be empty.
However, this is what the tree object will look like:
{
    root: <number>,
    nodes: {
        key: <node>,
        ...
    },
    items: {
        key: <item>
    }
}
 */

 export default (state = defaultRecipeState, action) => {
     switch(action.type) {
         case 'SET_RECIPE':
             // the object should be set up correctly by the server already.
             // no need to build the new object here
             return action.recipe;
        case 'UNSET_RECIPE':
            return {
                status: 0,
                tree: {}
            }
        default:
            return state;
     }
 }