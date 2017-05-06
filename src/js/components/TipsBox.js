import React,{Component} from 'react';
import * as actions from '../actions/login'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'

class TipsBox extends Component{
	
	constructor(props){
		super(props)
	}
	
	render(){
		let type = this.props.tipsBox.type;
		let dis;
		if(type=='showTips'){
			dis = 'block';
		}else{
			dis = 'none';
		}

		return (
			<div style={{"display":dis}} className='tipsbox'>
				{this.props.tipsBox.message}
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return { tipsBox: state.tipsBox }
}

const mapDispatchToProps = (dispatch)=>{

	return {
		actions: bindActionCreators(actions, dispatch)
	}

}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TipsBox);
