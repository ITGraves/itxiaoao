import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as actions from "../actions/login"
import {Link} from 'react-router';

class Logining extends Component{
	componentWillMount(){
		
	}

	handLoginOut(){
		this.props.actions.LoginOut();
	}

	render(){
		return (<div className= 'log_reg'><Link to="/personal" className='a_log' >{this.props.LoginTop.data}</Link>,<a onClick={(e)=>{this.handLoginOut()}} className="a_log" href="javascript:;">退出</a></div>);
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
	)(Logining);