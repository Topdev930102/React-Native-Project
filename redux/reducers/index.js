import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import formulasReducer from "../reducers/formulasReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  formulas: formulasReducer,
});
export default rootReducer;
