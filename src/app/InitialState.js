//  DEFINES THE CONFIGURATION FOR EACH GAME

const InitialState = {
	generateInitialState : () => {
	  return {
	    boardSize:  {
	      width : 500,
	      height: 500,
	    },
	    ballPos :  {
	      x : 0.5,
	      y : 0.5,
	    },
	    ballVelocity: {
	      x : (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.003 + 0.003),
	      y :  -1 * 0.004,
	    },
	    paddleTopModel  : {
	      position  : 0.5,
	      width     : 60,
	      moveDirection : null,
	      speed     : 0.0035,
	    },
	    paddleBottomModel : {
	      position  : 0.5,
	      width     : 60,
	      moveDirection : null,
	      speed     : 0.0035,
	    },
	    gameEnded : false,
	    playerScore:  0,
	    refreshRate : 1,
	  }
	}
}

export default InitialState;
