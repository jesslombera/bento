import React from 'react';
import GifImageFact from './GifImageFact.jsx';

class GifImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorited: this.props.isFavorite };
  }

  favoriteGifImage() {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props);
  }

  unfavoriteGifImage() {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props);
  }

  renderFavoriteHeart = () => {
    if (! this.props.isAuthenticated) {
      return '';
    }

    if (this.state.favorited) {
      return <i className="favorite fa fa-heart" onClick={() => this.unfavoriteGifImage()} />;
    }

    return <i className="favorite fa fa-heart-o" onClick={() => this.favoriteGifImage()} />;
  };

  render() {
    return (
      <div className="gif-item">
        { this.renderFavoriteHeart() }
        <img 
          src={this.props.gifImage.url} 
          onClick={() => this.props.onGifImageSelect(this.props)} 
        />
        <GifImageFact
          gifImageFacts={this.props.gifImageFacts}
        />
      </div>
    );
  }
}

export default GifImageItem;