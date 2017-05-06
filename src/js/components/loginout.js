import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as actions from "../actions/login"

class Loginout extends Component{
	constructor(props){
		super(props)
	}

	componentWillMount(){
		
	}

	render(){
		return (<div className = "log_reg"><a className="a_log" href="javascript:;" onClick={(e)=>{this.props.actions.LogReg("logShow")}}>登陆</a>/<a className="a_log" href="javascript:;" onClick={(e)=>{this.props.actions.LogReg('regShow')}}>注册</a></div>)
	}
}

const mapStateToProps = (state)=>{
	return {LoginTop: state.LoginTop}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Loginout);