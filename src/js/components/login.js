import React, { Component } from 'react';
import { render } from "react-dom";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import * as actions from "../actions/login"


class Login extends Component{

	constructor(props){
		super(props)
		this.userName
		this.password
	}

	handleSubmit(){
		
	if(this.userName.value.length<2){
			this.props.actions._alert('用户名太短了')
		}
		if(this.password.value.length<5){
			this.props.actions._alert('密码太短了');
		}
		let data = 'userName='+this.userName.value+'&password='+this.password.value
		this.props.actions.loginSubmit('loginSubmit', data);
	}

	render(){
		let type = this.props.LoginBoxData.isShow;
		type = type?"block":"none";

		return (
			<div className="form-group Log_box" style={{"display":type}}>
					<form onSubmit = {(e)=>{e.preventDefault();}}>
						<a className="Log_close" onClick={(e)=>{this.props.actions.LogReg('logClose')}}>Close</a>
						<h2>welcome to login!</h2>
						<input type="text" ref={(el)=>{this.userName=el}} className="form-control" placeholder="用户名"/>
						<input type="password" ref={(el)=>{this.password=el}} className="form-control" placeholder="密码"/>
						<button className="btn btn-primary check_btn" onClick = {()=>{this.handleSubmit()}}>submit</button>
					</form>
				
			</div>
		)
	}

}

const mapStateToProps = (state)=>{

	return {LoginBoxData: state.LoginBoxData}

}

const mapDispatchToProps = (dispatch)=>{

	return {
		actions: bindActionCreators(actions, dispatch)
	}

}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Login)