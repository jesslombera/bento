import React from 'react';
import GifImageItem from './GifImageItem.jsx';

// stateless functional component
const GifImageList = (props) => {
  const gifImageItems = props.gifImages.map((image, index) => {
    return <GifImageItem 
              key={index} 
              gifImage={image}
              gifImageFacts={props.gifImageFacts[index]}
              onGifImageSelect={props.onGifImageSelect}
              onFavoriteSelect={props.onFavoriteSelect}
              onFavoriteDeselect={props.onFavoriteDeselect}
              isAuthenticated={props.isAuthenticated}
              isFavorite={props.isFavorite}
            />
  });
  return (
    <div className="gif-list">
      <div>{gifImageItems}</div>
    </div>
    
  );
};

export default GifImageList;