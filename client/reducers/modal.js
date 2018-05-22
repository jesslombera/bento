import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const initialState =  {
  selectedGifImage: null,
  modalIsOpen: false
};

export default function modal(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true,
        selectedGifImage: action.gifImage.selectedGifImage
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: false,
        selectedGifImage: null
      };
    default:
      return state;
  }
}