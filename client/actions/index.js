import request from 'superagent';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
var xml2js = require('xml2js');

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const FETCH_GIF_IMAGES = 'FETCH_GIF_IMAGES';
export const FETCH_GIF_IMAGE_FACTS = 'FETCH_GIF_IMAGE_FACTS';
export const FETCH_FAVORITED_GIF_IMAGES = 'FETCH_FAVORITED_GIF_IMAGES';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

const GIF_IMAGE_FACTS_API_URL = 'https://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25';
const GIF_IMAGES_API_URL = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25'; 

const config = {
  apiKey: process.env.API_KEY,
  authDomain: "giphy-react.firebaseapp.com",
  databaseURL: "https://giphy-react.firebaseio.com",
  storageBucket: "giphy-react.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

Firebase.initializeApp(config);

// Helper function to parse XML
// Will be called to request gifImages
function parseXML(dispatch, response) {
    xml2js.parseString(response.text, (error, result) => {
    const flatResponse = result.response.data[0].images[0].image.map((image) => ({url: image.url[0]}));
    dispatch({
      type: FETCH_GIF_IMAGES,
      payload: flatResponse
    });
  });
}

export function requestGifImages() {
  return function(dispatch) {
      request
      .get(GIF_IMAGES_API_URL)
      .buffer()
      .then(response => {
        parseXML(dispatch, response);
    });
  }
}

export function requestGifImageFacts() {
  return function(dispatch) {
    request.get(GIF_IMAGE_FACTS_API_URL).then(response => {
      dispatch({
        type: FETCH_GIF_IMAGE_FACTS,
        payload: JSON.parse(response.body.body)
      });
    });
  }
}

export function favoriteGifImage({selectedGifImage}) {
  const userUid = Firebase.auth().currentUser.uid;
  const imageUrl = selectedGifImage.gifImage.url
  const imageFact = selectedGifImage.gifImageFacts.fact

  // Store a hash as id to save in database
  const gifId = window.btoa(`${imageUrl}-${imageFact}`);
  return dispatch => Firebase.database().ref(userUid).update({
    [gifId]: {url: imageUrl, fact: imageFact, id: gifId }
  });
}

export function unfavoriteGifImage({selectedGifImage}) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifImageId = selectedGifImage.gifImage.id;

  return dispatch => Firebase.database().ref(userUid).child(gifImageId).remove();
}

export function fetchFavoritedGifImages() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid;

    Firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIF_IMAGES,
        payload: snapshot.val()
      })
    });
  }
}

export function openModal(gifImage) {
  return {
    type: OPEN_MODAL,
    gifImage
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/favorites');
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/favorites');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

export function signOutUser() {
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER
  }
}

export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}