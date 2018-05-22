import { FETCH_GIF_IMAGE_FACTS } from '../actions';

const initialState =  {
  data: []
};

export default function gifImageFacts(state = initialState, action) {
  switch (action.type) {
    case FETCH_GIF_IMAGE_FACTS:
      return {
        ...state, 
        data: action.payload.data
      };
    default:
      return state;
  }
}


