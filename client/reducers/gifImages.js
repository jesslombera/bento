import { FETCH_GIF_IMAGES, FETCH_FAVORITED_GIF_IMAGES } from '../actions';

const initialState =  {
  data: [],
  favorites: []
};

export default function gifImages(state = initialState, action) {
  switch (action.type) {
    case FETCH_GIF_IMAGES:
      return {
        ...state, 
        data: action.payload
      };
    case FETCH_FAVORITED_GIF_IMAGES:
      var arr =[];
      for( var i in action.payload ) {
        if (action.payload.hasOwnProperty(i)){
          arr.push(action.payload[i]);
        }
      }
      return {
        ...state, 
        favorites: arr
      };
    default:
      return state;
  }
}