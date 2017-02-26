import React, { Component } from 'react';
// import logo       from './logo.svg';
// import Store      from '../stateManagement/store/Store.js';
import Actions    from './actions/Actions.js';
import Board      from './components/Board.js';
import './App.css';


// const store = Store.getInstance();

// RENDERS VIEW WITH REACT

  //  APPLICATION CONTAINS THE ACTUAL GAME AND MANAGES GAME STATE TO PASS DOWN TO COMPONENTS
class App extends Component {

  constructor(props){
	 super(props);
	 this.states = {
		isReplaying : false,
	 }
	 this.onReplayClick = this.onReplayClick.bind(this);
	 this.onRestartClick = this.onRestartClick.bind(this);
    Actions.forEach(action => this.store.registerAction(action));
  }

  componentWillMount(){
    this.store.performAction({type:'INIT_STATE'});
  }

  componentDidMount(){
	 window.addEventListener('keydown', (e)=>{
		if(!this.states.isReplaying){
		  const currentMovingDirection = e.keyCode === 37 ? "left" : (e.keyCode === 39 ? "right" : null);
		  this.store.performAction({type:'USER_MOVE', data:currentMovingDirection});
		}
	 })

	 window.addEventListener('keyup', (e)=>{
		if(!this.states.isReplaying){
		  this.store.performAction({type:'USER_MOVE', data:null});
		}
	 })
	 this.startGame();
  }

  startGame(){
	 var gameScore = 0;
	 const currentInterval = setInterval(()=>{
		if(!this.states.isReplaying){
		  this.store.performAction({type:'NEXT_FRAME', data:null});
		  gameScore = this.store.latest().playerScore;
		  this.forceUpdate();
		  if(this.store.latest().gameEnded){
			 clearInterval(currentInterval);
			 setTimeout(()=>{
				this.store.performAction({type:'INIT_STATE', data:null});
				this.store.performAction({type:'SET_SCORE', data:gameScore});
				this.startGame();
			 }, 1500);
		  }
		} else {
		  clearInterval(currentInterval);
		}
	}, this.store.latest().refreshRate);
  }

  onReplayClick(){
     this.states.isReplaying = true;
     this.forceUpdate = this.forceUpdate.bind(this);
     this.store.startPlayback(this.forceUpdate, this.store.latest().refreshRate)
        .then(()=>{
             this.store.performAction({type:'INIT_STATE', data:null});
             setTimeout(()=>{
                this.states.isReplaying = false;
                this.startGame();
             }, 1500);
        })
  }

  onRestartClick(){
     this.store.stopPlayback();
	 this.store.clear();
	 this.store.performAction({type:'INIT_STATE'});
	 if(this.states.isReplaying){
		this.states.isReplaying = false;
		this.startGame();
	 }
  }

  render() {
	 const boardHeight = this.store.latest().boardSize.height + 'px';
	 const boardWidth  = this.store.latest().boardSize.width  + 'px';

	 return (
		<div>
		  <div style={{"color":"white"}}>use the arrow keys</div>

		  <Board width={boardWidth} height={boardHeight} appModel={this.store.latest()}></Board>

		  <div style={{marginTop:'10px'}}>
			 <button onClick={this.onRestartClick}>Restart</button>
			 <button onClick={this.onReplayClick}>Playback</button>
			 <span style={{"color":"white"}}> Score: {this.store.latest().playerScore}</span>
			 <span style={{"color":"red"}}> {this.states.isReplaying ? "REPLAY" : ""}</span>
		  </div>
		</div>
	 );
  }
}



export default App;
