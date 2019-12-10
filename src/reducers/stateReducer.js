import State from '../utils/state';

const defaultState = {
    previous: State.UNINITIALIZED,
    current: State.UNINITIALIZED
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_STATE':
            return {
                previous: state.current,
                current: action.state
            }
        default:
            return state;
    }
}