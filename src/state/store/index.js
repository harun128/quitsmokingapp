import {combineReducers} from "redux";
import {createStore} from "redux";

import UserInformation from "../reducers/UserInformation";
import UserSession from "../reducers/UserSession";

const rootReducer = combineReducers({
    ui : UserInformation,
    us: UserSession

})


const store = createStore(rootReducer);

export default store;
