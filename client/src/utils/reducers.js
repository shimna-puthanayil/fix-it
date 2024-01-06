import { UPDATE_COMPLAINTS } from "./actions";
// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an updated complaints array. We use the action.complaints property and spread it's contents into the new array.
    case UPDATE_COMPLAINTS:
      return {
        ...state,
        complaints: [...action.complaints],
      };
    default:
      return state;
  }
};
