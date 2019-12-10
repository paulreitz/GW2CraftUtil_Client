const defaultSearchResults = [];

export default (state = defaultSearchResults, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
                results: action.results
            }
        case 'UNSET_SEARCH_RESULTS':
            return {
                results: []
            }
        default: 
            return state;
    }
}