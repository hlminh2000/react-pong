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

	 const ballX = widthNum*this.props.appModel.ballPos.x + 'px';
	 const ballY = heightNum*this.props.appModel.ballPos.y + 'px';

	 return (
		<div style={style}>
		  <Paddle
			 isTop={true}
			 isPlayer='false'
			 width={this.props.appModel.paddleTopModel.width}
			 appModel={this.props.appModel}
			 position={this.props.appModel.paddleTopModel.position}>
		  </Paddle>

		  <Ball
			 x={ballX}
			 y={ballY}>
		  </Ball>

		  <Paddle
			 isTop={false}
			 isPlayer='true'
			 width={this.props.appModel.paddleBottomModel.width}
			 appModel={this.props.appModel}
			 position={this.props.appModel.paddleBottomModel.position}>
		  </Paddle>
		</div>
	 );
  }
}

export default Board;
