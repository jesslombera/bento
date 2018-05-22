import React from 'react';
import Modal from 'react-modal';

const GifImageModal = (props) => {
  if (!props.selectedGifImage) {
    return <div></div>;
  }

  return (
    <Modal
      isOpen={ props.modalIsOpen }
      onRequestClose={ () => props.onRequestClose() }>
      <div className="gif-modal">
        <img src={ props.selectedGifImage.gifImage.url } />
        <p> <strong>Fact: </strong> {props.selectedGifImage.gifImageFacts.fact} </p>
        <button onClick={() => props.onRequestClose()}>close</button>
      </div>
    </Modal>
  );
};

export default GifImageModal;