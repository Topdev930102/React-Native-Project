import { TEST } from "../actions/types";
const initialState = {
  user: "",
  username: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        username: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
