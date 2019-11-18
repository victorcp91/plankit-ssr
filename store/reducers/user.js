import * as actionTypes from '../actions';

const initialState = {};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      return Object.assign({}, action.user);
    }
    case actionTypes.UPDATE_USER: {
      return Object.assign({}, state, action.updatedUser);
    }
    case actionTypes.DELETE_USER: {
      return {};
    }
    case actionTypes.ADD_GARDEM_PLANT: {
      let gardem = action.user.gardem;
      const newPlant = {
        id: action.plant.id,
        image: action.plant.image,
        popular_name_pt_br: action.plant.popular_name_pt_br,
      }
      gardem.push(newPlant);
      let updatedUser = {
        ...action.user,
        gardem
      }
      return Object.assign({}, state, updatedUser);
    }
    case actionTypes.REMOVE_GARDEM_PLANT: {
      const user =  action.user;
      const gardem = action.user.gardem.filter(plant => plant.id !== action.plantId)
      let updatedUser = {
        ...user,
        gardem: gardem ? gardem : []
      }
      return Object.assign({}, state, updatedUser);
    }
    case actionTypes.ADD_FOLLOWED_CHANNEL: {
      let followedChannels = action.user.followedChannels;
      const newChannel = {
        id: action.channel.id,
        profileImage: action.channel.profileImage,
        slug: action.channel.slug,
        name: action.channel.name,
        description: action.channel.description,
      }
      followedChannels.push(newChannel);
      let updatedUser = {
        ...action.user,
        followedChannels
      }
      return Object.assign({}, state, updatedUser);
    }
    case actionTypes.REMOVE_FOLLOWED_CHANNEL:{
      const followedChannels = action.user.followedChannels.filter(c => c.id !== action.channelId);
      let updatedUser = {
        ...action.user,
        followedChannels: followedChannels ? followedChannels : []
      }
      return Object.assign({}, state, updatedUser);
    }
    default:
      return state;
  }
}

export default reducer;