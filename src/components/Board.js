import React, { Component } from 'react';
import Ball from './Ball.js';
import Paddle from './Paddle.js';

class Board extends Component {

  render() {
	 const style = {
		height      :   this.props.height,
		width       :   this.props.width,
		background  :   'grey',
		position    :   'relative',
	 };
	 const widthNum = Number(this.props.width.split('px')[0]);
	 const heightNum = Number(this.props.height.split('px')[0]);

	 const ballX = widthNum*this.store.latest().ballPos.x + 'px';
	 const ballY = heightNum*this.store.latest().ballPos.y + 'px';

	 return (
		<div style={style}>
		  <Paddle
			 isTop={true}
			 isPlayer='false'
			 width={this.store.latest().paddleTopModel.width}
			 position={this.store.latest().paddleTopModel.position}>
		  </Paddle>

		  <Ball
			 x={ballX}
			 y={ballY}>
		  </Ball>

		  <Paddle
			 isTop={false}
			 isPlayer='true'
			 width={this.store.latest().paddleBottomModel.width}
			 position={this.store.latest().paddleBottomModel.position}>
		  </Paddle>
		</div>
	 );
  }
}

export default Board;
