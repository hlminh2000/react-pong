import Store from '../../stateManagement/store/Store.js';
import InitialState from '../InitialState.js';

const store = Store.getInstance();

const Actions = [
	{
		type      : 'USER_MOVE',
		callback  : (data) => {
			store.update({
				...store.latest(),
				paddleBottomModel : {
					...store.latest().paddleBottomModel,
					moveDirection : data,
				}
			});
		}
	},
	{
		type      : 'SET_SCORE',
		callback  : (data) => {
			store.update({
				...store.latest(),
				playerScore :  data,
			});
		}
	},
	{
		type      : 'INIT_STATE',
		callback  : (data) => {
			store.update(InitialState.generateInitialState());
		}
	},
	{
		type      : 'NEXT_FRAME',
		callback  : (data) => {
			const nextBallPosition = {
				x : store.latest().ballPos.x + store.latest().ballVelocity.x*2,
				y : store.latest().ballPos.y + store.latest().ballVelocity.y*2,
			}
			const latestState = store.latest();
			var ballShouldBounce = false;
			const ballAbsoluteX = nextBallPosition.x*latestState.boardSize.width;
			const bottomPaddleAbsoluteX = latestState.boardSize.width * latestState.paddleBottomModel.position;
			const topPaddleAbsoluteX = latestState.boardSize.width * latestState.paddleTopModel.position;
			if(   (nextBallPosition.y > 1 && ballAbsoluteX < bottomPaddleAbsoluteX + latestState.paddleBottomModel.width/2 && ballAbsoluteX > bottomPaddleAbsoluteX - latestState.paddleBottomModel.width/2)
				||  (nextBallPosition.y < 0 && ballAbsoluteX < topPaddleAbsoluteX + latestState.paddleTopModel.width/2 && ballAbsoluteX > topPaddleAbsoluteX - latestState.paddleTopModel.width/2)){
				ballShouldBounce = true;
			}
			store.update({
				...store.latest(),
				ballVelocity: {
				 x : (nextBallPosition.x > 1 || nextBallPosition.x < 0 ) ? -latestState.ballVelocity.x : latestState.ballVelocity.x,
				 y : (ballShouldBounce ) ? -latestState.ballVelocity.y : latestState.ballVelocity.y,
				},
				ballPos :  {
				 x : latestState.ballPos.x + latestState.ballVelocity.x,
				 y : latestState.ballPos.y + latestState.ballVelocity.y,
				},
				paddleBottomModel : {
				 ...latestState.paddleBottomModel,
				 position  : latestState.paddleBottomModel.moveDirection === "left" ? latestState.paddleBottomModel.position-latestState.paddleBottomModel.speed
									: (latestState.paddleBottomModel.moveDirection === "right" ? latestState.paddleBottomModel.position+latestState.paddleBottomModel.speed : latestState.paddleBottomModel.position)
				},
				paddleTopModel  : {
				 ...latestState.paddleTopModel,
				 moveDirection : latestState.paddleTopModel.position > latestState.ballPos.x ? "left"
									  : (latestState.paddleTopModel.position < latestState.ballPos.x ? "right" : latestState.paddleTopModel.position ),
				 position      : latestState.paddleTopModel.moveDirection === "left" ? latestState.paddleTopModel.position-latestState.paddleBottomModel.speed
									  : (latestState.paddleTopModel.moveDirection === "right" ? latestState.paddleTopModel.position+latestState.paddleBottomModel.speed : latestState.paddleTopModel.position)
				},
				gameEnded : latestState.ballPos.y > 1 || latestState.ballPos.y < 0,
				playerScore:  latestState.ballPos.y < 0 ? latestState.playerScore+1 : latestState.playerScore,
			});
		}
	}
]

export default Actions;
