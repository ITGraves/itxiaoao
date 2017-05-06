import React,{ Component } from 'react';
import { ReactDOM } from 'react-dom';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from "../actions/login"
import Articlelist from '../components/Articlelist'

class Main extends Component{

	constructor(props){
		super(props)
	}

	componentWillMount(){
		
	}

	render(){
		return (

			<Articlelist></Articlelist>

		);
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
	)(Main);

const a = (	<div className="main">
				<div className="title_list">
					<ul>
						<li><a href="#">前端</a></li>
						<li><a href="#">后端</a></li>
						<li><a href="#">运维</a></li>
						<li><a href="#">产品</a></li>
						<li><a href="#">生活</a></li>
						<li><a href="#">小说</a></li>
						<li><a href="#">爱情</a></li>
					</ul>
				</div>
				<div className="nice_article">
					
				</div>
				<div className="hot_list">
					<ul>
						<li><a href="#">新上榜</a></li>
						<li><a href="#">日报</a></li>
						<li><a href="#">最近热门</a></li>
						<li><a href="#">经典热门</a></li>
					</ul>
					<div className="hot_author">
						
					</div>
				</div>
			</div>)