import { actionTypes } from "./actions";
const INITIAL_STATE = 0;

const counter = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

export default counter;
