import { TEST, UPDATE_JSON, UPDATE_FAMILY } from "../actions/types";
const initialState = {
  family: [],
  name: "",
  Color: "",
  Price: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_JSON:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_FAMILY:
      return {
        ...state,
        family: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
