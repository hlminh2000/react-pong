import React, { Component } from 'react';


class Paddle extends Component {
  render() {
    const width = this.props.width;
    const x = this.props.appModel.boardSize.width * this.props.position - width/2;

    const style = {
      position  : 'absolute',
      width     : width + "px",
      height    : '5px',
      background: 'black',
      left      : x + 'px',
      top       : this.props.isTop ? '0px' : (this.props.appModel.boardSize.height - 5) + 'px',
    };

    return (
      <div style={style}>
      </div>
    );
  }
}

export default Paddle;
