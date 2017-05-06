import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from "../actions/login";
import {connect} from "react-redux";

class About extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="About">
				<div className="About_content">
					<h1>关于我的网站</h1>
					<br/><br/>
					<p> 前端采用的是react + redux + react-router 提供路由</p>
					<p>后端是node + express + mongoDb提供API的方式</p>
					<p>  前后端采用的是fetch的交互方式</p>
					<p>  模块化方面是基于ES6模块化开发，
					配合react的组件化，以后复用率和扩展都很不错，
					同时配合webpack打包，完全实现按需加载</p>
				</div>
			</div>
		)
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
	)(About);
