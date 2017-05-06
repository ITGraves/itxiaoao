import React,{Component} from 'react'
import * as actions from '../actions/login'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import { render } from "react-dom";

class Register extends Component{

	constructor(props){
		super(props)
		this.userName
		this.password
		this.email
	}

	ComponentWillUpdate(){
		
	}
 
	LoginSubmit(){
		if(this.userName.value.length<2){
			this.props.actions._alert('用户名必须长于2位');
			return
		}
		if(this.password.value.length<=5){
			this.props.actions._alert('密码太短了');
			return
		}
		var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
		if(!reg.test(this.email.value)){
			this.props.actions._alert('邮箱类型不符合');
			return
		}
		let data = 'userName='+this.userName.value+'&password='+this.password.value;
		this.props.actions.loginSubmit('regSubmit',data);
	}

	render(){
		let type = this.props.LoginBoxData.isShow;
		type = type?"block":"none";

		return (
			<div className="form-group Log_box" style={{"display":type}}>
					<form onSubmit = {e=>{e.preventDefault();}}>
						<a className="Log_close" onClick={(e)=>{this.props.actions.LogReg('logClose')}}>Close</a>
						<h2>注册一下吧</h2>
						<input className="form-control" type="text" ref={(el)=>{this.userName=el}} name="username" placeholder="用户名"/>
						<input className="form-control" type="password" ref={(el)=>{this.password=el}} name="password" placeholder="密码"/>
						<input className="form-control" type="text" ref={(el)=>{this.email=el}} name="email" placeholder="email"/>
						<button className="btn btn-primary check_btn" onClick={()=>{this.LoginSubmit()}}>submit</button>
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
)(Register)