import * as actionTypes from '../actions';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLANTS: {
      const currentPlants = state;
      if(action.plants && action.plants.length) {
        action.plants.forEach(plant => {
          const index = currentPlants.findIndex(el => el.id === plant.id);
          if(index > -1){
            currentPlants[index] = { ...currentPlants[index], ...plant};
          } else {
            currentPlants.push(plant);
          }
        });
      } 
      return Object.assign([], state, currentPlants);
    }
    default:
      return state;
  }
}

export default reducer;