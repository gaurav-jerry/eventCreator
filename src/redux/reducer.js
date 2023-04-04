import { LOGIN, LOGOUT, FETCH_EVENTS } from "./type";

const initialState = {
  loggedIn: false,
  events: [],
  loggedInUser :"",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true, loggedInUser : action.payload };
    case LOGOUT:
      return { ...state, loggedIn: false, loggedInUser : "" };
      case FETCH_EVENTS:
        return { ...state, events: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
