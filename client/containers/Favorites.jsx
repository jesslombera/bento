import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifImageList from '../components/GifImageList.jsx';
import GifImageModal from '../components/GifImageModal.jsx';
import '../styles/styles.css';

class Favorites extends React.Component {
  componentWillMount() {
    this.props.actions.fetchFavoritedGifImages();
  }

  render() {
    return (
      <div>
        <GifImageList 
          gifImages={ this.props.gifImages }
          gifImageFacts= { this.props.gifImageFacts }
          onGifImageSelect={ selectedGifImage => this.props.actions.openModal({selectedGifImage}) }
          onFavoriteSelect={ selectedGifImage => this.props.actions.favoriteGifImage({selectedGifImage}) }
          onFavoriteDeselect={ selectedGifImage => this.props.actions.unfavoriteGifImage({selectedGifImage}) }
          isAuthenticated={ this.props.authenticated }
          isFavorite={true} 
        />
        <GifImageModal 
          modalIsOpen={ this.props.modalIsOpen }
          selectedGifImage={ this.props.selectedGifImage }
          onRequestClose={ () => this.props.actions.closeModal() } 
        />
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifImages: state.gifImages.favorites,
    gifImageFacts: state.gifImages.favorites,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGifImage: state.modal.selectedGifImage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);