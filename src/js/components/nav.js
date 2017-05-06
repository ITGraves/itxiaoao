import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Link,IndexLink} from 'react-router';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import * as actions from "../actions/login"
import Login from '../components/login'
import Register from "../components/Register"
import Logining from "../components/logining"
import Loginout from "../components/loginout"

class Nav extends Component{
	constructor(props){
		super(props);
		this.search;
	}

	componentWillMount(){
		this.props.actions.getUserInfo();
	}

	doSearch(e){
		let s = this.search.value;
		if(e.keyCode==13){
			if(!s){
				this.props.actions._alert('请输入关键字进行搜索');
			}
			this.props.actions.Search(s);
		}
	}

	render(){
		let Islogin;
		let props = this.props.LoginTop;
		if(props.type=='loginIn'){
			
			Islogin = <Logining/>
		}else{
			
			Islogin = <Loginout/>
		}

		let show = this.props.LoginBoxData.type;
		show = show?(show=="logShow"?<Login/>:<Register/>):show;
		return (
			<div className = "container nav">
				<div className = "col-xs-1 logo">logo</div>
				<div className = "col-xs-7 nav_list">
					<ul className = "container">
						<li className="col-xs-3"><IndexLink to="/">首页</IndexLink></li>
						<li className="col-xs-3"><Link to="/post">发表文章</Link></li>
						<li className="col-xs-3"><Link to="/About">关于网站</Link></li>
						<li className="col-xs-3"><Link to="/Memorandum">备忘录</Link></li>
					</ul>
				</div>
				<div className = "search">
					<form onSubmit={(e)=>{e.preventDefault()}}>
						<input type="text" placeholder="搜索" ref={(el)=>{this.search=el}} onKeyDown={(e)=>{this.doSearch(e)}}/>
					</form>
				</div>
				<div className="col-xs-2 col-lg-offset-2">
					{Islogin}
				</div>
				{show}
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {LoginBoxData: state.LoginBoxData,LoginTop: state.LoginTop};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
)(Nav);

