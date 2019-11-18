import * as actionTypes from '../actions';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNELS: {
      const currentChannels = state.channels;
      if(action.channels && action.channels.length) {
        action.channels.forEach(channel => {
          const index = currentChannels.findIndex(el => el.id === channel.id);
          if(index > -1){
            currentChannels[index] = { ...currentChannels[index], ...channel, subscribers: channel.subscribers};
          } else {
            currentChannels.push(channel);
          }
          
        });
      } 
      return Object.assign([], state, currentChannels);
    }
    case actionTypes.SET_CHANNEL_POSTS: {
      const currentChannels = state.channels;
      const channelIndex = currentChannels.findIndex(channel => channel.id === channelId);
      if(channelIndex > -1){
        currentChannels[channelIndex].posts = posts;
      }
      return Object.assign([], state, currentChannels);
    }
    default:
      return state;
  }
}

export default reducer;