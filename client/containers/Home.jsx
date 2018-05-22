import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifImageList from '../components/GifImageList.jsx';
import GifImageModal from '../components/GifImageModal.jsx';
import '../styles/styles.css';

class Home extends React.Component {
  
  componentWillMount() {
 
    this.props.actions.requestGifImages();
    this.props.actions.requestGifImageFacts();
  }

  render() {
    return (
      <div>
        <GifImageList 
          gifImages={ this.props.gifImages }
          gifImageFacts={ this.props.gifImageFacts }
          onGifImageSelect={ selectedGifImage => this.props.actions.openModal({selectedGifImage}) }
          onFavoriteSelect={ selectedGifImage => this.props.actions.favoriteGifImage({selectedGifImage}) }
          onFavoriteDeselect={ selectedGifImage => this.props.actions.unfavoriteGifImage({selectedGifImage}) }
          isAuthenticated={ this.props.authenticated } 
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
    gifImages: state.gifImages.data,
    gifImageFacts: state.gifImageFacts.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGifImage: state.modal.selectedGifImage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);