import React, { Component } from 'react';


class Ball extends Component {
  render() {
    const style = {
      position    : 'absolute',
      width       : '20px',
      height      : '20px',
      borderRadius: '50%',
      background  : 'black',
      left        : this.props.x,
      top         : this.props.y,
      marginLeft  : '-10px',
      marginTop   : '-10px',
    };
    return (
      <div style={style}>
      </div>
    );
  }
}

export default Ball;
