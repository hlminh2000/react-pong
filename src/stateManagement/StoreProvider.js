import React, { Component } from 'react';
import Store from './store/Store.js';

class StoreProvider extends Component {
	constructor(props){
		super(props);
		Component.prototype.store = Store.getInstance();
	}

	render(){
		return (
			<div>{this.props.children}</div>
		);
	}

}

export default StoreProvider;
