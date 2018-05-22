import React from 'react';

class GifImageFact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.gifImageFacts != null) {
      return (
        <div className="gif-item">
          <p>{this.props.gifImageFacts.fact}}</p>
        </div>
      );
    } else {
      return (
        null
      );
    }
  }
}

export default GifImageFact;