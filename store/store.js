import { createStore, combineReducers } from 'redux';

import channelsReducer from './reducers/channels';
import plantsReducer from './reducers/plants';
import userReducer from './reducers/user'; 

const rootReducer = combineReducers({
  channels: channelsReducer,
  plants: plantsReducer,
  user: userReducer
});

export function initializeStore() {
  return createStore(rootReducer)
}