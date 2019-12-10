import State from '../utils/state';

export const setState = (state = State.INIT) => ({
    type: 'SET_STATE',
    state
})