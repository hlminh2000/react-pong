
//  SINGLETON  MODEL MANAGING THE STORE
var Store = (()=>{
	var instance;
	var store = [];
	var registredReducers = [];
	var playbackInterval;
	const createInstance = () => {
		instance = {
			latest    : ()  =>  { return store[store.length-1] },
			update    : (obj) => {
				const newState = JSON.parse(JSON.stringify(obj));
				store.push(newState);
			},
			clear     : ()  =>  { store=[] },
			registerReducer : (reducer) => {
				registredReducers.push({
					type: reducer.type,
					callback: reducer.callback,
				});
			},
			performAction : (actionData) => {
				registredReducers.filter(action => action.type === actionData.type)[0].callback(actionData.data);
			},
			startPlayback	:	(renderCallback, refreshRate)	=>	{
				return new Promise((resolve, reject) => {
					const sourceStore = Object.create(store);
					instance.clear();
					var stateIndex = 0;
					playbackInterval = setInterval(()=>{
						instance.update(sourceStore[stateIndex]);
						if(renderCallback){ renderCallback(); }
						stateIndex++;
						if(stateIndex >= sourceStore.length){
							clearInterval(playbackInterval);
							resolve();
						}
					}, refreshRate);
				});
			},
			stopPlayback	:	() => {
				if(playbackInterval){ clearInterval(playbackInterval) }
			}
	 	};
	 	return instance;
  }
  return {
	 getInstance : () => {
		if(!instance){
			instance = createInstance();
		}
		return instance;
	 }
  }
})();


export default Store;
