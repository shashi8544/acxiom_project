
import { SET_START_SELECTION_FIELD } from '../action/types';

const initialState = {
    shouldShowModal: false,
};

const applyForInterIITModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_START_SELECTION_FIELD:
            return { ...state, shouldShowModal: action.payload };
        default:
            return state;
    }
};

export default applyForInterIITModalReducer;
