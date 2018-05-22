import { combineReducers } from 'redux';
import GifImagesReducer from './gifImages.js';
import GifImageFactsReducer from './gifImageFacts.js';
import ModalReducer from './modal.js';
import AuthReducer from './auth.js';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: AuthReducer,
    form: FormReducer,
    gifImages: GifImagesReducer,
    gifImageFacts: GifImageFactsReducer,
    modal: ModalReducer
});

export default rootReducer;
