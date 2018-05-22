import React from 'react';

class GifImageFact extends React.Component {

  render() {
    return (
      <div className="gif-item">
        <p>{this.props.gifImageFacts.fact}</p>
      </div>
    );
  }
}

export default GifImageFact;